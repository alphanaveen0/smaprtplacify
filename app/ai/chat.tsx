import { PlaceholderScreen } from "@/components/dashboard/PlaceholderScreen";

export default function AIChat() {
  return (
    <PlaceholderScreen
      title="AI Chat"
      subtitle="Role-aware assistant route placeholder for secure backend AI."
      icon="chatbubbles-outline"
      items={["Student career questions", "TPO placement insights", "Company candidate search"]}
    />
  );
}
