import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="container-x flex flex-col gap-4 border-t border-line py-8 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} {site.name}
      </p>
      {site.socials.length > 0 && (
        <ul className="flex flex-wrap gap-5">
          {site.socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-bone">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      <a href="#main" className="transition-colors hover:text-bone">
        Back to top ↑
      </a>
    </footer>
  );
}
