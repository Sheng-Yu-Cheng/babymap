import { MapPin, Search, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export function PortalHeroSection() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground">
            BabyMap 數位育兒支持入口
          </p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-normal text-foreground sm:text-5xl lg:text-6xl">
            不是催生，而是讓想生的人不再那麼害怕。
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            BabyMap 是一個數位育兒支持 portal，整合補助、托育資源、臨時保姆、時間軸與焦慮破解，幫你把模糊的不確定感整理成可以查找與規劃的下一步。
          </p>

          <div className="mt-8 max-w-3xl rounded-[2rem] border border-border bg-white p-3 shadow-soft">
            <label className="flex items-center gap-3 rounded-[1.35rem] bg-muted px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <span className="sr-only">搜尋育兒支持</span>
              <input
                className="min-w-0 flex-1 bg-transparent py-2 text-base outline-none placeholder:text-muted-foreground"
                placeholder="搜尋補助、托育、臨時保姆、育兒焦慮..."
              />
            </label>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/resources"
              className="rounded-full bg-primary px-6 py-3 text-center font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              查找育兒資源
            </Link>
            <Link
              href="/booking"
              className="rounded-full border border-border bg-white px-6 py-3 text-center font-medium text-foreground shadow-sm transition hover:border-primary"
            >
              預約即時保姆
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-white/86 p-5 shadow-soft">
          <div className="rounded-[1.5rem] bg-secondary p-5">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">今日入口建議</p>
                  <h2 className="mt-1 text-2xl font-semibold">先找到可用支持</h2>
                </div>
                <Sparkles className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              <div className="mt-5 grid gap-3">
                <div className="flex items-center gap-3 rounded-2xl bg-muted p-4">
                  <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                  <span className="text-sm font-medium">附近 8 個育兒資源</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-muted p-4">
                  <ShieldCheck className="h-5 w-5 text-secondary-foreground" aria-hidden="true" />
                  <span className="text-sm font-medium">保母認證與服務紀錄提示</span>
                </div>
              </div>
            </div>
            <p className="mt-4 rounded-2xl bg-white/70 p-4 text-sm leading-6 text-secondary-foreground">
              BabyMap 把「我不知道該怎麼辦」變成「我可以先查哪一項」。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
