export type EligibilityInput = {
  studentCgpa: number;
  studentBranch: string;
  graduationYear: number;
  minimumCgpa: number;
  allowedBranches: string[];
  allowedGraduationYears: number[];
};

export type EligibilityResult = {
  eligible: boolean;
  reasons: string[];
};

export function checkEligibility(input: EligibilityInput): EligibilityResult {
  const reasons: string[] = [];

  if (input.studentCgpa < input.minimumCgpa) {
    reasons.push(`Minimum CGPA required: ${input.minimumCgpa}. Your CGPA: ${input.studentCgpa}.`);
  }

  if (!input.allowedBranches.includes(input.studentBranch)) {
    reasons.push(`Allowed branches: ${input.allowedBranches.join(", ")}. Your branch: ${input.studentBranch}.`);
  }

  if (!input.allowedGraduationYears.includes(input.graduationYear)) {
    reasons.push(`Allowed graduation years: ${input.allowedGraduationYears.join(", ")}. Your year: ${input.graduationYear}.`);
  }

  return { eligible: reasons.length === 0, reasons };
}
