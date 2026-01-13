"use client";

import { useEffect, useState } from "react";

type SteamData = {
  configured: boolean;
  online?: boolean;
  currentGame?: string | null;
  profileUrl?: string | null;
  avatar?: string | null;
  personaName?: string | null;
};

export function SteamStatus() {
  const [status, setStatus] = useState<SteamData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("/api/steam");
        const data = await res.json();
        setStatus(data);
      } catch {
        setStatus(null);
      } finally {
        setLoading(false);
      }
    }

    fetchStatus();

    // Poll every 60 seconds
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 animate-pulse rounded-full bg-slate-700" />
          <div className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-700" />
            <div className="h-3 w-32 animate-pulse rounded bg-slate-700" />
          </div>
        </div>
      </div>
    );
  }

  if (!status || !status.configured) {
    return null;
  }

  return (
    <div className="card-hover rounded-lg border border-slate-800 bg-slate-900/40 p-4">
      <div className="flex items-center gap-4">
        {status.avatar && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={status.avatar}
            alt={status.personaName || "Steam avatar"}
            className="h-12 w-12 rounded-full"
          />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {status.profileUrl ? (
              <a
                href={status.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-100 hover:text-white"
              >
                {status.personaName || "Steam"}
              </a>
            ) : (
              <span className="text-sm font-medium text-slate-100">
                {status.personaName || "Steam"}
              </span>
            )}
            <span
              className={`h-2 w-2 rounded-full ${
                status.currentGame
                  ? "bg-green-500"
                  : status.online
                    ? "bg-blue-500"
                    : "bg-slate-500"
              }`}
              title={
                status.currentGame
                  ? "In-game"
                  : status.online
                    ? "Online"
                    : "Offline"
              }
            />
          </div>
          {status.currentGame ? (
            <p className="text-sm text-green-400">
              Playing <span className="font-medium">{status.currentGame}</span>
            </p>
          ) : (
            <p className="text-sm text-slate-500">
              {status.online ? "Online" : "Offline"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
