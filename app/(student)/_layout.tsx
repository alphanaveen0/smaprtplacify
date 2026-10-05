import { RoleTabs } from "@/components/dashboard/RoleTabs";

export default function StudentLayout() {
  return (
    <RoleTabs
      tabs={[
        { name: "index", title: "Home", icon: "home-outline" },
        { name: "jobs", title: "Jobs", icon: "briefcase-outline" },
        { name: "applications", title: "Apps", icon: "reader-outline" },
        { name: "ai", title: "AI", icon: "sparkles-outline" },
        { name: "profile", title: "Profile", icon: "person-outline" }
      ]}
    />
  );
}
