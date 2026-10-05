import { PlaceholderScreen } from "@/components/dashboard/PlaceholderScreen";

export default function StudentProfile() {
  return (
    <PlaceholderScreen
      title="Profile"
      subtitle="Student onboarding will become a sectioned mobile form in Phase 3."
      icon="person-outline"
      items={["CSE · 2027 · CGPA 8.2", "Skills: React Native, SQL, Python", "Resume v3 · ATS score 87"]}
    />
  );
}
