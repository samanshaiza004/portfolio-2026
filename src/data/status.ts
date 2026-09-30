// "what I'm doing right now" — shared between the About page section and the
// NavBox identity carousel. Update these values to reflect current activity;
// bump `statusUpdated` when you do.
export interface StatusItem {
  label: string;
  value: string;
  icon: string;
  staticIcon: string;
  alt: string;
}

export const statusItems: StatusItem[] = [
  {
    label: "playing",
    value: "Destiny 2 and Street Fighter VI",
    icon: "/icons/status-playing.gif",
    staticIcon: "/icons/status-playing-static.png",
    alt: "controller on fire",
  },
  {
    label: "working on",
    value: "programming and day drinking",
    icon: "/icons/status-working.gif",
    staticIcon: "/icons/status-working-static.png",
    alt: "usa flag waving",
  },
  {
    label: "reading",
    value: "Asadora",
    icon: "/icons/status-reading.gif",
    staticIcon: "/icons/status-reading-static.png",
    alt: "cheese dancing",
  },
  {
    label: "recently watched",
    value: "Talladega Nights",
    icon: "/icons/status-watched.gif",
    staticIcon: "/icons/status-watched-static.png",
    alt: "spinning star",
  },
];

export const statusUpdated = "July 22, 2026";
