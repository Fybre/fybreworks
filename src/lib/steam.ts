export type SteamStatus = {
  online: boolean;
  currentGame: string | null;
  profileUrl: string | null;
  avatar: string | null;
  personaName: string | null;
};

export async function getSteamStatus(): Promise<SteamStatus | null> {
  const apiKey = process.env.STEAM_API_KEY;
  const steamId = process.env.STEAM_ID;

  if (!apiKey || !steamId) {
    return null;
  }

  try {
    const res = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`,
      { next: { revalidate: 60 } } // Cache for 60 seconds
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    const player = data.response?.players?.[0];

    if (!player) {
      return null;
    }

    return {
      online: player.personastate > 0,
      currentGame: player.gameextrainfo || null,
      profileUrl: player.profileurl || null,
      avatar: player.avatarmedium || null,
      personaName: player.personaname || null,
    };
  } catch {
    return null;
  }
}
