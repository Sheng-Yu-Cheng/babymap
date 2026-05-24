"use client";

import { MessageCircleQuestion, Search } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

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

type AskBabyMapResponse = {
  reply: string;
  recommendedLinks: Array<{ label: string; href: string }>;
};

export function AnxietyBreakerSection() {
  const [selectedId, setSelectedId] = useState(anxietyCards[0].id);
  const [question, setQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState<AskBabyMapResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const selectedCard = anxietyCards.find((card) => card.id === selectedId) ?? anxietyCards[0];

  async function handleAskBabyMap(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    setLoading(true);
    setErrorMessage("");
    setAiResponse(null);

    try {
      const response = await fetch("/api/anxiety", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedQuestion }),
      });

      if (!response.ok) {
        throw new Error("Ask BabyMap request failed");
      }

      const data = (await response.json()) as AskBabyMapResponse;
      setAiResponse(data);
    } catch {
      setErrorMessage("暫時無法取得 AI 回應，先看看下方的焦慮破解卡片。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section
      id="anxiety"
      eyebrow="社群焦慮破解"
      title="把社群焦慮轉成具體支持行動"
      description="數位媒體可能放大焦慮，但數位工具也可以成為支持系統。這裡用 mock 問答示範 BabyMap 如何承認壓力，再連到可使用的工具。"
      className="bg-white/48"
    >
      <div className="mb-6 rounded-[1.75rem] border border-border bg-white p-5 shadow-sm">
        <form onSubmit={handleAskBabyMap}>
          <label className="text-sm font-medium">
            Ask BabyMap
            <span className="mt-3 flex flex-col gap-3 rounded-2xl border border-border bg-muted px-4 py-3 sm:flex-row sm:items-center">
              <span className="flex min-w-0 flex-1 items-center gap-3">
                <Search className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <input
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  maxLength={500}
                  className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                  placeholder="輸入你在社群上看到的育兒焦慮..."
                />
              </span>
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "整理中..." : "送出"}
              </button>
            </span>
          </label>
        </form>

        {loading ? (
          <p className="mt-4 rounded-2xl bg-secondary p-4 text-sm leading-6 text-secondary-foreground">
            BabyMap 正在整理你的焦慮...
          </p>
        ) : null}

        {errorMessage ? (
          <p className="mt-4 rounded-2xl bg-muted p-4 text-sm leading-6 text-muted-foreground">
            {errorMessage}
          </p>
        ) : null}

        {aiResponse ? (
          <div className="mt-4 rounded-2xl bg-secondary p-4 text-sm leading-6 text-secondary-foreground">
            <p className="font-semibold">BabyMap 回應</p>
            <p className="mt-2">{aiResponse.reply}</p>
            {aiResponse.recommendedLinks.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {aiResponse.recommendedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-foreground transition hover:bg-accent hover:text-accent-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          AI 回應僅供課堂 demo 與資訊整理參考，不取代專業醫療、法律或財務建議。
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
