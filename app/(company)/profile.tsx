import { PlaceholderScreen } from "@/components/dashboard/PlaceholderScreen";

export default function CompanyProfile() {
  return (
    <PlaceholderScreen
      title="Company profile"
      subtitle="Verification, contacts and recruiter settings come after auth."
      icon="business-outline"
      items={["Verified recruiter workspace", "Primary contact configured", "12 active job openings"]}
    />
  );
}
