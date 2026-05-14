import Link from "next/link";

import { navItems } from "@/data/babymap";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white/60 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>BabyMap · 不是催生，而是降低生育焦慮。</p>
        <nav className="flex flex-wrap gap-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
