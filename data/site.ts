// All site-wide content lives here. Edit this file to update copy, links and videos.

import portrait from "@/public/images/cross-makele.jpg";

export type SocialLink = { label: string; href: string };

export const site = {
  name: "Cross Makele",
  shortTitle: "Motion Designer",
  title: "Motion designer helping brands explain what they are building to their audience.",
  positioning:
    "I create motion design and product-focused visual content for startups and technology brands — especially AI, fintech, SaaS, Web3 and digital products.",
  // Live address. Set NEXT_PUBLIC_SITE_URL when you move to your own domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://savvycross.github.io/cross-portfolio",
  email: "crossanimations1@gmail.com",
  location: "Nigeria",
  availability: "Available for freelance projects and remote opportunities.",

  // Vimeo links. Set openingAnimation to a Vimeo URL to loop it in the hero;
  // when it's null the hero loops the showreel instead.
  openingAnimation: null as string | null,
  showreel: "https://vimeo.com/1230727683",
  // Optional poster override (path in /public or full URL). Falls back to the Vimeo thumbnail.
  showreelPoster: null as string | null,

  // Only add platforms with real URLs. Empty list = the socials row is hidden.
  socials: [
    // { label: "X", href: "https://x.com/..." },
    // { label: "LinkedIn", href: "https://linkedin.com/in/..." },
    // { label: "Instagram", href: "https://instagram.com/..." },
    // { label: "Behance", href: "https://behance.net/..." },
    // { label: "Vimeo", href: "https://vimeo.com/..." },
  ] as SocialLink[],

  portrait: {
    src: portrait,
    alt: "Portrait of Cross Makele in a green suit and gold tie against a warm orange backdrop",
  },

  about: [
    "I’m a motion designer focused on helping brands explain what they are building to their audience.",
    "I work primarily with startups and technology companies, creating product motion, launch videos, explainers, UI animation and visual content that makes complex ideas easier to understand.",
    "My work sits at the intersection of motion, product storytelling and visual communication.",
  ],

  services: [
    {
      outcome: "Explain the product",
      body: "Turn features, flows and ideas into motion people understand on the first watch.",
      items: ["Product / UI Motion", "Explainer Videos"],
    },
    {
      outcome: "Launch it clearly",
      body: "Give launches, features and releases a clear moment people can share.",
      items: ["Product Launch Videos", "Feature / Release Videos"],
    },
    {
      outcome: "Give the brand motion",
      body: "Build a motion language that makes the brand recognisable wherever it moves.",
      items: ["Brand Animation", "2D Motion Design", "3D Motion Design"],
    },
    {
      outcome: "Keep showing up",
      body: "Short, sharp pieces that keep the product in the feed between big moments.",
      items: ["Social / Short-form Motion"],
    },
  ],

  tools: {
    primary: ["After Effects", "Illustrator", "Figma", "Blender", "Premiere Pro"],
    workflow: ["AEUX", "Overlord", "AI-assisted tools"],
  },
};
