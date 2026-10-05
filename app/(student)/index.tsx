import { Text, View } from "react-native";
import { Screen } from "@/components/ui/Screen";
import { Header } from "@/components/ui/Header";
import { GradientCard } from "@/components/ui/GradientCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatsRail } from "@/components/dashboard/StatsRail";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { JobCard } from "@/components/student/JobCard";
import { AIQuickActions } from "@/components/ai/AIQuickActions";
import { studentJobs, studentStats } from "@/mock/dashboard";
import { colors } from "@/lib/theme/colors";

export default function StudentHome() {
  return (
    <Screen>
      <Header title="Good Morning, Naveen" subtitle="Your profile is almost ready for the strongest matching jobs." />
      <GradientCard>
        <Text className="text-lg font-semibold text-white/80">Profile completion</Text>
        <Text className="mt-2 text-5xl font-bold text-white">92%</Text>
        <View className="mt-5">
          <ProgressBar label="Placement readiness" value={92} />
        </View>
      </GradientCard>
      <SectionHeader title="Today" />
      <StatsRail stats={studentStats} />
      <SectionHeader title="Recommended Jobs" action="View all" />
      {studentJobs.map((job) => <JobCard key={job.id} job={job} />)}
      <SectionHeader title="Upcoming Interview" />
      <GlassCard>
        <Text className="text-lg font-bold text-white">Microsoft · Technical Round</Text>
        <Text className="mt-2" style={{ color: colors.secondaryText }}>Tomorrow, 11:30 AM · Teams link pending</Text>
      </GlassCard>
      <SectionHeader title="AI Career Assistant" />
      <AIQuickActions />
    </Screen>
  );
}
