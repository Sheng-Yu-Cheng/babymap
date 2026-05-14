import { Section } from "@/components/Section";
import { subsidies } from "@/data/babymap";

const baseMonthlyCost = 22000;
const childcareCost = 9000;
const totalSubsidy = 12000;
const monthlyBurden = baseMonthlyCost + childcareCost - totalSubsidy;

export function BudgetSection() {
  return (
    <Section
      id="budget"
      eyebrow="補助與預算"
      title="把經濟壓力先變成可討論的數字"
      description="這一版只放簡化試算結果與補助卡片，保留未來接上互動輸入的空間。"
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold">Demo 條件</h3>
          <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <p>居住縣市：台北市</p>
            <p>托育方式：公托 / 準公托</p>
            <p>家庭型態：雙薪，第一胎</p>
          </div>
          <div className="mt-6 rounded-2xl bg-muted p-4">
            <p className="text-sm text-muted-foreground">預估補助後每月負擔</p>
            <p className="mt-1 text-3xl font-bold">NT${monthlyBurden.toLocaleString()}</p>
          </div>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            此為課堂 demo 試算，實際補助金額請以官方資訊為準。
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
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
