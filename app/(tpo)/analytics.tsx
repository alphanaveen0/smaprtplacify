import { PlaceholderScreen } from "@/components/dashboard/PlaceholderScreen";

export default function TpoAnalytics() {
  return (
    <PlaceholderScreen
      title="Analytics"
      subtitle="Mobile charts will focus on scan-friendly placement insights."
      icon="analytics-outline"
      items={["Branch-wise placement", "Company-wise hiring", "Skill demand trends"]}
    />
  );
}
