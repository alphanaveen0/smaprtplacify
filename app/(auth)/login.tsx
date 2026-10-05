import { Link } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Screen } from "@/components/ui/Screen";
import { Header } from "@/components/ui/Header";
import { GlassCard } from "@/components/ui/GlassCard";
import { colors } from "@/lib/theme/colors";

export default function LoginScreen() {
  return (
    <Screen keyboard>
      <Header title="Welcome back" subtitle="Sign in to continue your placement workflow." />
      <GlassCard>
        <View className="gap-4">
          <TextInput placeholder="Email address" placeholderTextColor={colors.secondaryText} className="rounded-2xl px-4 py-4 text-white" style={{ backgroundColor: colors.secondaryBackground }} />
          <TextInput placeholder="Password" placeholderTextColor={colors.secondaryText} secureTextEntry className="rounded-2xl px-4 py-4 text-white" style={{ backgroundColor: colors.secondaryBackground }} />
          <TouchableOpacity className="rounded-2xl py-4" style={{ backgroundColor: colors.primaryPurple }}>
            <Text className="text-center font-bold text-white">Log In</Text>
          </TouchableOpacity>
          <Link href="/(auth)/forgot-password" className="text-center font-semibold" style={{ color: colors.cyan }}>
            Forgot password?
          </Link>
        </View>
      </GlassCard>
    </Screen>
  );
}
