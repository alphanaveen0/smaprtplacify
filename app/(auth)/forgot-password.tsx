import { Text, TextInput, TouchableOpacity } from "react-native";
import { Screen } from "@/components/ui/Screen";
import { Header } from "@/components/ui/Header";
import { GlassCard } from "@/components/ui/GlassCard";
import { colors } from "@/lib/theme/colors";

export default function ForgotPasswordScreen() {
  return (
    <Screen keyboard>
      <Header title="Reset password" subtitle="Enter your email and SmartPlacify will send reset instructions." />
      <GlassCard>
        <TextInput placeholder="Email address" placeholderTextColor={colors.secondaryText} className="rounded-2xl px-4 py-4 text-white" style={{ backgroundColor: colors.secondaryBackground }} />
        <TouchableOpacity className="mt-4 rounded-2xl py-4" style={{ backgroundColor: colors.primaryPurple }}>
          <Text className="text-center font-bold text-white">Send Reset Link</Text>
        </TouchableOpacity>
      </GlassCard>
    </Screen>
  );
}
