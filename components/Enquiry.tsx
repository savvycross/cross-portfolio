import type { ReactNode } from "react";
import { enquiryHref } from "@/data/site";

/** Email link with the enquiry subject and message pre-filled. */
export function EnquiryLink({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <a href={enquiryHref} className={className}>
      {children}
    </a>
  );
}
