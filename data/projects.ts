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
      { name: "GitHub", url: "https://github.com/fybre/codesnap" },
      { name: "App Store", url: "https://apps.apple.com/app/your-app-id" },
      { name: "Play Store", url: "https://play.google.com/..." },
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
    slug: "eformlauncher",
    name: "EForm Launcher",
    description:
      "A React Native mobile application for managing and launching multiple electronic forms with session persistence and submission tracking.",
    links: [
      { name: "GitHub", url: "https://github.com/Fybre/eform-launcher" },
      { name: "App Store", url: "https://apps.apple.com/app/your-app-id" },
    ],
    tags: ["mobile", "react-native", "ios", "android", "forms"],
  },
  {
    slug: "lnksnp",
    name: "Lnksnp",
    description: "No frills link/URL shortener.",
    links: [{ name: "GitHub", url: "https://github.com/Fybre/lnksnp" }],
    tags: ["web", "url-shortener", "javascript"],
  },
];
