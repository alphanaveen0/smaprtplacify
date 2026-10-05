import { ScrollView } from "react-native";
import { Stat } from "@/types";
import { StatCard } from "@/components/ui/StatCard";

type StatsRailProps = {
  stats: Stat[];
};

export function StatsRail({ stats }: StatsRailProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mr-5">
      {stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
    </ScrollView>
  );
}
