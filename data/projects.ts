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
  description: string;
  links?: ProjectLink[];
  images?: ProjectImage[];
  tags?: string[];
};

export const projects: Project[] = [
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
