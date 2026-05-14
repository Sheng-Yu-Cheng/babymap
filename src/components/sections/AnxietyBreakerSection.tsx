"use client";

import { MessageCircleQuestion, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Section } from "@/components/Section";
import { anxietyCards } from "@/data/babymap";
import { cn } from "@/lib/utils";

const toolLinks: Record<string, string> = {
  伴侶分工: "/dad-mode",
  即時保姆: "/booking",
  托育補助: "/subsidies",
  補助查詢: "/subsidies",
  預算試算: "/subsidies",
  即時保姆預約: "/booking",
  托育資源地圖: "/resources",
  安全機制: "/safety",
};

export function AnxietyBreakerSection() {
  const [selectedId, setSelectedId] = useState(anxietyCards[0].id);
  const [question, setQuestion] = useState("");
  const selectedCard = anxietyCards.find((card) => card.id === selectedId) ?? anxietyCards[0];

  return (
    <Section
      id="anxiety"
      eyebrow="社群焦慮破解"
      title="把社群焦慮轉成具體支持行動"
      description="數位媒體可能放大焦慮，但數位工具也可以成為支持系統。這裡用 mock 問答示範 BabyMap 如何承認壓力，再連到可使用的工具。"
      className="bg-white/48"
    >
      <div className="mb-6 rounded-[1.75rem] border border-border bg-white p-5 shadow-sm">
        <label className="text-sm font-medium">
          Ask BabyMap
          <span className="mt-3 flex items-center gap-3 rounded-2xl border border-border bg-muted px-4 py-3">
            <Search className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
              placeholder="輸入你在社群上看到的育兒焦慮..."
            />
          </span>
        </label>
        <p className="mt-4 rounded-2xl bg-secondary p-4 text-sm leading-6 text-secondary-foreground">
          Demo 回應：
          {question
            ? "這個擔心值得被認真看待。你可以先把它拆成金錢、照護、時間或分工問題，再用下方工具找到下一步。"
            : "輸入後會顯示一段預設回應。此處沒有串接真實 AI。"}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-3 lg:content-start">
          {anxietyCards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => setSelectedId(card.id)}
              className={cn(
                "rounded-[1.5rem] border bg-white p-5 text-left shadow-sm transition hover:border-primary",
                selectedId === card.id ? "border-primary shadow-soft" : "border-border",
              )}
            >
              <span className="text-sm font-medium text-primary">社群常見說法</span>
              <span className="mt-2 block text-lg font-semibold">{card.fear}</span>
            </button>
          ))}
        </div>
        <article className="rounded-[1.75rem] border border-border bg-white p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
              <MessageCircleQuestion className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-medium text-primary">BabyMap 的溫和回應</p>
              <h3 className="text-xl font-semibold">先承認壓力，再找到支持</h3>
            </div>
          </div>
          <p className="mt-5 text-lg leading-8 text-foreground">{selectedCard.response}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {selectedCard.links.map((link) => (
              <Link
                key={link}
                href={toolLinks[link] ?? "/"}
                className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground transition hover:bg-accent hover:text-accent-foreground"
              >
                {link}
              </Link>
            ))}
          </div>
        </article>
      </div>
    </Section>
  );
}
