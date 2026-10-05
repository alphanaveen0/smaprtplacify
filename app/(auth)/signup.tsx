import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Screen } from "@/components/ui/Screen";
import { Header } from "@/components/ui/Header";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { colors } from "@/lib/theme/colors";

export default function SignupScreen() {
  return (
    <Screen keyboard>
      <Header title="Create account" subtitle="Select an account type and start onboarding." />
      <View className="mb-4 flex-row gap-2">
        <StatusBadge label="Student" tone="purple" />
        <StatusBadge label="Company" tone="cyan" />
        <StatusBadge label="TPO" tone="success" />
      </View>
      <GlassCard>
        <View className="gap-4">
          <TextInput placeholder="Full name" placeholderTextColor={colors.secondaryText} className="rounded-2xl px-4 py-4 text-white" style={{ backgroundColor: colors.secondaryBackground }} />
          <TextInput placeholder="Email address" placeholderTextColor={colors.secondaryText} className="rounded-2xl px-4 py-4 text-white" style={{ backgroundColor: colors.secondaryBackground }} />
          <TextInput placeholder="Password" placeholderTextColor={colors.secondaryText} secureTextEntry className="rounded-2xl px-4 py-4 text-white" style={{ backgroundColor: colors.secondaryBackground }} />
          <TouchableOpacity className="rounded-2xl py-4" style={{ backgroundColor: colors.primaryPurple }}>
            <Text className="text-center font-bold text-white">Continue</Text>
          </TouchableOpacity>
        </View>
      </GlassCard>
    </Screen>
  );
}
