import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x grid min-h-[80vh] content-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">404</p>
      <h1 className="font-display mt-6 text-[clamp(2.5rem,7vw,6rem)]">This frame doesn&rsquo;t exist.</h1>
      <Link href="/" className="mt-10 w-fit rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-volt">
        Back home
      </Link>
    </section>
  );
}
