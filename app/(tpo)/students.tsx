import { PlaceholderScreen } from "@/components/dashboard/PlaceholderScreen";

export default function TpoStudents() {
  return (
    <PlaceholderScreen
      title="Students"
      subtitle="Student lists use filters, cards and expandable details on mobile."
      icon="people-outline"
      items={["1,248 total students", "894 currently eligible", "336 profiles need attention"]}
    />
  );
}
