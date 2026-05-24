import { Suspense } from "react";

import { SitterDashboardClient } from "@/components/sitter/SitterDashboardClient";

export default function SitterDashboardPage() {
  return (
    <Suspense
      fallback={
        <main className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[1.75rem] border border-border bg-white p-6 shadow-soft">
            載入保姆端資料中...
          </div>
        </main>
      }
    >
      <SitterDashboardClient />
    </Suspense>
  );
}
