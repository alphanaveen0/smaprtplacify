import { Text, View } from "react-native";
import { colors } from "@/lib/theme/colors";

type StatusBadgeProps = {
  label: string;
  tone?: "success" | "warning" | "cyan" | "purple" | "danger";
};

const tones = {
  success: colors.success,
  warning: colors.warning,
  cyan: colors.cyan,
  purple: colors.primaryPurple,
  danger: colors.error
};

export function StatusBadge({ label, tone = "cyan" }: StatusBadgeProps) {
  return (
    <View className="self-start rounded-full px-3 py-1" style={{ backgroundColor: `${tones[tone]}24` }}>
      <Text className="text-xs font-semibold" style={{ color: tones[tone] }}>
        {label}
      </Text>
    </View>
  );
}
