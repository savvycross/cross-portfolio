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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cross-portfolio-gamma.vercel.app",
  email: "crossanimations1@gmail.com",
  bookingUrl: "https://cal.com/0xcrosss/motiondesign",
  availability:
    "Available to take on freelance projects, full-time roles, collaborations and retainers in motion design.",
  // The rotating availability line: the label stays still, the phrases cycle.
  availabilityLabel: "Available to take on",
  opportunities: ["Freelance projects", "Full-time roles", "Collaborations", "Retainer"],

  // Pre-filled email used by the email link in Contact (and as the form's fallback).
  enquiry: {
    subject: "Motion design project",
    body: "Hi Cross, I want to work with you on a motion design project. How do we kick off?",
  },

  // Vimeo links. Set openingAnimation to a Vimeo URL to loop it in the hero;
  // when it's null the hero loops the showreel instead.
  openingAnimation: null as string | null,
  showreel: "https://vimeo.com/1230727683",
  // Optional poster override (path in /public or full URL). Falls back to the Vimeo thumbnail.
  showreelPoster: null as string | null,

  // Only add platforms with real URLs. Empty list = the socials row is hidden.
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/0xcrosss" },
    { label: "X", href: "https://x.com/0xCrosss" },
    { label: "Instagram", href: "https://www.instagram.com/0xcrosss/" },
    { label: "Behance", href: "https://www.behance.net/0xcrosss" },
    { label: "Telegram", href: "https://t.me/savvycross" },
  ] as SocialLink[],

  // Options for the "Start a project" form. Edit freely.
  form: {
    projectTypes: [
      "Product / UI motion",
      "Explainer video",
      "Product launch video",
      "Feature / release video",
      "Brand animation",
      "2D motion design",
      "3D motion design",
      "Social / short-form",
      "Retainer",
      "Something else",
    ],
    budgets: ["Under $1k", "$1k – $3k", "$3k – $5k", "$5k – $10k", "$10k+", "Not sure yet"],
    timelines: ["As soon as possible", "2 – 4 weeks", "1 – 2 months", "2+ months", "Flexible"],
  },

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

/** mailto: link with the enquiry subject and message already filled in. */
export const enquiryHref = `mailto:${site.email}?subject=${encodeURIComponent(site.enquiry.subject)}&body=${encodeURIComponent(site.enquiry.body)}`;
