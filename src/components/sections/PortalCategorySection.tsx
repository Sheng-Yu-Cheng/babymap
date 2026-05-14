import Link from "next/link";

import { Section } from "@/components/Section";
import { portalActions, portalCategories } from "@/data/babymap";

export function PortalCategorySection() {
  return (
    <>
      <Section
        title="先從你現在最需要的事開始"
        description="首頁只保留入口與搜尋，完整 demo 放在各功能頁。"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {portalActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-3xl border border-border bg-white p-6 shadow-sm transition hover:border-primary hover:shadow-soft"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                <action.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-xl font-semibold">{action.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{action.description}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        title="功能分類"
        description="像入口網站一樣，把 BabyMap 的支持工具分成幾個清楚方向。"
        className="bg-white/48"
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {portalCategories.map((category) => (
            <article key={category.title} className="rounded-3xl border border-border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">{category.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{category.description}</p>
              <div className="mt-5 grid gap-2">
                {category.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-2xl bg-muted px-4 py-3 text-sm font-medium text-foreground transition hover:bg-secondary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
