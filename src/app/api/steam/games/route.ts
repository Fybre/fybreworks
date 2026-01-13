import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type SteamGame = {
  appid: number;
  name: string;
  playtime_forever: number; // minutes
  playtime_2weeks?: number; // minutes
  img_icon_url: string;
  img_logo_url?: string;
};

type GameWithDetails = SteamGame & {
  genres?: string[];
};

// Cache for genre lookups to avoid hitting Steam Store API too much
const genreCache = new Map<number, string[]>();

async function getGameGenres(appId: number): Promise<string[]> {
  if (genreCache.has(appId)) {
    return genreCache.get(appId)!;
  }

  try {
    const res = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${appId}`,
      { next: { revalidate: 86400 } } // Cache for 24 hours
    );

    if (!res.ok) return [];

    const data = await res.json();
    const appData = data[appId.toString()];

    if (!appData?.success || !appData?.data?.genres) return [];

    const genres = appData.data.genres.map(
      (g: { description: string }) => g.description
    );
    genreCache.set(appId, genres);
    return genres;
  } catch {
    return [];
  }
}

export async function GET(request: Request) {
  const apiKey = process.env.STEAM_API_KEY;
  const steamId = process.env.STEAM_ID;

  if (!apiKey || !steamId) {
    return NextResponse.json({ error: "Missing env vars" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const topGamesCount = Math.min(
    parseInt(searchParams.get("topGames") || "10"),
    50
  ); // Max 50 to prevent abuse
  const recentGamesCount = Math.min(
    parseInt(searchParams.get("recentGames") || "10"),
    50
  ); // Max 50
  const maxGenres = Math.min(
    parseInt(searchParams.get("maxGenres") || "15"),
    50
  ); // Max 50 for genre fetches

  try {
    // Fetch owned games
    const ownedRes = await fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_appinfo=1&include_played_free_games=1`,
      { cache: "no-store" }
    );

    // Fetch recently played
    const recentRes = await fetch(
      `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${apiKey}&steamid=${steamId}&count=${recentGamesCount}`,
      { cache: "no-store" }
    );

    if (!ownedRes.ok || !recentRes.ok) {
      return NextResponse.json({ error: "Steam API error" }, { status: 500 });
    }

    const ownedData = await ownedRes.json();
    const recentData = await recentRes.json();

    const allGames: SteamGame[] = ownedData.response?.games || [];
    const recentGamesList: SteamGame[] = recentData.response?.games || [];

    // Sort by playtime for top games
    const topByPlaytime = [...allGames]
      .sort((a, b) => b.playtime_forever - a.playtime_forever)
      .slice(0, topGamesCount);

    // Get genres for top and recent games (limited to avoid rate limits)
    const gamesToFetchGenres = [
      ...topByPlaytime.slice(0, topGamesCount),
      ...recentGamesList.slice(0, recentGamesCount),
    ];

    const uniqueAppIds = [...new Set(gamesToFetchGenres.map((g) => g.appid))];

    // Fetch genres in parallel but limited
    await Promise.all(
      uniqueAppIds.slice(0, maxGenres).map((appId) => getGameGenres(appId))
    );

    // Calculate genre stats
    const genrePlaytime = new Map<string, number>();
    const recentGenrePlaytime = new Map<string, number>();

    for (const game of topByPlaytime) {
      const genres = genreCache.get(game.appid) || [];
      for (const genre of genres) {
        genrePlaytime.set(
          genre,
          (genrePlaytime.get(genre) || 0) + game.playtime_forever
        );
      }
    }

    for (const game of recentGamesList) {
      const genres = genreCache.get(game.appid) || [];
      for (const genre of genres) {
        recentGenrePlaytime.set(
          genre,
          (recentGenrePlaytime.get(genre) || 0) + (game.playtime_2weeks || 0)
        );
      }
    }

    // Sort genres by playtime
    const topGenres = [...genrePlaytime.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([genre]) => genre);

    const recentGenres = [...recentGenrePlaytime.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([genre]) => genre);

    // Add genres to games for response
    const topGamesWithGenres: GameWithDetails[] = topByPlaytime.map((game) => ({
      ...game,
      genres: genreCache.get(game.appid),
    }));

    const recentGamesWithGenres: GameWithDetails[] = recentGamesList.map(
      (game) => ({
        ...game,
        genres: genreCache.get(game.appid),
      })
    );

    return NextResponse.json({
      totalGames: allGames.length,
      totalPlaytimeHours: Math.round(
        allGames.reduce((sum, g) => sum + g.playtime_forever, 0) / 60
      ),
      topByPlaytime: topGamesWithGenres,
      recentlyPlayed: recentGamesWithGenres,
      allGames: allGames
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((g) => ({
          appid: g.appid,
          name: g.name,
          playtime_forever: g.playtime_forever,
          img_icon_url: g.img_icon_url,
        })),
      topGenres,
      recentGenres,
    });
  } catch (err) {
    return NextResponse.json({ error: `Fetch error: ${err}` }, { status: 500 });
  }
}
