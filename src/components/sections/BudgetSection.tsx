"use client";

import { Calculator, CheckCircle2, ExternalLink, Wallet } from "lucide-react";
import { useMemo, useState } from "react";

import { Section } from "@/components/Section";
import {
  careScenarioLabels,
  childAgeStageLabels,
  childOrderLabels,
  familyStatusLabels,
  officialSubsidyPrograms,
  type ChildAgeStage,
  type ChildOrder,
  type FamilyStatus,
  type TaipeiCareScenario,
} from "@/data/subsidies";
import { calculateSubsidies } from "@/lib/subsidies/calculate";
import { cn } from "@/lib/utils";

const childAgeStageOptions: ChildAgeStage[] = ["pregnancy", "newborn", "under2", "age2to5", "age5"];
const childOrderOptions: ChildOrder[] = ["first", "second", "thirdOrMore"];
const careScenarioOptions: TaipeiCareScenario[] = [
  "home_care",
  "uncontracted_trained_babysitter",
  "uncontracted_certified_babysitter_or_center",
  "public_nursery",
  "community_public_care_home",
  "quasi_public_babysitter_or_center",
  "private_kindergarten",
];
const familyStatusOptions: FamilyStatus[] = ["general", "middle_low_income", "low_income_or_vulnerable"];

function formatCurrency(amount: number) {
  return `NT$${amount.toLocaleString()}`;
}

export function BudgetSection() {
  const [childAgeStage, setChildAgeStage] = useState<ChildAgeStage>("under2");
  const [childOrder, setChildOrder] = useState<ChildOrder>("first");
  const [careScenario, setCareScenario] = useState<TaipeiCareScenario>("quasi_public_babysitter_or_center");
  const [familyStatus, setFamilyStatus] = useState<FamilyStatus>("general");

  const result = useMemo(
    () =>
      calculateSubsidies({
        city: "taipei",
        childAgeStage,
        childOrder,
        careScenario,
        familyStatus,
      }),
    [careScenario, childAgeStage, childOrder, familyStatus],
  );

  const nextSteps = [
    "先確認孩子年齡、胎次、照顧方式與戶籍/居住條件是否符合。",
    "點開官方來源，確認最新資格、申請文件與是否可併領。",
    "若使用托育服務，請同步確認機構或托育人員是否符合公共化、準公共或臺北市補助條件。",
  ];

  return (
    <Section
      id="budget"
      eyebrow="補助與預算"
      title="用官方來源整理補助，讓育兒成本更可規劃"
      description="以下資料為 BabyMap 依官方來源手動整理的 curated data；試算為 demo，不會即時爬取政府網站。"
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
              <Calculator className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg font-semibold">家庭條件輸入</h3>
              <p className="text-sm text-muted-foreground">目前支援臺北市情境，計算邏輯為 BabyMap demo。</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium">
              居住縣市
              <select
                value="taipei"
                disabled
                className="mt-2 w-full rounded-2xl border border-border bg-muted px-4 py-3 text-muted-foreground outline-none"
              >
                <option value="taipei">臺北市</option>
              </select>
            </label>

            <SelectField
              label="孩子階段"
              value={childAgeStage}
              onChange={(value) => setChildAgeStage(value as ChildAgeStage)}
              options={childAgeStageOptions.map((value) => ({
                value,
                label: childAgeStageLabels[value],
              }))}
            />

            <SelectField
              label="第幾名子女"
              value={childOrder}
              onChange={(value) => setChildOrder(value as ChildOrder)}
              options={childOrderOptions.map((value) => ({
                value,
                label: childOrderLabels[value],
              }))}
            />

            <SelectField
              label="家庭身分"
              value={familyStatus}
              onChange={(value) => setFamilyStatus(value as FamilyStatus)}
              options={familyStatusOptions.map((value) => ({
                value,
                label: familyStatusLabels[value],
              }))}
            />
          </div>

          <label className="mt-4 block text-sm font-medium">
            托育 / 照顧情境
            <select
              value={careScenario}
              onChange={(event) => setCareScenario(event.target.value as TaipeiCareScenario)}
              className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-primary"
            >
              {careScenarioOptions.map((value) => (
                <option key={value} value={value}>
                  {careScenarioLabels[value]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="space-y-5">
          <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <Wallet className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">試算結果</h3>
                <p className="text-sm text-muted-foreground">官方來源 curated data + BabyMap demo 計算。</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <ResultCard label="一次性可能補助" value={formatCurrency(result.oneTimeTotal)} />
              <ResultCard label="每月可能補助" value={formatCurrency(result.monthlyTotal)} tone="primary" />
            </div>

            <div className="mt-5 rounded-2xl bg-muted p-4 text-sm leading-6 text-muted-foreground">
              {result.disclaimers.map((disclaimer) => (
                <p key={disclaimer}>{disclaimer}</p>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold">申請下一步</h3>
            <ul className="mt-4 grid gap-3">
              {nextSteps.map((step) => (
                <li key={step} className="flex gap-2 text-sm leading-6 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary-foreground" aria-hidden="true" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold">可能適用政策</h3>
          <div className="mt-4 grid gap-3">
            {result.matchedPrograms.length > 0 ? (
              result.matchedPrograms.map((program) => (
                <article key={program.id} className="rounded-2xl bg-muted p-4">
                  <p className="font-semibold">{program.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{program.amountLabel}</p>
                </article>
              ))
            ) : (
              <p className="text-sm leading-6 text-muted-foreground">
                目前條件沒有計入明確金額，請查看下方官方政策卡片。
              </p>
            )}
          </div>
          {result.notes.length > 0 ? (
            <div className="mt-5 rounded-2xl bg-secondary p-4 text-sm leading-6 text-secondary-foreground">
              {result.notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <h3 className="text-lg font-semibold">官方來源政策卡</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {officialSubsidyPrograms.map((program) => (
              <article key={program.id} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <p className="text-xs font-medium text-primary">{program.sourceName}</p>
                <h4 className="mt-2 font-semibold">{program.title}</h4>
                <p className="mt-3 text-sm font-bold text-primary">{program.amountLabel}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{program.summary}</p>
                <a
                  href={program.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground"
                >
                  查看官方來源
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="text-sm font-medium">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-primary"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ResultCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "primary";
}) {
  return (
    <article
      className={cn(
        "rounded-2xl p-4",
        tone === "primary" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
      )}
    >
      <p className="text-sm opacity-80">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </article>
  );
}
