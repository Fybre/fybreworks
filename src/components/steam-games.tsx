"use client";

import { useEffect, useState } from "react";

type Game = {
  appid: number;
  name: string;
  playtime_forever: number;
  playtime_2weeks?: number;
  img_icon_url: string;
  genres?: string[];
};

type GamesData = {
  totalGames: number;
  totalPlaytimeHours: number;
  topByPlaytime: Game[];
  recentlyPlayed: Game[];
  allGames: Game[];
  topGenres: string[];
  recentGenres: string[];
  error?: string;
};

function formatPlaytime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  if (hours < 1) return `${minutes}m`;
  return `${hours.toLocaleString()}h`;
}

function GameCard({
  game,
  showRecent = false,
}: {
  game: Game;
  showRecent?: boolean;
}) {
  const iconUrl = game.img_icon_url
    ? `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
    : null;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/40 p-3">
      {iconUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={iconUrl} alt={game.name} className="h-8 w-8 rounded" />
      ) : (
        <div className="h-8 w-8 rounded bg-slate-700" />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-100 truncate">
          {game.name}
        </p>
        <p className="text-xs text-slate-500">
          {formatPlaytime(game.playtime_forever)} total
          {showRecent && game.playtime_2weeks && (
            <span className="text-slate-400">
              {" "}
              · {formatPlaytime(game.playtime_2weeks)} recent
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

function CollapsibleGameList({ games }: { games: Game[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredGames = games.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <span className="text-sm font-medium text-slate-100">
          Full Library ({games.length} games)
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="border-t border-slate-800 p-4">
          <input
            type="text"
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-3 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-slate-600 focus:outline-none"
          />
          <div className="max-h-80 space-y-1 overflow-y-auto">
            {filteredGames.map((game) => (
              <div
                key={game.appid}
                className="flex items-center justify-between rounded px-2 py-1.5 text-sm hover:bg-slate-800/50"
              >
                <span className="text-slate-300 truncate">{game.name}</span>
                <span className="text-xs text-slate-500 ml-2 shrink-0">
                  {formatPlaytime(game.playtime_forever)}
                </span>
              </div>
            ))}
            {filteredGames.length === 0 && (
              <p className="text-sm text-slate-500 py-2">No games found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function SteamGames({ displayLimit = 6 }: { displayLimit?: number }) {
  const [data, setData] = useState<GamesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch("/api/steam/games");
        const json = await res.json();

        if (json.error) {
          setError(json.error);
        } else {
          setData(json);
        }
      } catch {
        setError("Failed to load games");
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-20 animate-pulse rounded-lg bg-slate-800" />
        <div className="h-40 animate-pulse rounded-lg bg-slate-800" />
      </div>
    );
  }

  if (error || !data) {
    return null; // Silently fail if Steam games aren't available
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-center">
          <p className="text-2xl font-semibold text-slate-100">
            {data.totalGames}
          </p>
          <p className="text-xs text-slate-500">Games Owned</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-center">
          <p className="text-2xl font-semibold text-slate-100">
            {data.totalPlaytimeHours.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500">Hours Played</p>
        </div>
      </div>

      {/* Top Genres */}
      {data.topGenres.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
            All-time Favourite Genres
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.topGenres.map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-slate-700 px-3 py-1 text-sm text-slate-300"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recently Playing Genres */}
      {data.recentGenres.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Playing Lately
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.recentGenres.map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-green-900/30 px-3 py-1 text-sm text-green-400"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recently Played Games */}
      {data.recentlyPlayed.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Recently Played
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {data.recentlyPlayed.slice(0, displayLimit).map((game) => (
              <GameCard key={game.appid} game={game} showRecent />
            ))}
          </div>
        </div>
      )}

      {/* Top Games by Playtime */}
      {data.topByPlaytime.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Most Played
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {data.topByPlaytime.slice(0, displayLimit).map((game) => (
              <GameCard key={game.appid} game={game} />
            ))}
          </div>
        </div>
      )}

      {/* Full Library */}
      {data.allGames.length > 0 && (
        <CollapsibleGameList games={data.allGames} />
      )}
    </div>
  );
}
