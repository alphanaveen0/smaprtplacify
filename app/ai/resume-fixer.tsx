import { PlaceholderScreen } from "@/components/dashboard/PlaceholderScreen";

export default function ResumeFixer() {
  return (
    <PlaceholderScreen
      title="Resume Fixer"
      subtitle="Later phases will require user approval before applying AI suggestions."
      icon="sparkles-outline"
      items={["Before and after review", "No invented experience", "Recalculate compatibility score"]}
    />
  );
}
