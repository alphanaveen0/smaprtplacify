import { PlaceholderScreen } from "@/components/dashboard/PlaceholderScreen";

export default function AdminMore() {
  return (
    <PlaceholderScreen
      title="More"
      subtitle="Audit logs, settings and internal platform controls."
      icon="menu-outline"
      items={["Audit log stream", "Plan configuration", "Platform settings"]}
    />
  );
}
