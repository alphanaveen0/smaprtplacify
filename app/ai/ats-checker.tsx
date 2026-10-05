import { PlaceholderScreen } from "@/components/dashboard/PlaceholderScreen";

export default function AtsChecker() {
  return (
    <PlaceholderScreen
      title="ATS Checker"
      subtitle="Phase 1 route placeholder for the SmartPlacify ATS Compatibility Score."
      icon="analytics-outline"
      items={["Upload resume UI", "Score breakdown", "Missing keyword recommendations"]}
    />
  );
}
