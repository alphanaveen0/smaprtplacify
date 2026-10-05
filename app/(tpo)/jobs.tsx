import { PlaceholderScreen } from "@/components/dashboard/PlaceholderScreen";

export default function TpoJobs() {
  return (
    <PlaceholderScreen
      title="Placement jobs"
      subtitle="Review drives, deadlines and eligibility across organizations."
      icon="briefcase-outline"
      items={["Infosys · Live drive", "Google · Shortlist uploaded", "TCS · Deadline tonight"]}
    />
  );
}
