import { Baby } from "lucide-react";
import Link from "next/link";

import { navItems } from "@/data/babymap";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/86 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Baby className="h-5 w-5" aria-hidden="true" />
          </span>
          BabyMap
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/subsidies"
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
        >
          開始規劃
        </Link>
      </div>
    </header>
  );
}
