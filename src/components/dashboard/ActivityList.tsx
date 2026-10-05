import { Text, View } from "react-native";
import { colors } from "@/lib/theme/colors";
import { Activity } from "@/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatusBadge } from "@/components/ui/StatusBadge";

type ActivityListProps = {
  items: Activity[];
};

export function ActivityList({ items }: ActivityListProps) {
  return (
    <View className="gap-3">
      {items.map((item) => (
        <GlassCard key={item.id}>
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <Text className="font-bold text-white">{item.title}</Text>
              <Text className="mt-1 text-sm" style={{ color: colors.secondaryText }}>{item.subtitle}</Text>
            </View>
            <StatusBadge label="Live" tone={item.tone} />
          </View>
        </GlassCard>
      ))}
    </View>
  );
}
