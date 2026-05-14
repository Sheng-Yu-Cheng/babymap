import { Search } from "lucide-react";
import Link from "next/link";

export function PortalHeroSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-semibold text-primary">BabyMap 數位育兒支持平台</p>
          <h1 className="text-4xl font-bold tracking-normal text-foreground sm:text-5xl lg:text-6xl">
            想生，但不知道怎麼開始？
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            從補助、托育、臨時照護到焦慮破解，BabyMap 把分散的育兒支持整理成可以查找、比較與規劃的入口。
          </p>
        </div>

        <div className="mt-9 max-w-3xl rounded-3xl border border-border bg-white p-3 shadow-soft">
          <label className="flex items-center gap-3 rounded-2xl bg-muted px-4 py-3">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
            <span className="sr-only">搜尋育兒支持</span>
            <input
              className="min-w-0 flex-1 bg-transparent py-2 text-base outline-none placeholder:text-muted-foreground"
              placeholder="搜尋補助、托育、公托、保母、產假、焦慮問題..."
            />
          </label>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/subsidies"
            className="rounded-full bg-primary px-6 py-3 text-center font-medium text-primary-foreground shadow-sm"
          >
            開始規劃
          </Link>
          <Link
            href="/booking"
            className="rounded-full border border-border bg-white px-6 py-3 text-center font-medium text-foreground"
          >
            查看即時保姆
          </Link>
        </div>
      </div>
    </section>
  );
}
