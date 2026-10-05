import { PlaceholderScreen } from "@/components/dashboard/PlaceholderScreen";

export default function TpoMore() {
  return (
    <PlaceholderScreen
      title="More"
      subtitle="Settings, notifications, exports and college controls live here."
      icon="menu-outline"
      items={["Organization settings", "Notification center", "Audit preview"]}
    />
  );
}
