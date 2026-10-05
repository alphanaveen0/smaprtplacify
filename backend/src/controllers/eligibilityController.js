import { checkEligibility } from "../services/eligibilityService.js";

export async function getEligibility(req, res) {
  const result = await checkEligibility(req.params.jobId, req.params.studentId);
  res.json(result);
}
