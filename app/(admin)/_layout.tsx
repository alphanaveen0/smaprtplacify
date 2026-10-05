import { RoleTabs } from "@/components/dashboard/RoleTabs";

export default function AdminLayout() {
  return (
    <RoleTabs
      tabs={[
        { name: "index", title: "Dashboard", icon: "grid-outline" },
        { name: "organizations", title: "Orgs", icon: "business-outline" },
        { name: "subscriptions", title: "Plans", icon: "card-outline" },
        { name: "analytics", title: "Analytics", icon: "analytics-outline" },
        { name: "more", title: "More", icon: "menu-outline" }
      ]}
    />
  );
}
