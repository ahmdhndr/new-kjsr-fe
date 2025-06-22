import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: "KJSR Indonesia",
    description: siteConfig.description,
    id: "/",
    start_url: "/",
    display: "standalone",
    background_color: "#f2faef",
    theme_color: "#1d3658",
    orientation: "portrait",
    icons: [
      {
        purpose: "maskable",
        src: "/icon512_maskable.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        purpose: "any",
        src: "/icon512_rounded.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/screenshot-wide.png",
        sizes: "1920x1080",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: "/screenshots/screenshot-mobile.png",
        sizes: "536x822",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
  };
}
