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
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-sm">
            <p className="text-lg leading-8 text-foreground">
              BabyMap 的首頁不是把所有 demo 攤開，而是像 portal 一樣，讓使用者先搜尋、再依需求進入功能頁。補助、托育、即時照護、時間軸、父職分工與真實案例，都被整理成可以逐步探索的入口。
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-border bg-secondary p-6 text-secondary-foreground shadow-sm">
            <p className="text-sm font-semibold">核心原則</p>
            <p className="mt-3 text-2xl font-bold">不是要求你立刻決定，而是先降低不確定感。</p>
          </div>
        </div>
      </Section>
      <Section className="pt-4">
        <div className="rounded-[2rem] border border-border bg-foreground p-8 text-primary-foreground shadow-soft md:p-10">
          <p className="text-sm font-medium text-accent">準備開始</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold">先查一項最困擾你的育兒問題。</h2>
          <p className="mt-3 max-w-2xl leading-7 text-white/78">
            從附近資源、即時保姆或補助預算開始，都可以把不確定感拆小一點。
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/resources"
              className="rounded-full bg-primary px-6 py-3 text-center font-medium text-primary-foreground"
            >
              查找育兒資源
            </Link>
            <Link
              href="/anxiety"
              className="rounded-full border border-white/18 px-6 py-3 text-center font-medium text-white"
            >
              破解生育焦慮
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
