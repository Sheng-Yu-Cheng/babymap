export type SubsidyCategory = "birth" | "childcare" | "allowance" | "education" | "taipei";

export type ChildOrder = "first" | "second" | "thirdOrMore";

export type ChildAgeStage = "pregnancy" | "newborn" | "under2" | "age2to5" | "age5";

export type FamilyStatus = "general" | "middle_low_income" | "low_income_or_vulnerable";

export type TaipeiCareScenario =
  | "home_care"
  | "uncontracted_trained_babysitter"
  | "uncontracted_certified_babysitter_or_center"
  | "public_nursery"
  | "community_public_care_home"
  | "quasi_public_babysitter_or_center"
  | "private_kindergarten";

export type SubsidyProgram = {
  id: string;
  title: string;
  category: SubsidyCategory;
  summary: string;
  amountLabel: string;
  sourceName: string;
  sourceUrl: string;
};

export type TaipeiCareSubsidyRule = {
  scenario: Exclude<TaipeiCareScenario, "private_kindergarten">;
  label: string;
  amounts: Record<ChildOrder, number>;
  notes?: string;
};

export const childOrderLabels: Record<ChildOrder, string> = {
  first: "第1名",
  second: "第2名",
  thirdOrMore: "第3名以上",
};

export const childAgeStageLabels: Record<ChildAgeStage, string> = {
  pregnancy: "懷孕 / 生產準備",
  newborn: "新生兒",
  under2: "0-未滿2歲",
  age2to5: "2-未滿5歲",
  age5: "5歲",
};

export const familyStatusLabels: Record<FamilyStatus, string> = {
  general: "一般家庭",
  middle_low_income: "中低收入戶",
  low_income_or_vulnerable: "低收入戶或弱勢家庭",
};

export const careScenarioLabels: Record<TaipeiCareScenario, string> = {
  home_care: "在家自己照顧",
  uncontracted_trained_babysitter: "結訓或學歷居家托育人員未簽約或親屬保母",
  uncontracted_certified_babysitter_or_center: "證照托育人員或托嬰中心未簽約或親屬保母",
  public_nursery: "公辦民營托嬰中心",
  community_public_care_home: "社區公共托育家園",
  quasi_public_babysitter_or_center: "準公共居家托育人員或托嬰中心",
  private_kindergarten: "私立幼兒園",
};

export const officialSubsidyPrograms: SubsidyProgram[] = [
  {
    id: "central_birth_plus",
    title: "生育給付 PLUS：生育補助至 10 萬",
    category: "birth",
    summary: "行政院規劃生育給付加計補助，每胎可達 10 萬元，未參加社會保險者亦規劃發給生育補助。",
    amountLabel: "一次性可能補助 NT$100,000",
    sourceName: "行政院",
    sourceUrl: "https://www.ey.gov.tw/Page/448DE008087A1971/7de0292d-5a16-48d7-9091-6d8eab76e90c",
  },
  {
    id: "taipei_birth_reward",
    title: "臺北市生育獎勵金",
    category: "taipei",
    summary: "臺北市助您好孕生育獎勵金依出生排行提供不同金額。",
    amountLabel: "第1名4萬、第2名4.5萬、第3名以上5萬",
    sourceName: "臺北市助您好孕",
    sourceUrl: "https://born.taipei/cp.aspx?n=4BB21D19B8E70CE0",
  },
  {
    id: "central_childcare_subsidy",
    title: "衛福部托育費用補助",
    category: "childcare",
    summary: "公共化、準公共托育補助，並依家庭身分與胎次加發。",
    amountLabel: "公共化7000/月、準公共13000/月，符合資格可加發",
    sourceName: "我的 E 政府 / 衛生福利部社會及家庭署",
    sourceUrl: "https://www.gov.tw/News_Content_2_745216",
  },
  {
    id: "taipei_under3_care",
    title: "臺北市0-未滿3歲托育情境補助",
    category: "taipei",
    summary: "臺北市依不同照顧方式與胎次，整理0-未滿3歲家庭可參考的補助情境。",
    amountLabel: "依托育情境與胎次每月 NT$5,000 至 NT$22,000",
    sourceName: "臺北市助您好孕",
    sourceUrl: "https://born.taipei/cp.aspx?n=DBE0307B60240288",
  },
  {
    id: "moe_age2to5_allowance",
    title: "教育部2-未滿5歲育兒津貼",
    category: "allowance",
    summary: "未滿5歲且符合資格者，依胎次提供每月育兒津貼。",
    amountLabel: "第1胎5000/月、第2胎6000/月、第3胎以上7000/月",
    sourceName: "教育部",
    sourceUrl: "https://www.ece.moe.edu.tw/ch/subsidy/allowance-1/",
  },
];

export const taipeiBirthRewardByOrder: Record<ChildOrder, number> = {
  first: 40000,
  second: 45000,
  thirdOrMore: 50000,
};

export const educationAllowanceByOrder: Record<ChildOrder, number> = {
  first: 5000,
  second: 6000,
  thirdOrMore: 7000,
};

export const taipeiCareSubsidyRules: TaipeiCareSubsidyRule[] = [
  {
    scenario: "home_care",
    label: "在家自己照顧",
    amounts: { first: 5000, second: 6000, thirdOrMore: 7000 },
  },
  {
    scenario: "uncontracted_trained_babysitter",
    label: "結訓或學歷居家托育人員未簽約或親屬保母",
    amounts: { first: 7000, second: 8000, thirdOrMore: 9000 },
  },
  {
    scenario: "uncontracted_certified_babysitter_or_center",
    label: "證照托育人員或托嬰中心未簽約或親屬保母",
    amounts: { first: 8000, second: 9000, thirdOrMore: 10000 },
  },
  {
    scenario: "public_nursery",
    label: "公辦民營托嬰中心",
    amounts: { first: 9500, second: 11000, thirdOrMore: 11000 },
  },
  {
    scenario: "community_public_care_home",
    label: "社區公共托育家園",
    amounts: { first: 11000, second: 14000, thirdOrMore: 14500 },
  },
  {
    scenario: "quasi_public_babysitter_or_center",
    label: "準公共居家托育人員或托嬰中心",
    amounts: { first: 18000, second: 21000, thirdOrMore: 22000 },
  },
];
