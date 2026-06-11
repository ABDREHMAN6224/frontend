import Link from "next/link";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export function AltHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
        <Link href="/alt" className="text-lg font-bold tracking-tight text-white">
          Studio
        </Link>
        <nav aria-label="Design variants" className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-full px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:text-white"
          >
            Classic
          </Link>
          <Link
            href="/alt"
            className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white"
          >
            Studio
          </Link>
        </nav>
        <ThemeToggle className="border border-white/10 bg-white/10 text-white hover:bg-white/20" />
      </div>
    </header>
  );
}
