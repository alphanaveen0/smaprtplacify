import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Screen } from "@/components/ui/Screen";
import { Header } from "@/components/ui/Header";
import { GlassCard } from "@/components/ui/GlassCard";
import { colors } from "@/lib/theme/colors";

type PlaceholderScreenProps = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  items: string[];
};

export function PlaceholderScreen({ title, subtitle, icon, items }: PlaceholderScreenProps) {
  return (
    <Screen>
      <Header title={title} subtitle={subtitle} />
      <GlassCard>
        <View className="mb-5 h-14 w-14 items-center justify-center rounded-3xl" style={{ backgroundColor: "rgba(124, 58, 237, 0.2)" }}>
          <Ionicons name={icon} size={26} color={colors.cyan} />
        </View>
        <View className="gap-3">
          {items.map((item) => (
            <View key={item} className="flex-row items-center">
              <View className="mr-3 h-2 w-2 rounded-full" style={{ backgroundColor: colors.cyan }} />
              <Text className="flex-1 text-base text-white">{item}</Text>
            </View>
          ))}
        </View>
      </GlassCard>
    </Screen>
  );
}
