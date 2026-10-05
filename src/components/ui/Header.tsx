import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { colors } from "@/lib/theme/colors";

type HeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function Header({ eyebrow = "SmartPlacify", title, subtitle }: HeaderProps) {
  return (
    <View className="mb-6">
      <View className="mb-6 flex-row items-center justify-between">
        <View>
          <Text className="text-sm font-semibold tracking-wide" style={{ color: colors.cyan }}>
            {eyebrow}
          </Text>
          <Text className="mt-1 text-xs" style={{ color: colors.secondaryText }}>
            Smart Placements. Brighter Futures.
          </Text>
        </View>
        <View className="h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: colors.card }}>
          <Ionicons name="notifications-outline" size={20} color={colors.primaryText} />
        </View>
      </View>
      <Text className="text-3xl font-bold text-white">{title}</Text>
      {subtitle ? <Text className="mt-2 text-base leading-6" style={{ color: colors.secondaryText }}>{subtitle}</Text> : null}
    </View>
  );
}
