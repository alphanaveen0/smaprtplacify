import { Text, View } from "react-native";
import { ActivityList } from "@/components/dashboard/ActivityList";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { StatsRail } from "@/components/dashboard/StatsRail";
import { Header } from "@/components/ui/Header";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientCard } from "@/components/ui/GradientCard";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { companyStats, placementActivities } from "@/mock/dashboard";

export default function CompanyDashboard() {
  return (
    <Screen>
      <Header title="Recruiter dashboard" subtitle="Manage jobs, candidates, shortlists and interviews from one mobile workspace." />
      <GradientCard variant="blue">
        <Text className="text-lg font-semibold text-white/80">Current hiring pipeline</Text>
        <Text className="mt-2 text-5xl font-bold text-white">642</Text>
        <Text className="mt-2 text-white/80">applications across 12 active jobs</Text>
      </GradientCard>
      <SectionHeader title="Hiring Metrics" />
      <StatsRail stats={companyStats} />
      <SectionHeader title="Pipeline Health" />
      <GlassCard>
        <ProgressBar label="Screened" value={68} />
        <ProgressBar label="Shortlisted" value={42} />
        <ProgressBar label="Interviewed" value={24} />
      </GlassCard>
      <SectionHeader title="Live Updates" />
      <ActivityList items={placementActivities.slice(0, 2)} />
    </Screen>
  );
}
