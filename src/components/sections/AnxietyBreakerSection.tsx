"use client";

import { useState } from "react";

import { Section } from "@/components/Section";
import { anxietyCards } from "@/data/babymap";

export function AnxietyBreakerSection() {
  const [selectedId, setSelectedId] = useState(anxietyCards[0].id);
  const selectedCard = anxietyCards.find((card) => card.id === selectedId) ?? anxietyCards[0];

  return (
    <Section
      id="anxiety"
      eyebrow="社群焦慮破解"
      title="不否認壓力，而是把恐懼拆成可以處理的問題"
      description="這裡先用預設問答模擬 Ask BabyMap，沒有串接真實 AI。"
      className="bg-white/48"
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-3">
          {anxietyCards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => setSelectedId(card.id)}
              className="rounded-2xl border border-border bg-white p-5 text-left shadow-sm transition hover:border-primary"
            >
              <span className="text-sm font-medium text-primary">社群說法</span>
              <span className="mt-2 block text-lg font-semibold">{card.fear}</span>
            </button>
          ))}
        </div>
        <article className="rounded-3xl border border-border bg-white p-6 shadow-soft">
          <p className="text-sm font-medium text-primary">BabyMap 回應</p>
          <p className="mt-4 text-lg leading-8 text-foreground">{selectedCard.response}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {selectedCard.links.map((link) => (
              <span key={link} className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                {link}
              </span>
            ))}
          </div>
        </article>
      </div>
    </Section>
  );
}
