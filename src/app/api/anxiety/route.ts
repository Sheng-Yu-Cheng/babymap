import OpenAI from "openai";
import { NextResponse } from "next/server";

import { anxietyDeveloperPrompt, anxietySystemPrompt } from "@/lib/ai/anxietyPrompt";

type RecommendedLink = {
  label: string;
  href: string;
};

const fallbackReply =
  "你會有這樣的擔心並不奇怪，育兒壓力本來就不該只靠一個人硬撐。可以先把焦慮拆成金錢、照護、時間或伴侶分工其中一項，再選一個最小步驟開始查。";

const allLinks: Record<string, RecommendedLink> = {
  subsidies: { label: "補助與預算試算", href: "/subsidies" },
  booking: { label: "即時保姆", href: "/booking" },
  resources: { label: "托育資源地圖", href: "/resources" },
  roadmap: { label: "生育時間軸", href: "/roadmap" },
  dadMode: { label: "父職與伴侶分工", href: "/dad-mode" },
  stories: { label: "真實案例", href: "/stories" },
};

function getRecommendedLinks(message: string): RecommendedLink[] {
  const lowerMessage = message.toLowerCase();
  const selected: RecommendedLink[] = [];

  function add(key: keyof typeof allLinks) {
    if (!selected.some((link) => link.href === allLinks[key].href)) {
      selected.push(allLinks[key]);
    }
  }

  if (/錢|補助|預算|收入|花費|費用|買不起|負擔|經濟|cost|money/.test(lowerMessage)) add("subsidies");
  if (/托育|保母|保姆|照顧|臨時|加班|接送|care|sitter/.test(lowerMessage)) add("booking");
  if (/附近|資源|公托|親子館|哺乳|地圖|小兒科|resource|map/.test(lowerMessage)) add("resources");
  if (/時間|備孕|懷孕|流程|不知道|下一步|什麼時候|timeline|plan/.test(lowerMessage)) add("roadmap");
  if (/爸爸|伴侶|先生|隊友|分工|家務|父職|partner|dad/.test(lowerMessage)) add("dadMode");
  if (/別人|案例|後悔|社群|網路|焦慮|故事|story/.test(lowerMessage)) add("stories");

  if (selected.length === 0) {
    add("subsidies");
    add("resources");
    add("stories");
  }

  return selected.slice(0, 3);
}

export async function POST(request: Request) {
  let message = "";

  try {
    const body = (await request.json()) as { message?: unknown };
    if (typeof body.message === "string") {
      message = body.message.trim();
    }
  } catch {
    return NextResponse.json({ error: "請輸入想整理的育兒焦慮。" }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json({ error: "請輸入想整理的育兒焦慮。" }, { status: 400 });
  }

  if (message.length > 500) {
    return NextResponse.json({ error: "輸入內容請控制在 500 字以內。" }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Ask BabyMap 暫時無法使用：伺服器尚未設定 OPENAI_API_KEY。" },
      { status: 500 },
    );
  }

  const recommendedLinks = getRecommendedLinks(message);

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: anxietySystemPrompt },
        { role: "developer", content: anxietyDeveloperPrompt },
        { role: "user", content: message },
      ],
      max_tokens: 180,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message.content?.trim() || fallbackReply;
    return NextResponse.json({ reply, recommendedLinks });
  } catch {
    return NextResponse.json({ reply: fallbackReply, recommendedLinks });
  }
}
