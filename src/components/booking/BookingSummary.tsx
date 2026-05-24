import { ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

import type { Babysitter } from "@/data/babymap";
import { bookingSafetyProtections } from "@/data/babymap";
import { createBookingRequest, subscribeToBookingRequest } from "@/lib/data/babysitterBackend";
import type { BookingRequest } from "@/lib/supabase/types";

type BookingSummaryProps = {
  serviceType: string;
  location: string;
  time: string;
  childAge: string;
  babysitter: Babysitter;
  dataSource: "backend" | "local";
};

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "persisted"; requestId: string }
  | { status: "demoOnly" }
  | { status: "error"; message: string };

export function BookingSummary({
  serviceType,
  location,
  time,
  childAge,
  babysitter,
  dataSource,
}: BookingSummaryProps) {
  const [parentName, setParentName] = useState("Demo 家長");
  const [parentPhone, setParentPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const [currentRequest, setCurrentRequest] = useState<BookingRequest | null>(null);
  const estimatedCost = babysitter.pricePerHour * 4;
  const canPersist = dataSource === "backend";

  useEffect(() => {
    setSubmitState({ status: "idle" });
    setCurrentRequest(null);
  }, [serviceType, location, time, childAge, babysitter.id, dataSource]);

  useEffect(() => {
    if (!currentRequest?.id || !canPersist) return undefined;

    const channel = subscribeToBookingRequest(currentRequest.id, (request) => {
      setCurrentRequest(request);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [canPersist, currentRequest?.id]);

  async function handleConfirmBooking() {
    if (!babysitter) {
      setSubmitState({ status: "error", message: "請先選擇一位保母。" });
      return;
    }

    if (!canPersist) {
      setSubmitState({ status: "demoOnly" });
      return;
    }

    setSubmitState({ status: "submitting" });

    try {
      const request = await createBookingRequest({
        babysitter_id: babysitter.id,
        parent_name: parentName.trim() || "Demo 家長",
        parent_phone: parentPhone.trim() || undefined,
        service_type: serviceType,
        child_age: childAge,
        location_label: location,
        requested_time: time,
        duration_hours: 4,
        estimated_cost: estimatedCost,
        notes: notes.trim() || undefined,
      });

      setCurrentRequest(request);
      setSubmitState({ status: "persisted", requestId: request.id });
    } catch (error) {
      const message = error instanceof Error ? error.message : "預約請求送出失敗，請稍後再試。";
      setSubmitState({ status: "error", message });
    }
  }

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

      <div className="mt-5 rounded-2xl border border-border bg-white p-4">
        <p className="text-sm font-semibold">家長聯絡資訊</p>
        <div className="mt-3 space-y-3">
          <label className="block text-sm font-medium">
            家長姓名
            <input
              value={parentName}
              onChange={(event) => setParentName(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none transition focus:border-primary"
              placeholder="Demo 家長"
            />
          </label>
          <label className="block text-sm font-medium">
            聯絡電話（選填）
            <input
              value={parentPhone}
              onChange={(event) => setParentPhone(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none transition focus:border-primary"
              placeholder="可使用 demo 電話"
            />
          </label>
          <label className="block text-sm font-medium">
            備註（選填）
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="mt-2 min-h-24 w-full resize-none rounded-2xl border border-border px-4 py-3 text-sm outline-none transition focus:border-primary"
              placeholder="例如：孩子作息、過敏提醒、接送需求..."
            />
          </label>
        </div>
      </div>

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
        onClick={handleConfirmBooking}
        disabled={submitState.status === "submitting"}
        className="mt-6 w-full rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitState.status === "submitting" ? "送出中..." : "確認預約"}
      </button>
      <SubmitMessage submitState={submitState} canPersist={canPersist} />
      {currentRequest ? <RequestStatusPanel request={currentRequest} /> : null}
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

function RequestStatusPanel({ request }: { request: BookingRequest }) {
  if (request.status === "accepted") {
    return (
      <div className="mt-4 rounded-2xl bg-secondary p-4 text-sm leading-6 text-secondary-foreground">
        <p className="font-semibold">保姆已接受預約</p>
        <p className="mt-1">正式平台會在此提供聯絡方式、服務紀錄與安全提醒。</p>
      </div>
    );
  }

  if (request.status === "declined") {
    return (
      <div className="mt-4 rounded-2xl bg-muted p-4 text-sm leading-6 text-muted-foreground">
        <p className="font-semibold text-foreground">保姆已拒絕預約</p>
        <p className="mt-1">你可以選擇其他保母重新送出請求。</p>
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-2xl border border-border bg-white p-4 text-sm leading-6">
      <p className="font-semibold text-primary">等待保姆回覆</p>
      <p className="mt-1 text-muted-foreground">此區會在保姆端接受或拒絕後自動更新。</p>
    </div>
  );
}

function SubmitMessage({
  submitState,
  canPersist,
}: {
  submitState: SubmitState;
  canPersist: boolean;
}) {
  if (submitState.status === "idle" || submitState.status === "submitting") {
    return (
      <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
        {canPersist ? "送出後會建立 Supabase demo 預約請求。" : "目前使用本地模擬資料，送出不會寫入資料庫。"}
      </p>
    );
  }

  if (submitState.status === "persisted") {
    return (
      <div className="mt-3 rounded-2xl bg-secondary p-3 text-center text-xs leading-5 text-secondary-foreground">
        <p className="font-semibold">已送出預約請求，等待保姆回覆。</p>
        <p className="mt-1">Request ID: {submitState.requestId.slice(0, 8)}</p>
      </div>
    );
  }

  if (submitState.status === "demoOnly") {
    return (
      <p className="mt-3 rounded-2xl bg-muted p-3 text-center text-xs leading-5 text-muted-foreground">
        已完成 demo-only 預約確認；目前使用本地模擬資料，未寫入 Supabase。
      </p>
    );
  }

  return (
    <p className="mt-3 rounded-2xl bg-destructive/10 p-3 text-center text-xs leading-5 text-destructive">
      {submitState.message}
    </p>
  );
}
