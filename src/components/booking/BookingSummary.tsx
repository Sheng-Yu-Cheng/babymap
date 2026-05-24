import { ShieldCheck } from "lucide-react";
import { useState } from "react";

import type { Babysitter } from "@/data/babymap";
import { bookingSafetyProtections } from "@/data/babymap";

type BookingSummaryProps = {
  serviceType: string;
  location: string;
  time: string;
  childAge: string;
  babysitter: Babysitter;
};

export function BookingSummary({ serviceType, location, time, childAge, babysitter }: BookingSummaryProps) {
  const [confirmed, setConfirmed] = useState(false);
  const estimatedCost = babysitter.pricePerHour * 4;

  return (
    <aside className="h-fit rounded-[1.75rem] border border-border bg-white p-5 shadow-soft lg:sticky lg:top-24">
      <p className="text-sm font-semibold text-primary">預約摘要 Demo</p>
      <h3 className="mt-2 text-2xl font-bold">確認照護需求</h3>
      <dl className="mt-5 space-y-4 text-sm">
        <SummaryRow label="服務" value={serviceType} />
        <SummaryRow label="地點" value={location} />
        <SummaryRow label="時段" value={time} />
        <SummaryRow label="孩子年齡" value={childAge} />
        <SummaryRow label="保母" value={`${babysitter.name} · ${babysitter.location.district}`} />
        <div className="rounded-2xl bg-muted p-4">
          <dt className="text-muted-foreground">預估費用</dt>
          <dd className="mt-1 text-3xl font-bold text-foreground">NT${estimatedCost.toLocaleString()}</dd>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            以 4 小時計算，實際費用依正式平台確認為準。
          </p>
        </div>
      </dl>

      <div className="mt-5">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <ShieldCheck className="h-4 w-4 text-secondary-foreground" aria-hidden="true" />
          安全保障
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {bookingSafetyProtections.map((protection) => (
            <span key={protection} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
              {protection}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setConfirmed(true)}
        className="mt-6 w-full rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
      >
        確認預約
      </button>
      {confirmed ? (
        <p className="mt-3 rounded-2xl bg-muted p-3 text-center text-xs leading-5 text-muted-foreground">
          這是課堂 demo，尚未建立真實預約。
        </p>
      ) : null}
    </aside>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium text-foreground">{value}</dd>
    </div>
  );
}
