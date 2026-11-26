export type ProjectImage = {
  src: string;
  alt: string;
};

export type ProjectLink = {
  name: string;
  url: string;
};

export type Project = {
  slug: string;
  name: string;
  icon?: string;
  description: string;
  links?: ProjectLink[];
  images?: ProjectImage[];
  tags?: string[];
};

// Repository-managed entries are included alongside the admin-managed list.
export const repositoryProjects: Project[] = [
  {
    slug: "therefore-launcher",
    name: "Therefore Launcher",
    icon: "/projects/therefore-launcher.svg",
    links: [
      { name: "GitHub", url: "https://github.com/Fybre/therefore-launcher" },
      { name: "Windows x64", url: "https://github.com/Fybre/therefore-launcher/releases/latest/download/ThereforeLauncher-win-x64.exe" },
      { name: "Windows ARM64", url: "https://github.com/Fybre/therefore-launcher/releases/latest/download/ThereforeLauncher-win-arm64.exe" },
    ],
    description:
      "A Windows desktop launcher for administrators working across multiple Therefore Online tenants. Save connection profiles, capture existing username/password or Entra ID settings, reorder tenants, and open Navigator, Designer and Console using the same connection. Available as a self-contained single-file app for Windows x64 and ARM64. Requires the Therefore client to be installed. If Windows SmartScreen blocks your trusted download, right-click the launcher EXE, choose Properties, tick Unblock on the General tab if shown, then click Apply and OK. A new download or update may need unblocking again.",
    tags: ["therefore", "windows", "desktop", "csharp", "dotnet", "administration"],
  },
  {
    slug: "therefore-dialog-patcher",
    name: "Therefore Dialog Patcher",
    icon: "/projects/therefore-dialog-patcher.svg",
    links: [
      { name: "GitHub", url: "https://github.com/Fybre/therefore-dialog-patcher" },
      { name: "Windows x64", url: "https://github.com/Fybre/therefore-dialog-patcher/releases/latest/download/ThereforeDialogPatcherGUI.exe" },
    ],
    description:
      "A native C#/.NET Windows utility that suppresses the license-change notification shown after switching Therefore tenants. Scan for a compatible dialog call, patch with a backup, save a patched copy, or restore the original. Supports x86 and x64 client DLLs, requires administrator access, and runs without installing Python. Verified with Therefore v34 x86 and v36 x64; other versions require a compatible match.",
    tags: ["therefore", "windows", "desktop", "csharp", "dotnet", "administration"],
  },
];

export const projects: Project[] = [
  ...repositoryProjects,
  {
    slug: "codesnap",
    name: "CodeSnap",
    description: "A barcode scanner app built with Expo.",
    links: [
      {
        name: "GitHub",
        url: "https://github.com/Fybre/codesnap-barcode-scanner",
      },
      { name: "App Store", url: "https://apps.apple.com/app/6757689692" },
    ],
    tags: ["mobile", "react-native", "ios", "android", "expo"],
    images: [
      // optional
      {
        src: "https://raw.githubusercontent.com/Fybre/codesnap-barcode-scanner/main/assets/screenshots/Android_Scan_Screen_1.jpg",
        alt: "Scan screen",
      },
      {
        src: "https://raw.githubusercontent.com/Fybre/codesnap-barcode-scanner/main/assets/screenshots/Android_Settings_1.jpg",
        alt: "Settings",
      },
    ],
  },
  {
    slug: "workout-notes",
    name: "Workout Notes",
    description:
      "A mobile application for tracking workouts and notes. Track your workouts with ease. Log sets, monitor personal bests, all offline. Workout Notes is a simple, fast, and privacy-focused workout tracker designed for people who want to log their exercises without the complexity of predefined plans or subscriptions.",
    links: [{ name: "GitHub", url: "https://github.com/Fybre/workout-notes" }],
    tags: ["mobile", "react-native", "ios", "android", "expo", "fitness"],
  },
  {
    slug: "eformlauncher",
    name: "EForm Launcher",
    description:
      "A React Native mobile application for managing and launching multiple electronic forms with session persistence and submission tracking.",
    links: [{ name: "GitHub", url: "https://github.com/Fybre/eform-launcher" }],
    tags: ["therefore", "mobile", "react-native", "ios", "android", "forms"],
  },
  {
    slug: "lnksnp",
    name: "Lnksnp",
    description: "No frills link/URL shortener.",
    links: [
      { name: "GitHub", url: "https://github.com/Fybre/lnksnp" },
      { name: "Web", url: "https://lnksnp.com" },
      {
        name: "Docker Hub",
        url: "https://hub.docker.com/repository/docker/fybre/lnksnp",
      },
    ],
    tags: ["web", "url-shortener", "javascript", "docker"],
  },
  {
    slug: "jwtcreator",
    name: "JWT Creator",
    description:
      "A JWT token creator and decoder - specifically for Therefore.",
    links: [
      { name: "GitHub", url: "https://github.com/Fybre/jwt-creator" },
      { name: "GitHub Pages", url: "https://fybre.github.io/jwt-creator/" },
      { name: "Web", url: "https://jwt.fybre.me" },
    ],
    tags: ["therefore", "web", "jwt", "javascript", "api"],
  },
    {
    slug: "theconfiguration-processor",
    name: "TheConfiguration Processor",
    description: "A tool for processing Therefore configuration files and generating HTML documentation from them.",
    links: [
      { name: "GitHub", url: "https://github.com/Fybre/theconfiguration-processor" },
      { name: "Website", url: "https://theconfig.fybre.me/" },
    ],
    tags: ["therefore", "documentation", "docker", "python"],
  },
  {
    slug: "qrcoder",
    name: "QR Coder",
    description: "A QR code generator.",
    links: [
      { name: "GitHub", url: "https://github.com/Fybre/qrcoder" },
      { name: "GitHub Pages", url: "https://fybre.github.io/qrcoder/" },
    ],
    tags: ["qr", "barcode", "web", "javascript"],
  },
  {
    slug: "csvserver",
    name: "CSV Server",
    description: "A simple CSV server for serving CSV files.",
    links: [
      { name: "GitHub", url: "https://github.com/Fybre/csvserver" },
      { name: "Web", url: "https://csvserver.fybre.me" },
    ],
    tags: ["therefore", "web", "csv", "javascript"],
  },
];
