"use client";

import { Calculator, CheckCircle2, Wallet } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import { Section } from "@/components/Section";
import { subsidies } from "@/data/babymap";
import { cn } from "@/lib/utils";

const cityOptions = ["台北市", "新北市", "桃園市", "台中市", "高雄市"];
const childOrderOptions = ["第一胎", "第二胎", "第三胎以上"];
const careTypeOptions = ["公托 / 準公托", "合格保母", "私立托嬰", "家人協助"];

const careTypeCosts: Record<string, number> = {
  "公托 / 準公托": 9000,
  合格保母: 18000,
  私立托嬰: 24000,
  家人協助: 6000,
};

function formatCurrency(amount: number) {
  return `NT$${amount.toLocaleString()}`;
}

export function BudgetSection() {
  const [city, setCity] = useState(cityOptions[0]);
  const [monthlyIncome, setMonthlyIncome] = useState(90000);
  const [childOrder, setChildOrder] = useState(childOrderOptions[0]);
  const [careType, setCareType] = useState(careTypeOptions[0]);
  const [dualIncome, setDualIncome] = useState(true);
  const [grandparentSupport, setGrandparentSupport] = useState(false);

  const result = useMemo(() => {
    const baseMonthlyCost = 22000;
    const childcareCost = careTypeCosts[careType];
    const incomeAdjustment = monthlyIncome > 120000 ? 2500 : monthlyIncome < 65000 ? -1500 : 0;
    const childOrderSubsidy = childOrder === "第一胎" ? 5000 : childOrder === "第二胎" ? 6000 : 7000;
    const careSubsidy = careType === "家人協助" ? 3000 : careType === "私立托嬰" ? 7000 : 9000;
    const citySubsidy = city === "台北市" || city === "新北市" ? 2000 : 1500;
    const dualIncomeSupport = dualIncome ? 1500 : 0;
    const grandparentOffset = grandparentSupport ? 3500 : 0;
    const estimatedMonthlyCost = baseMonthlyCost + childcareCost + incomeAdjustment - grandparentOffset;
    const availableSubsidy = childOrderSubsidy + careSubsidy + citySubsidy + dualIncomeSupport;
    const monthlyBurden = Math.max(estimatedMonthlyCost - availableSubsidy, 0);

    return {
      estimatedMonthlyCost,
      availableSubsidy,
      monthlyBurden,
    };
  }, [careType, childOrder, city, dualIncome, grandparentSupport, monthlyIncome]);

  const nextSteps = [
    `確認${city}生育獎勵與托育補助申請條件`,
    `比較「${careType}」附近可用名單與候補狀況`,
    grandparentSupport ? "把長輩可支援時段排進照護計畫" : "評估每週是否需要臨時照護支援",
  ];

  return (
    <Section
      id="budget"
      eyebrow="補助與預算"
      title="把育兒成本變成可以規劃的數字"
      description="輸入家庭狀況後，BabyMap 用 mock 公式估算每月支出、可申請補助與補助後負擔。"
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
              <Calculator className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg font-semibold">家庭條件輸入</h3>
              <p className="text-sm text-muted-foreground">所有欄位都是 demo mock，不使用真實政府資料。</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium">
              居住縣市
              <select
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-primary"
              >
                {cityOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium">
              家庭月收入
              <input
                type="number"
                min="0"
                step="5000"
                value={monthlyIncome}
                onChange={(event) => setMonthlyIncome(Number(event.target.value))}
                className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-primary"
              />
            </label>

            <label className="text-sm font-medium">
              第幾胎
              <select
                value={childOrder}
                onChange={(event) => setChildOrder(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-primary"
              >
                {childOrderOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium">
              托育方式
              <select
                value={careType}
                onChange={(event) => setCareType(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-primary"
              >
                {careTypeOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ToggleButton active={dualIncome} onClick={() => setDualIncome((value) => !value)}>
              是否雙薪
            </ToggleButton>
            <ToggleButton
              active={grandparentSupport}
              onClick={() => setGrandparentSupport((value) => !value)}
            >
              是否有長輩支援
            </ToggleButton>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <Wallet className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">估算結果</h3>
                <p className="text-sm text-muted-foreground">依目前輸入條件即時更新。</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <ResultCard label="預估每月育兒支出" value={formatCurrency(result.estimatedMonthlyCost)} />
              <ResultCard label="可申請補助" value={formatCurrency(result.availableSubsidy)} tone="support" />
              <ResultCard label="補助後實際負擔" value={formatCurrency(result.monthlyBurden)} tone="primary" />
            </div>

            <div className="mt-5 rounded-2xl bg-muted p-4 text-sm leading-6 text-muted-foreground">
              此為 demo 估算，實際補助依政府公告為準。
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold">建議下一步</h3>
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

      <div className="mt-6">
        <h3 className="text-lg font-semibold">可申請補助項目 Demo</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {subsidies.map((subsidy) => (
            <article key={subsidy.id} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <h3 className="font-semibold">{subsidy.title}</h3>
              <p className="mt-3 text-lg font-bold text-primary">{subsidy.amount}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{subsidy.description}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ToggleButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-2xl border px-4 py-3 text-left text-sm font-medium transition",
        active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-white text-foreground",
      )}
    >
      {children}
      <span className="mt-1 block text-xs opacity-75">{active ? "是" : "否"}</span>
    </button>
  );
}

function ResultCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "primary" | "support";
}) {
  return (
    <article
      className={cn(
        "rounded-2xl p-4",
        tone === "primary"
          ? "bg-primary text-primary-foreground"
          : tone === "support"
            ? "bg-secondary text-secondary-foreground"
            : "bg-muted text-foreground",
      )}
    >
      <p className="text-sm opacity-80">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </article>
  );
}
