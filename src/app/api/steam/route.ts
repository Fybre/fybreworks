import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.STEAM_API_KEY;
  const steamId = process.env.STEAM_ID;

  if (!apiKey || !steamId) {
    return NextResponse.json({ configured: false, error: "Missing env vars" });
  }

  try {
    const res = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return NextResponse.json({
        configured: false,
        error: `Steam API error: ${res.status}`
      });
    }

    const data = await res.json();
    const player = data.response?.players?.[0];

    if (!player) {
      return NextResponse.json({
        configured: false,
        error: "No player found - check STEAM_ID format (needs 17-digit numeric ID)"
      });
    }

    return NextResponse.json({
      configured: true,
      online: player.personastate > 0,
      currentGame: player.gameextrainfo || null,
      gameId: player.gameid || null,
      profileUrl: player.profileurl || null,
      avatar: player.avatarmedium || null,
      personaName: player.personaname || null,
    });
  } catch (err) {
    return NextResponse.json({
      configured: false,
      error: `Fetch error: ${err}`
    });
  }
}
