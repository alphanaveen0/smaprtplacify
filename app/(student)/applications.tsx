import { PlaceholderScreen } from "@/components/dashboard/PlaceholderScreen";

export default function StudentApplications() {
  return (
    <PlaceholderScreen
      title="Applications"
      subtitle="Track every application status in a mobile timeline."
      icon="reader-outline"
      items={["Applied · Google SDE Intern", "Shortlisted · Microsoft Cloud Engineer", "Interview scheduled · TCS Developer"]}
    />
  );
}
