import { Text, View } from "react-native";
import { colors } from "@/lib/theme/colors";

type ProgressBarProps = {
  label: string;
  value: number;
};

export function ProgressBar({ label, value }: ProgressBarProps) {
  return (
    <View className="mb-4">
      <View className="mb-2 flex-row justify-between">
        <Text className="font-semibold text-white">{label}</Text>
        <Text className="font-bold" style={{ color: colors.cyan }}>{value}%</Text>
      </View>
      <View className="h-3 overflow-hidden rounded-full" style={{ backgroundColor: colors.secondaryBackground }}>
        <View className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: colors.cyan }} />
      </View>
    </View>
  );
}
