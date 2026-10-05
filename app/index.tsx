import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { Screen } from "@/components/ui/Screen";
import { Header } from "@/components/ui/Header";
import { GradientCard } from "@/components/ui/GradientCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { colors } from "@/lib/theme/colors";

const roles = [
  { label: "Student", href: "/(student)", icon: "person-outline", caption: "Jobs, applications, resume and AI career tools" },
  { label: "Company", href: "/(company)", icon: "business-outline", caption: "Jobs, candidates, shortlists and interviews" },
  { label: "TPO", href: "/(tpo)", icon: "school-outline", caption: "Placement drives, students and mobile analytics" },
  { label: "Super Admin", href: "/(admin)", icon: "shield-checkmark-outline", caption: "Organizations, subscriptions and platform health" }
] as const;

export default function RoleSelection() {
  return (
    <Screen>
      <Header title="Choose your workspace" subtitle="Phase 1 uses mock data so each role shell can be reviewed quickly on a phone." />
      <GradientCard>
        <Text className="text-3xl font-bold text-white">Smart Placements. Brighter Futures.</Text>
        <Text className="mt-3 text-base leading-6 text-white/80">A premium mobile-first placement platform for students, recruiters, TPO teams and SaaS admins.</Text>
      </GradientCard>
      <View className="mt-6 gap-3">
        {roles.map((role) => (
          <Link key={role.label} href={role.href} asChild>
            <TouchableOpacity>
              <GlassCard>
                <View className="flex-row items-center">
                  <View className="h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: "rgba(6, 182, 212, 0.14)" }}>
                    <Ionicons name={role.icon} size={22} color={colors.cyan} />
                  </View>
                  <View className="ml-4 flex-1">
                    <Text className="text-lg font-bold text-white">{role.label}</Text>
                    <Text className="mt-1 text-sm leading-5" style={{ color: colors.secondaryText }}>{role.caption}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.secondaryText} />
                </View>
              </GlassCard>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
      <View className="mt-6 flex-row gap-3">
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity className="flex-1 rounded-2xl py-4" style={{ backgroundColor: colors.card }}>
            <Text className="text-center font-bold text-white">Login UI</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/(auth)/signup" asChild>
          <TouchableOpacity className="flex-1 rounded-2xl py-4" style={{ backgroundColor: colors.primaryPurple }}>
            <Text className="text-center font-bold text-white">Sign Up UI</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </Screen>
  );
}
