import { Text, View } from "react-native";
import { colors } from "@/lib/theme/colors";

type SectionHeaderProps = {
  title: string;
  action?: string;
};

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <View className="mb-3 mt-7 flex-row items-center justify-between">
      <Text className="text-xl font-bold text-white">{title}</Text>
      {action ? <Text className="text-sm font-semibold" style={{ color: colors.cyan }}>{action}</Text> : null}
    </View>
  );
}
