import { PlaceholderScreen } from "@/components/dashboard/PlaceholderScreen";

export default function JobMatcher() {
  return (
    <PlaceholderScreen
      title="Job Matcher"
      subtitle="AI ranking will run only after deterministic eligibility checks."
      icon="briefcase-outline"
      items={["Matching skills", "Missing skills", "Eligibility recommendation"]}
    />
  );
}
