import { Text, View } from "react-native";
import { colors } from "@/lib/theme/colors";
import { Stat } from "@/types";

type StatCardProps = {
  stat: Stat;
};

const toneColors = {
  purple: colors.primaryPurple,
  blue: colors.blue,
  cyan: colors.cyan,
  success: colors.success,
  warning: colors.warning
};

export function StatCard({ stat }: StatCardProps) {
  return (
    <View className="mr-3 min-w-[138px] rounded-3xl border p-4" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
      <View className="mb-5 h-2 w-10 rounded-full" style={{ backgroundColor: toneColors[stat.tone] }} />
      <Text className="text-2xl font-bold text-white">{stat.value}</Text>
      <Text className="mt-1 text-sm" style={{ color: colors.secondaryText }}>
        {stat.label}
      </Text>
    </View>
  );
}
