import Link from "next/link";

import { Section } from "@/components/Section";
import { PortalCategorySection } from "@/components/sections/PortalCategorySection";
import { PortalHeroSection } from "@/components/sections/PortalHeroSection";

export default function Home() {
  return (
    <main>
      <PortalHeroSection />
      <PortalCategorySection />
      <Section
        title="BabyMap 的理念"
        description="BabyMap 不把少子化簡化成要不要生，而是服務已經有意願、卻被資訊不足、照護不安、經濟壓力與社群焦慮卡住的人。"
      >
        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
          <p className="max-w-3xl text-lg leading-8 text-foreground">
            不是催生，而是降低生育焦慮。平台把補助、托育、即時照護、時間軸、父職分工與真實案例整合成入口，讓生育從模糊焦慮變成可以規劃的選擇。
          </p>
        </div>
      </Section>
      <Section className="pt-4">
        <div className="rounded-3xl border border-border bg-foreground p-8 text-primary-foreground shadow-soft">
          <p className="text-sm font-medium text-accent">準備開始</p>
          <h2 className="mt-3 text-3xl font-bold">先查一項最困擾你的育兒問題。</h2>
          <p className="mt-3 max-w-2xl leading-7 text-white/78">
            從補助、托育或焦慮破解開始，都可以慢慢把不確定感拆小。
          </p>
          <Link
            href="/subsidies"
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground"
          >
            查看補助與預算
          </Link>
        </div>
      </Section>
    </main>
  );
}
