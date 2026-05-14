import Link from "next/link";

import { Section } from "@/components/Section";

type RelatedLinksProps = {
  links: Array<{
    label: string;
    href: string;
  }>;
};

export function RelatedLinks({ links }: RelatedLinksProps) {
  return (
    <Section title="相關功能" description="可以接著查看這些支持工具。">
      <div className="flex flex-wrap gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-border bg-white px-5 py-3 text-sm font-medium text-foreground shadow-sm transition hover:border-primary"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </Section>
  );
}
