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
    50,
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

      {/* Platforms */}
      <div className="animate-fade-in-up stagger-2">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Platforms
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="card-hover rounded-lg border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-medium text-slate-100">Gaming PC</h3>
            <div className="mt-2 space-y-1 text-xs text-slate-400">
              <div>
                <strong>CPU:</strong> AMD Ryzen 5 5600X (6C/12T, 4.65GHz)
              </div>
              <div>
                <strong>GPU:</strong> RTX 4070 SUPER
              </div>
              <div>
                <strong>RAM:</strong> 32GB DDR4
              </div>
              <div>
                <strong>Storage:</strong> 465GB NVMe + 477GB SSD + 1.82TB SSD +
                3.64TB HDD
              </div>
              <div>
                <strong>OS:</strong> Windows 11 Pro
              </div>
            </div>
          </div>
          <div className="card-hover rounded-lg border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-medium text-slate-100">Legion Go</h3>
            <div className="mt-2 space-y-1 text-xs text-slate-400">
              <div>
                <strong>CPU:</strong> AMD Ryzen Z1 Extreme (8C/16T, 5.1GHz)
              </div>
              <div>
                <strong>GPU:</strong> AMD RDNA 3 iGPU (Radeon RX 7600M XT)
              </div>
              <div>
                <strong>RAM:</strong> 16GB LPDDR5
              </div>
              <div>
                <strong>Storage:</strong> 1TB SSD
              </div>
              <div>
                <strong>Display:</strong> 8.8" 1600x2560 IPS LCD, 144Hz
              </div>
              <div>
                <strong>Battery:</strong> 49.2Wh
              </div>
              <div>
                <strong>OS:</strong> SteamOS
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Steam Status - Currently Playing */}
      <div className="animate-fade-in-up stagger-3">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Steam Details
        </h2>
        <p className="text-slate-300 mb-4">
          The following details are retrieved dynamically from my Steam profile.
        </p>
        <div className="mb-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Currently Playing
          </h2>
          <SteamStatus />
        </div>
      </div>

      {/* Steam Library Stats & Games */}
      <div className="animate-fade-in-up stagger-4">
        <SteamGames displayLimit={displayLimit} />
      </div>
    </section>
  );
}
