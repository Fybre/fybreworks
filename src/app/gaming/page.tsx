import type { Metadata } from "next";
import { SteamStatus } from "@/components/steam-status";
import { SteamGames } from "@/components/steam-games";

export const metadata: Metadata = {
  title: "Gaming",
  description: "Casual gaming on PC and handheld - modern and retro titles.",
};

export default function GamingPage() {
  const displayLimit = Math.min(
    parseInt(process.env.STEAM_DISPLAY_LIMIT || "6"),
    50
  ); // Default 6, max 50

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight gradient-text animate-fade-in">
          Gaming
        </h1>
        <p className="text-slate-300 animate-fade-in-up stagger-1">
          I'm a casual gamer who enjoys both modern titles and retro classics.
          Whether it's the latest releases on my Gaming PC or diving into
          nostalgia with emulators on my Legion Go handheld, gaming is my go-to
          way to unwind.
        </p>
      </header>

      {/* Steam Status - Currently Playing */}
      <div className="animate-fade-in-up stagger-2">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Currently
        </h2>
        <SteamStatus />
      </div>

      {/* Platforms */}
      <div className="animate-fade-in-up stagger-3">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Platforms
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="card-hover rounded-lg border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-medium text-slate-100">Gaming PC</h3>
            <p className="mt-1 text-sm text-slate-400">
              Main rig for modern titles and more demanding games.
            </p>
          </div>
          <div className="card-hover rounded-lg border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-medium text-slate-100">Legion Go</h3>
            <p className="mt-1 text-sm text-slate-400">
              Handheld for gaming on the go and retro emulation.
            </p>
          </div>
        </div>
      </div>

      {/* Steam Library Stats & Games */}
      <div className="animate-fade-in-up stagger-4">
        <SteamGames displayLimit={displayLimit} />
      </div>
    </section>
  );
}
