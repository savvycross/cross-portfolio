// Project content. Order here = order on the site.
// To add a project, copy an entry and fill in what you have — every optional field
// can be left out and its section simply won't render.

export type MediaItem = {
  /** Image path in /public or full URL, or a Vimeo URL (set type: "video"). */
  src: string;
  alt: string;
  type?: "image" | "video";
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Who it was for. Leave out for self-initiated/concept work. */
  client?: string;
  categories: string[];
  year?: number;
  role: string;
  tools?: string[];
  /** One or two sentences shown on cards and at the top of the project page. */
  summary: string;
  /** Optional bullet points of what the work covers. */
  highlights?: string[];
  /** Full project video (Vimeo URL). */
  video: string;
  /** Optional 3–6s Vimeo clip for hover previews. Falls back to the full video. */
  preview?: string;
  /** Optional poster override. Falls back to the Vimeo thumbnail. */
  poster?: string;
  /** Concept / self-initiated work, labelled as such. */
  concept?: boolean;
  /**
   * public — shown normally
   * nda    — listed, but no video or media is shown
   * hidden — not shown anywhere
   */
  visibility: "public" | "nda" | "hidden";
  /** Styleframes, storyboards, UI exploration, breakdowns. Only add approved assets. */
  process?: MediaItem[];
  /** Still frames and supporting visuals. Only add approved assets. */
  gallery?: MediaItem[];
};

export const projects: Project[] = [
  {
    slug: "sendana",
    title: "Sendana",
    client: "Sendana",
    categories: ["Fintech", "Product Motion"],
    year: 2026,
    role: "Motion Designer",
    tools: ["After Effects", "Figma", "Illustrator"],
    summary:
      "Product-focused motion work for Sendana, a financial platform built for freelancers, remote workers and content creators.",
    highlights: ["Product explainer", "Direct-To-Bank feature video", "UI / product animation"],
    video: "https://vimeo.com/1230687021",
    visibility: "public",
  },
  {
    slug: "sp3nd",
    title: "SP3ND",
    client: "SP3ND",
    categories: ["Fintech", "Crypto", "Product Motion"],
    year: 2025,
    role: "Motion Designer",
    tools: ["After Effects", "Figma", "Illustrator"],
    summary:
      "Motion design for SP3ND, a crypto shopping product built around spending USDC on Solana.",
    highlights: [
      "Paste → Pay → Delivered",
      "USDC payments",
      "Zero SP3ND charges",
      "Beta Access NFT",
      "Leaderboard",
      "Bitget Wallet integration",
    ],
    video: "https://vimeo.com/1230727075",
    visibility: "public",
  },
  {
    slug: "klava",
    title: "Klava",
    client: "Klava",
    categories: ["Fintech", "Product Motion"],
    role: "Motion Designer",
    tools: ["Figma", "After Effects"],
    summary: "Motion design for Klava, a savings product focused on a younger audience.",
    video: "https://vimeo.com/1230688856",
    visibility: "public",
  },
  {
    slug: "nilgpt",
    title: "nilGPT",
    client: "nilGPT",
    categories: ["AI", "Web3", "Product Motion"],
    role: "Motion Designer",
    summary: "Motion design focused on communicating an AI product concept.",
    video: "https://vimeo.com/1230726887",
    visibility: "public",
  },
  {
    slug: "hedge",
    title: "Hedge",
    client: "Hedge",
    categories: ["Fintech", "Web3", "Product Motion"],
    role: "Motion Designer",
    summary: "Product-focused motion work for Hedge.",
    video: "https://vimeo.com/1230689665",
    visibility: "public",
  },
  {
    slug: "eatora",
    title: "Eatora",
    categories: ["AI", "Food", "Product Concept"],
    role: "Motion Designer",
    summary:
      "A concept project exploring AI-assisted food discovery and decision-making.",
    video: "https://vimeo.com/1230690187",
    concept: true,
    visibility: "public",
  },
  {
    slug: "wordsmith",
    title: "Wordsmith",
    client: "Wordsmith",
    categories: ["Brand", "Product", "Motion Design"],
    role: "Motion Designer",
    summary: "Motion design work for Wordsmith.",
    video: "https://vimeo.com/1230728560",
    visibility: "public",
  },
  {
    slug: "nillion",
    title: "Nillion",
    client: "Nillion",
    categories: ["AI", "Web3", "Technology"],
    role: "Motion Designer",
    summary: "Motion design work created around Nillion’s technology and product ecosystem.",
    video: "https://vimeo.com/1230726751",
    visibility: "public",
  },
];

export const visibleProjects = projects.filter((p) => p.visibility !== "hidden");

export function getProject(slug: string) {
  return visibleProjects.find((p) => p.slug === slug);
}
