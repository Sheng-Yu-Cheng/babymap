"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  getBabysitterByCode,
  listBookingRequestsForSitter,
  subscribeToBookingRequestsForSitter,
  updateBookingRequestStatus,
} from "@/lib/data/babysitterBackend";
import type { Babysitter, BookingRequest, BookingRequestStatus } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

const statusLabels: Record<BookingRequestStatus, string> = {
  pending: "待回覆",
  accepted: "已接受",
  declined: "已拒絕",
  cancelled: "已取消",
};

const statusClassNames: Record<BookingRequestStatus, string> = {
  pending: "bg-primary/10 text-primary",
  accepted: "bg-secondary text-secondary-foreground",
  declined: "bg-muted text-muted-foreground",
  cancelled: "bg-muted text-muted-foreground",
};

export function SitterDashboardClient() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code")?.trim() ?? "";
  const [sitter, setSitter] = useState<Babysitter | null>(null);
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [highlightedRequestId, setHighlightedRequestId] = useState("");
  const [updatingRequestId, setUpdatingRequestId] = useState("");
  const knownRequestIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;

    async function loadDashboard() {
      setLoading(true);
      setErrorMessage("");
      setNotice("");
      setHighlightedRequestId("");
      knownRequestIds.current = new Set();

      if (!code) {
        setSitter(null);
        setRequests([]);
        setErrorMessage("找不到這個保姆代碼");
        setLoading(false);
        return;
      }

      try {
        const foundSitter = await getBabysitterByCode(code);
        if (!active) return;

        if (!foundSitter) {
          setSitter(null);
          setRequests([]);
          setErrorMessage("找不到這個保姆代碼");
          setLoading(false);
          return;
        }

        const initialRequests = await listBookingRequestsForSitter(foundSitter.id);
        if (!active) return;

        setSitter(foundSitter);
        setRequests(initialRequests);
        knownRequestIds.current = new Set(initialRequests.map((request) => request.id));
        setLoading(false);

        const channel = subscribeToBookingRequestsForSitter(foundSitter.id, (request) => {
          setRequests((current) => {
            const exists = current.some((item) => item.id === request.id);
            const next = exists
              ? current.map((item) => (item.id === request.id ? request : item))
              : [request, ...current];

            return next.sort(
              (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
            );
          });

          if (!knownRequestIds.current.has(request.id)) {
            knownRequestIds.current.add(request.id);
            setHighlightedRequestId(request.id);
            setNotice("收到新的預約請求");
            window.setTimeout(() => {
              setHighlightedRequestId((current) => (current === request.id ? "" : current));
              setNotice("");
            }, 3600);
          }
        });

        unsubscribe = () => {
          channel.unsubscribe();
        };
      } catch (error) {
        if (!active) return;
        setSitter(null);
        setRequests([]);
        setErrorMessage(error instanceof Error ? error.message : "保姆端資料載入失敗，請稍後再試。");
        setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, [code]);

  async function handleStatusUpdate(requestId: string, status: Extract<BookingRequestStatus, "accepted" | "declined">) {
    setUpdatingRequestId(requestId);
    setErrorMessage("");

    try {
      const updated = await updateBookingRequestStatus(requestId, status);
      setRequests((current) => current.map((request) => (request.id === requestId ? updated : request)));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "狀態更新失敗，請稍後再試。");
    } finally {
      setUpdatingRequestId("");
    }
  }

  if (loading) {
    return (
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[1.75rem] border border-border bg-white p-6 shadow-soft">
          載入保姆端資料中...
        </div>
      </main>
    );
  }

  if (!sitter) {
    return (
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-border bg-white p-8 text-center shadow-soft">
          <p className="text-sm font-semibold text-primary">BabyMap sitter demo</p>
          <h1 className="mt-3 text-3xl font-bold">找不到這個保姆代碼</h1>
          <p className="mt-4 text-muted-foreground">
            請確認網址中的 code 是否正確，或回到註冊頁重新建立一筆 demo 保母資料。
          </p>
          {errorMessage && errorMessage !== "找不到這個保姆代碼" ? (
            <p className="mt-4 rounded-2xl bg-muted p-3 text-sm text-primary">{errorMessage}</p>
          ) : null}
          <Link
            href="/sitter"
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
          >
            回到我是保姆
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] border border-border bg-white p-6 shadow-soft">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-primary">BabyMap sitter dashboard</p>
                <h1 className="mt-3 text-3xl font-bold md:text-4xl">保姆端預約請求</h1>
                <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                  這是課堂 demo 的保姆端，請勿填入真實敏感個資。此頁會用 Supabase Realtime
                  接收新的模擬預約請求。
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-muted p-4 text-sm">
                <p className="font-semibold">{sitter.name}</p>
                <p className="mt-1 text-muted-foreground">{sitter.district} · {sitter.available_time}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sitter.service_tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs text-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {notice ? (
              <p className="mt-5 rounded-2xl bg-secondary p-3 text-sm font-semibold text-secondary-foreground">
                {notice}
              </p>
            ) : null}

            {errorMessage ? (
              <p className="mt-5 rounded-2xl bg-destructive/10 p-3 text-sm text-destructive">
                {errorMessage}
              </p>
            ) : null}
          </div>

          <div className="mt-8">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold">預約請求</h2>
                <p className="mt-1 text-sm text-muted-foreground">待回覆的請求可以接受或拒絕。</p>
              </div>
              <span className="w-fit rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm">
                共 {requests.length} 筆
              </span>
            </div>

            {requests.length === 0 ? (
              <div className="rounded-[1.75rem] border border-border bg-white p-8 text-center text-muted-foreground shadow-sm">
                目前還沒有預約請求。請同學到 /booking 選擇你並送出模擬預約。
              </div>
            ) : (
              <div className="grid gap-4">
                {requests.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    highlighted={request.id === highlightedRequestId}
                    updating={request.id === updatingRequestId}
                    onUpdateStatus={handleStatusUpdate}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function RequestCard({
  request,
  highlighted,
  updating,
  onUpdateStatus,
}: {
  request: BookingRequest;
  highlighted: boolean;
  updating: boolean;
  onUpdateStatus: (
    requestId: string,
    status: Extract<BookingRequestStatus, "accepted" | "declined">,
  ) => void;
}) {
  return (
    <article
      className={cn(
        "rounded-[1.75rem] border bg-white p-5 shadow-sm transition",
        highlighted ? "border-primary ring-4 ring-primary/10" : "border-border",
      )}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold">{request.parent_name}</h3>
            <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", statusClassNames[request.status])}>
              {statusLabels[request.status]}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            送出時間：{formatDateTime(request.created_at)}
          </p>
        </div>

        {request.status === "pending" ? (
          <div className="flex gap-2">
            <button
              type="button"
              disabled={updating}
              onClick={() => onUpdateStatus(request.id, "accepted")}
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              接受
            </button>
            <button
              type="button"
              disabled={updating}
              onClick={() => onUpdateStatus(request.id, "declined")}
              className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              拒絕
            </button>
          </div>
        ) : null}
      </div>

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <RequestDetail label="服務類型" value={request.service_type} />
        <RequestDetail label="孩子年齡" value={request.child_age} />
        <RequestDetail label="需求地點" value={request.location_label} />
        <RequestDetail label="需求時間" value={request.requested_time} />
        <RequestDetail label="服務時數" value={`${request.duration_hours} 小時`} />
        <RequestDetail label="預估費用" value={`NT$${request.estimated_cost.toLocaleString()}`} />
      </dl>

      {request.parent_phone ? (
        <p className="mt-4 text-sm text-muted-foreground">家長電話：{request.parent_phone}</p>
      ) : null}
      {request.notes ? (
        <div className="mt-4 rounded-2xl bg-muted p-4 text-sm leading-6">
          <p className="font-semibold">備註</p>
          <p className="mt-1 text-muted-foreground">{request.notes}</p>
        </div>
      ) : null}
    </article>
  );
}

function RequestDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-muted p-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-semibold text-foreground">{value}</dd>
    </div>
  );
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("zh-TW", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
