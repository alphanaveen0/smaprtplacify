import { RoleTabs } from "@/components/dashboard/RoleTabs";

export default function CompanyLayout() {
  return (
    <RoleTabs
      tabs={[
        { name: "index", title: "Dashboard", icon: "grid-outline" },
        { name: "jobs", title: "Jobs", icon: "briefcase-outline" },
        { name: "candidates", title: "Candidates", icon: "people-outline" },
        { name: "interviews", title: "Interviews", icon: "calendar-outline" },
        { name: "profile", title: "Profile", icon: "business-outline" }
      ]}
    />
  );
}
