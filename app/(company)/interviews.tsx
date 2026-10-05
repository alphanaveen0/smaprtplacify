import { PlaceholderScreen } from "@/components/dashboard/PlaceholderScreen";

export default function CompanyInterviews() {
  return (
    <PlaceholderScreen
      title="Interviews"
      subtitle="Schedule and update candidate statuses from a mobile calendar flow."
      icon="calendar-outline"
      items={["Today · 4 technical rounds", "Tomorrow · 8 HR rounds", "Friday · 2 final rounds"]}
    />
  );
}
