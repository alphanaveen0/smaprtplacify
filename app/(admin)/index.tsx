import { Text } from "react-native";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { StatsRail } from "@/components/dashboard/StatsRail";
import { Header } from "@/components/ui/Header";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientCard } from "@/components/ui/GradientCard";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";

const adminStats = [
  { label: "Organizations", value: "42", tone: "purple" },
  { label: "Active Plans", value: "38", tone: "success" },
  { label: "AI Usage", value: "18k", tone: "cyan" },
  { label: "Audit Events", value: "9.2k", tone: "blue" }
] as const;

export default function AdminDashboard() {
  return (
    <Screen>
      <Header title="Platform dashboard" subtitle="Super Admin controls the SmartPlacify SaaS platform, not college-level placement operations." />
      <GradientCard variant="cyan">
        <Text className="text-lg font-semibold text-white/80">Monthly recurring revenue</Text>
        <Text className="mt-2 text-5xl font-bold text-white">₹8.4L</Text>
        <Text className="mt-2 text-white/80">Mock subscription data for Phase 1</Text>
      </GradientCard>
      <SectionHeader title="Platform KPIs" />
      <StatsRail stats={[...adminStats]} />
      <SectionHeader title="System Health" />
      <GlassCard>
        <ProgressBar label="API availability" value={99} />
        <ProgressBar label="Storage capacity" value={64} />
        <ProgressBar label="AI quota used" value={58} />
      </GlassCard>
    </Screen>
  );
}
