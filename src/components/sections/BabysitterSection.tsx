import { BabysitterCard } from "@/components/cards/BabysitterCard";
import { Section } from "@/components/Section";
import { babysitters } from "@/data/babymap";

export function BabysitterSection() {
  return (
    <Section
      id="babysitters"
      eyebrow="BabyCare Now"
      title="即時保姆預約 Demo"
      description="先用靜態卡片呈現臨時照護媒合的核心資訊：距離、時段、價格、評分與安全機制。"
      className="bg-white/48"
    >
      <div className="mb-6 grid gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm md:grid-cols-4">
        <label className="text-sm font-medium">
          地點
          <input className="mt-2 w-full rounded-xl border border-border px-3 py-2" defaultValue="台北市大安區" />
        </label>
        <label className="text-sm font-medium">
          時間
          <input className="mt-2 w-full rounded-xl border border-border px-3 py-2" defaultValue="今天 14:00-18:00" />
        </label>
        <label className="text-sm font-medium md:col-span-2">
          需求
          <input className="mt-2 w-full rounded-xl border border-border px-3 py-2" defaultValue="臨時保母，到府照顧" />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {babysitters.map((babysitter) => (
          <BabysitterCard key={babysitter.id} babysitter={babysitter} />
        ))}
      </div>
    </Section>
  );
}
