import { PlaceholderScreen } from "@/components/dashboard/PlaceholderScreen";

export default function CompanyJobs() {
  return (
    <PlaceholderScreen
      title="Company jobs"
      subtitle="Create job cards with eligibility and skill requirements in Phase 4."
      icon="briefcase-outline"
      items={["SDE Intern · 312 applications", "Cloud Engineer · 128 applications", "Data Analyst · 202 applications"]}
    />
  );
}
