import {
  educationAllowanceByOrder,
  officialSubsidyPrograms,
  taipeiBirthRewardByOrder,
  taipeiCareSubsidyRules,
  type ChildAgeStage,
  type ChildOrder,
  type FamilyStatus,
  type SubsidyProgram,
  type TaipeiCareScenario,
} from "@/data/subsidies";

export type SubsidyCalculationInput = {
  city: "taipei";
  childAgeStage: ChildAgeStage;
  childOrder: ChildOrder;
  careScenario: TaipeiCareScenario;
  familyStatus: FamilyStatus;
};

export type SubsidyCalculationResult = {
  oneTimeTotal: number;
  monthlyTotal: number;
  matchedPrograms: SubsidyProgram[];
  notes: string[];
  disclaimers: string[];
};

const demoDisclaimer = "此為 BabyMap demo 試算，實際資格、金額與是否可併領，依主管機關公告與審核結果為準。";

function findProgram(id: string) {
  const program = officialSubsidyPrograms.find((item) => item.id === id);

  if (!program) {
    throw new Error(`Missing subsidy program: ${id}`);
  }

  return program;
}

function uniquePrograms(programs: SubsidyProgram[]) {
  return Array.from(new Map(programs.map((program) => [program.id, program])).values());
}

export function calculateSubsidies(input: SubsidyCalculationInput): SubsidyCalculationResult {
  const matchedPrograms: SubsidyProgram[] = [];
  const notes: string[] = [];
  let oneTimeTotal = 0;
  let monthlyTotal = 0;

  if (input.childAgeStage === "pregnancy" || input.childAgeStage === "newborn") {
    oneTimeTotal += 100000;
    matchedPrograms.push(findProgram("central_birth_plus"));

    if (input.city === "taipei") {
      oneTimeTotal += taipeiBirthRewardByOrder[input.childOrder];
      matchedPrograms.push(findProgram("taipei_birth_reward"));
    }
  }

  if (input.childAgeStage === "under2") {
    const taipeiRule = taipeiCareSubsidyRules.find((rule) => rule.scenario === input.careScenario);

    if (taipeiRule) {
      monthlyTotal += taipeiRule.amounts[input.childOrder];
      matchedPrograms.push(findProgram("taipei_under3_care"));
    } else {
      notes.push("目前選擇的照顧方式較適合2歲以上幼兒園情境，0-未滿2歲試算未列入此托育方式。");
    }

    matchedPrograms.push(findProgram("central_childcare_subsidy"));

    if (input.familyStatus === "middle_low_income") {
      notes.push("中低收入戶家庭，中央托育費用補助可能依規定加發 NT$2,000；本 demo 不重複併入臺北市情境金額。");
    }

    if (input.familyStatus === "low_income_or_vulnerable") {
      notes.push("低收入戶或弱勢家庭，中央托育費用補助可能依規定加發 NT$4,000；本 demo 不重複併入臺北市情境金額。");
    }
  }

  if (input.childAgeStage === "age2to5") {
    monthlyTotal += educationAllowanceByOrder[input.childOrder];
    matchedPrograms.push(findProgram("moe_age2to5_allowance"));
  }

  if (input.childAgeStage === "age5") {
    monthlyTotal += educationAllowanceByOrder[input.childOrder];
    matchedPrograms.push(findProgram("moe_age2to5_allowance"));
    notes.push("5歲階段以就學補助概念呈現，金額用第1胎5000、第2胎6000、第3胎以上7000作為 demo 估算。");
  }

  return {
    oneTimeTotal,
    monthlyTotal,
    matchedPrograms: uniquePrograms(matchedPrograms),
    notes,
    disclaimers: [demoDisclaimer],
  };
}
