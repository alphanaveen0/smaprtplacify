import { PlaceholderScreen } from "@/components/dashboard/PlaceholderScreen";

export default function AdminOrganizations() {
  return (
    <PlaceholderScreen
      title="Organizations"
      subtitle="Manage tenant organizations and platform access."
      icon="business-outline"
      items={["Delhi Technical University · Professional", "Pune Institute · Starter", "Bangalore College · Enterprise"]}
    />
  );
}
