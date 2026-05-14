import { CalendarCheck, MapPin, ShieldCheck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="mb-4 text-sm font-semibold text-primary">數位育兒支持平台</p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-foreground sm:text-5xl lg:text-6xl">
            想生，但不知道怎麼開始？
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            BabyMap 幫你整理補助、托育、臨時照護、育兒規劃與真實案例，讓生育不再只是焦慮，而是可以被規劃的選擇。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#budget"
              className="rounded-full bg-primary px-6 py-3 text-center font-medium text-primary-foreground shadow-sm"
            >
              開始規劃
            </a>
            <a
              href="#babysitters"
              className="rounded-full border border-border bg-white px-6 py-3 text-center font-medium text-foreground"
            >
              查看即時保姆 Demo
            </a>
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-white/80 p-5 shadow-soft">
          <div className="rounded-2xl bg-muted p-4">
            <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
              <div>
                <p className="text-sm text-muted-foreground">今日支援狀態</p>
                <p className="mt-1 text-2xl font-semibold">3 位保母可預約</p>
              </div>
              <ShieldCheck className="h-9 w-9 text-secondary-foreground" aria-hidden="true" />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-4">
                <MapPin className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
                <p className="text-sm text-muted-foreground">附近資源</p>
                <p className="text-xl font-semibold">8 個</p>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <CalendarCheck className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
                <p className="text-sm text-muted-foreground">下一步任務</p>
                <p className="text-xl font-semibold">查補助</p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-secondary p-4 text-sm leading-6 text-secondary-foreground">
              不是叫你生，而是讓想生的人不再那麼害怕。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
