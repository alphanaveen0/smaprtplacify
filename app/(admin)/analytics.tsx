import { PlaceholderScreen } from "@/components/dashboard/PlaceholderScreen";

export default function AdminAnalytics() {
  return (
    <PlaceholderScreen
      title="Platform analytics"
      subtitle="Cross-tenant platform analytics without exposing tenant-private data."
      icon="analytics-outline"
      items={["Organization growth", "Feature usage", "AI usage trends"]}
    />
  );
}
