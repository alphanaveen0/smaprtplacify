import { RoleTabs } from "@/components/dashboard/RoleTabs";

export default function TpoLayout() {
  return (
    <RoleTabs
      tabs={[
        { name: "index", title: "Dashboard", icon: "grid-outline" },
        { name: "students", title: "Students", icon: "people-outline" },
        { name: "jobs", title: "Jobs", icon: "briefcase-outline" },
        { name: "analytics", title: "Analytics", icon: "analytics-outline" },
        { name: "more", title: "More", icon: "menu-outline" }
      ]}
    />
  );
}
