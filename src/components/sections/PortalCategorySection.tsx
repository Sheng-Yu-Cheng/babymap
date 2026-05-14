import Link from "next/link";
import { Baby, CalendarCheck, HeartHandshake, MapPin, MessageCircleQuestion, Users } from "lucide-react";

import { Section } from "@/components/Section";

const portalActions = [
  {
    title: "查找育兒資源",
    description: "快速進入托育地圖，查看附近公托、親子館、哺乳室與兒科支援。",
    href: "/resources",
    icon: MapPin,
  },
  {
    title: "預約即時保姆",
    description: "臨時需要照護時，先看懂媒合流程、可預約時段與安全提示。",
    href: "/booking",
    icon: Baby,
  },
  {
    title: "破解生育焦慮",
    description: "把社群上的模糊恐懼拆成預算、照護、分工與資源問題。",
    href: "/anxiety",
    icon: MessageCircleQuestion,
  },
];

const portalCategories = [
  {
    title: "生育前規劃",
    description: "從成本、補助到時間軸，先知道每一步大概要準備什麼。",
    icon: CalendarCheck,
    links: [
      { label: "補助與預算試算", href: "/subsidies" },
      { label: "生育時間軸導航", href: "/roadmap" },
    ],
  },
  {
    title: "托育與照護",
    description: "把附近照護資源、臨時保姆與安全機制放在同一個入口。",
    icon: Baby,
    links: [
      { label: "托育資源地圖", href: "/resources" },
      { label: "即時保姆預約", href: "/booking" },
      { label: "安全與認證機制", href: "/safety" },
    ],
  },
  {
    title: "資訊與心理支持",
    description: "回應社群焦慮，也看見其他家庭如何安排支持組合。",
    icon: HeartHandshake,
    links: [
      { label: "社群焦慮破解", href: "/anxiety" },
      { label: "真實育兒案例", href: "/stories" },
    ],
  },
  {
    title: "父職與伴侶分工",
    description: "把照護責任從單一照顧者，移回伴侶與支持系統一起討論。",
    icon: Users,
    links: [
      { label: "父職專區", href: "/dad-mode" },
      { label: "生育時間軸導航", href: "/roadmap" },
    ],
  },
];

export function PortalCategorySection() {
  return (
    <>
      <Section
        title="你現在最需要哪一種支持？"
        description="像入口網站一樣，先把最常見的育兒問題整理成清楚入口，點進去再看完整功能。"
        className="pt-8"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {portalActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group rounded-[1.75rem] border border-border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-soft"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
                <action.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-xl font-semibold">{action.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{action.description}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-primary">前往功能頁</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        title="依需求瀏覽 BabyMap"
        description="不需要一次看完所有資訊，從你目前最卡住的類型開始。"
        className="bg-white/48"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {portalCategories.map((category) => (
            <article key={category.title} className="rounded-[1.75rem] border border-border bg-white p-6 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <category.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-xl font-semibold">{category.title}</h2>
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
