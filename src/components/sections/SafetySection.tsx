import { Section } from "@/components/Section";
import { safetySteps } from "@/data/babymap";

export function SafetySection() {
  return (
    <Section
      eyebrow="安全與認證"
      title="即時托育必須建立在信任之上"
      description="這一頁先呈現 demo 所需的安全骨架：認證、紀錄、緊急聯絡與評價。"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {safetySteps.map((step) => (
          <article key={step.title} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
              <step.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
          </article>
        ))}
      </div>
      <div className="mt-6 rounded-3xl border border-border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">保母認證流程 Demo</h3>
        <p className="mt-3 leading-7 text-muted-foreground">
          送出資料、身份驗證、資格審查、服務範圍確認、平台建立服務紀錄。正式產品仍需要法規、保險與客服流程支援。
        </p>
      </div>
    </Section>
  );
}
