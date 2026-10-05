import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/lib/theme/colors";
import { GlassCard } from "@/components/ui/GlassCard";

const actions = [
  { label: "Check ATS Score", icon: "analytics-outline" },
  { label: "Fix My Resume", icon: "sparkles-outline" },
  { label: "Find Matching Jobs", icon: "briefcase-outline" },
  { label: "Improve My Skills", icon: "school-outline" },
  { label: "Interview Preparation", icon: "mic-outline" }
] as const;

export function AIQuickActions() {
  return (
    <GlassCard>
      <Text className="text-2xl font-bold text-white">SmartPlacify AI</Text>
      <Text className="mt-2 text-sm" style={{ color: colors.secondaryText }}>What can I help you with?</Text>
      <View className="mt-5 gap-3">
        {actions.map((action) => (
          <TouchableOpacity key={action.label} className="flex-row items-center rounded-2xl border px-4 py-3" style={{ borderColor: colors.border }}>
            <Ionicons name={action.icon} size={19} color={colors.cyan} />
            <Text className="ml-3 flex-1 font-semibold text-white">{action.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.secondaryText} />
          </TouchableOpacity>
        ))}
      </View>
    </GlassCard>
  );
}
