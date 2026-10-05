import { PlaceholderScreen } from "@/components/dashboard/PlaceholderScreen";

export default function CompanyCandidates() {
  return (
    <PlaceholderScreen
      title="Candidates"
      subtitle="Browse eligible students and shortlist applicants without desktop tables."
      icon="people-outline"
      items={["Naveen Kumar · 94% match", "Priya Sharma · 91% match", "Rahul Verma · 88% match"]}
    />
  );
}
