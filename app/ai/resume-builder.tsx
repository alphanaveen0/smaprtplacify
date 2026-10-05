import { PlaceholderScreen } from "@/components/dashboard/PlaceholderScreen";

export default function ResumeBuilder() {
  return (
    <PlaceholderScreen
      title="Resume Builder"
      subtitle="Mobile editor and PDF export arrive after profile and resume phases."
      icon="document-text-outline"
      items={["Summary", "Education and skills", "Projects and experience"]}
    />
  );
}
