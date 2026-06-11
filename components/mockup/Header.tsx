import Image from "next/image";
import Link from "next/link";
import {
  FolderOpen,
  Headphones,
  Home,
  ImageIcon,
  Images,
  Pencil,
  Video,
} from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { IconButton } from "@/components/shared/IconButton";
import { cn } from "@/lib/cn";

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: ImageIcon, label: "Images" },
  { icon: Video, label: "Video" },
  { icon: Pencil, label: "Edit" },
  { icon: FolderOpen, label: "Projects" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-bold tracking-tight text-primary" aria-label="Home">
          F
        </Link>

        <nav aria-label="Main navigation" className="relative hidden sm:block">
          <div className="absolute -top-3 left-1/2 h-0.5 w-16 -translate-x-1/2 rounded-full bg-peach" />
          <ul className="flex items-center gap-1">
            {navItems.map(({ icon: Icon, label, active }) => (
              <li key={label}>
                <IconButton active={active} label={label}>
                  <Icon className={cn("h-5 w-5", active && "fill-current")} strokeWidth={1.75} />
                </IconButton>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/alt"
            className="hidden rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-primary shadow-sm transition-colors hover:bg-panel-tint md:inline-block"
          >
            Studio
          </Link>
          <button
            type="button"
            className="hidden items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-sm text-primary shadow-sm transition-colors hover:bg-panel-tint sm:flex"
          >
            <Images className="h-4 w-4" />
            <span>Gallery</span>
          </button>
          <button
            type="button"
            className="hidden items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-sm text-primary shadow-sm transition-colors hover:bg-panel-tint sm:flex"
          >
            <Headphones className="h-4 w-4" />
            <span>Support</span>
          </button>
          <ThemeToggle />
          <Image
            src="https://picsum.photos/seed/avatar/80/80"
            alt="User profile"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover ring-2 ring-surface"
          />
        </div>
      </div>
    </header>
  );
}
