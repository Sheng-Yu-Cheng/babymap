export type SubsidyOffice = {
  id: string;
  title: string;
  amount: string;
  description: string;
  city: string;
  officeName: string;
  contactLabel: string;
};

const mockSubsidyOffices: SubsidyOffice[] = [
  {
    id: "s1",
    title: "育兒津貼",
    amount: "每月 NT$5,000 起",
    description: "依家庭狀況與子女年齡適用不同補助。",
    city: "全國",
    officeName: "地方社會局 / 區公所",
    contactLabel: "查看申請窗口",
  },
  {
    id: "s2",
    title: "托育補助",
    amount: "每月 NT$7,000 起",
    description: "適用公托、準公托或合格保母服務。",
    city: "全國",
    officeName: "地方社會局托育科",
    contactLabel: "查看托育補助",
  },
  {
    id: "s3",
    title: "生育獎勵金",
    amount: "依縣市規定",
    description: "各縣市可能提供不同金額的一次性補助。",
    city: "依縣市",
    officeName: "戶政事務所 / 社會局",
    contactLabel: "查看縣市規定",
  },
];

export function getSubsidyOffices(): SubsidyOffice[] {
  try {
    // Future integration point:
    // Fetch and normalize government subsidy office/open-data records here.
    // Keep schema validation strict; if anything fails, return the local demo data below.
    const externalOffices: SubsidyOffice[] | null = null;

    return externalOffices ?? mockSubsidyOffices;
  } catch {
    return mockSubsidyOffices;
  }
}
