import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import { GlassCard } from "@/components/ui/GlassCard";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { colors } from "@/lib/theme/colors";

type Tone = "purple" | "blue" | "cyan" | "success" | "warning";

const toneColors: Record<Tone, string> = {
  purple: colors.primaryPurple,
  blue: colors.blue,
  cyan: colors.cyan,
  success: colors.success,
  warning: colors.warning
};

const kpis = [
  { label: "Total Students", value: "1,248", change: "12%", icon: "people", tone: "purple" },
  { label: "Eligible Students", value: "684", change: "18%", icon: "person-add", tone: "success" },
  { label: "Applications", value: "426", change: "22%", icon: "paper-plane", tone: "purple" },
  { label: "Companies", value: "42", change: "8%", icon: "business", tone: "blue" },
  { label: "Placed Students", value: "187", change: "15%", icon: "trophy", tone: "warning" }
] as const;

const drives = [
  { company: "Google", role: "SDE Intern", meta: "6.5+ CGPA | 142 Eligible", status: "Live", tone: "success" },
  { company: "TCS", role: "Trainee Engineer", meta: "6.0+ CGPA | 134 Eligible", status: "Live", tone: "success" },
  { company: "Infosys", role: "System Engineer", meta: "6.0+ CGPA | 96 Eligible", status: "Live", tone: "success" },
  { company: "Microsoft", role: "Software Developer", meta: "7.0+ CGPA | 82 Eligible", status: "Upcoming", tone: "blue" }
] as const;

const activities = [
  { title: "New job posted by Google", meta: "SDE Intern · 2 hours ago", icon: "briefcase", tone: "success" },
  { title: "142 students marked eligible", meta: "For Microsoft drive · 3 hours ago", icon: "checkmark-circle", tone: "warning" },
  { title: "Interview scheduled for 12 students", meta: "TCS · 5 hours ago", icon: "calendar", tone: "purple" },
  { title: "New application received", meta: "From Rahul Verma · 6 hours ago", icon: "document-text", tone: "cyan" }
] as const;

const skills = [
  { label: "Python", value: 92 },
  { label: "SQL", value: 81 },
  { label: "Java", value: 64 },
  { label: "React", value: 58 },
  { label: "Communication", value: 42 }
];

const interviews = [
  { student: "Rahul Sharma", company: "TCS", time: "12 Oct, 10:00 AM", mode: "Online" },
  { student: "Sneha Gupta", company: "Infosys", time: "12 Oct, 2:00 PM", mode: "Online" },
  { student: "Aman Yadav", company: "Google", time: "13 Oct, 11:30 AM", mode: "Onsite" }
];

const bars = [58, 42, 64, 76, 51, 72, 46, 88];

function TopBar() {
  return (
    <View className="mb-5 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <LinearGradient colors={[colors.cyan, colors.primaryPurple]} className="h-11 w-11 items-center justify-center rounded-2xl">
          <Ionicons name="flash" size={24} color="white" />
        </LinearGradient>
        <View className="ml-3">
          <Text className="text-xl font-bold text-white">SmartPlacify</Text>
          <Text className="text-[11px]" style={{ color: colors.secondaryText }}>Smarter Placements. Brighter Futures.</Text>
        </View>
      </View>
      <View className="flex-row gap-2">
        <View className="h-10 w-10 items-center justify-center rounded-2xl" style={{ backgroundColor: colors.card }}>
          <Ionicons name="notifications-outline" size={19} color={colors.primaryText} />
        </View>
        <View className="h-10 w-10 items-center justify-center rounded-2xl" style={{ backgroundColor: colors.primaryPurple }}>
          <Text className="font-bold text-white">DA</Text>
        </View>
      </View>
    </View>
  );
}

function SearchPill() {
  return (
    <View className="mb-5 flex-row items-center rounded-2xl border px-4 py-3" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
      <Ionicons name="search" size={18} color={colors.secondaryText} />
      <Text className="ml-3 flex-1 text-sm" style={{ color: colors.secondaryText }}>Search students, companies, jobs...</Text>
      <View className="rounded-lg px-2 py-1" style={{ backgroundColor: colors.secondaryBackground }}>
        <Text className="text-xs" style={{ color: colors.secondaryText }}>⌘ K</Text>
      </View>
    </View>
  );
}

function HeroBanner() {
  return (
    <LinearGradient colors={["#0B1730", "#312E81", "#7C3AED"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="mb-5 overflow-hidden rounded-3xl border p-5" style={{ borderColor: colors.border }}>
      <View className="absolute bottom-0 left-0 right-0 h-24 opacity-70">
        <View className="absolute bottom-0 left-2 h-20 w-32 rounded-3xl" style={{ backgroundColor: "#1D4ED8", transform: [{ rotate: "45deg" }] }} />
        <View className="absolute bottom-0 left-24 h-28 w-40 rounded-3xl" style={{ backgroundColor: "#6D28D9", transform: [{ rotate: "45deg" }] }} />
        <View className="absolute bottom-0 right-3 h-24 w-36 rounded-3xl" style={{ backgroundColor: "#EC4899", transform: [{ rotate: "45deg" }] }} />
      </View>
      <View className="relative">
        <Text className="text-2xl font-bold text-white">Good Morning, Dr. Anjali Sharma</Text>
        <Text className="mt-2 text-sm leading-5 text-white/80">Here's what's happening with your placement drive today.</Text>
        <View className="mt-5 self-start rounded-2xl px-4 py-3" style={{ backgroundColor: "rgba(5, 11, 26, 0.58)" }}>
          <Text className="text-xs font-semibold text-white/70">Placement Season 2026 - 27</Text>
          <Text className="mt-1 text-sm font-bold text-white">Gurugram University</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

function KpiCard({ item }: { item: (typeof kpis)[number] }) {
  const accent = toneColors[item.tone];

  return (
    <GlassCard style={{ marginBottom: 12 }}>
      <View className="flex-row items-center">
        <LinearGradient colors={[accent, `${accent}66`]} className="h-14 w-14 items-center justify-center rounded-2xl">
          <Ionicons name={item.icon} size={25} color="white" />
        </LinearGradient>
        <View className="ml-4 flex-1">
          <Text className="text-sm" style={{ color: colors.secondaryText }}>{item.label}</Text>
          <Text className="mt-1 text-3xl font-bold text-white">{item.value}</Text>
          <Text className="mt-1 text-xs" style={{ color: colors.success }}>↑ {item.change} vs. last month</Text>
        </View>
        <View className="h-12 w-16 justify-end">
          <View className="h-2 w-3 rounded-full" style={{ backgroundColor: `${accent}55` }} />
          <View className="mt-1 h-2 w-8 rounded-full" style={{ backgroundColor: `${accent}88` }} />
          <View className="mt-1 h-2 w-14 rounded-full" style={{ backgroundColor: accent }} />
        </View>
      </View>
    </GlassCard>
  );
}

function PlacementOverview() {
  return (
    <GlassCard>
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-white">Placement Overview</Text>
        <View className="rounded-xl px-3 py-2" style={{ backgroundColor: colors.primaryPurple }}>
          <Text className="text-xs font-bold text-white">Applications</Text>
        </View>
      </View>
      <View className="h-40 flex-row items-end justify-between border-b border-l px-2" style={{ borderColor: colors.border }}>
        {bars.map((bar, index) => (
          <View key={`${bar}-${index}`} className="items-center">
            <LinearGradient colors={[colors.primaryPurple, colors.cyan]} className="w-5 rounded-t-xl" style={{ height: bar }} />
            <Text className="mt-2 text-[10px]" style={{ color: colors.secondaryText }}>{["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"][index]}</Text>
          </View>
        ))}
      </View>
    </GlassCard>
  );
}

function PlacementRate() {
  return (
    <GlassCard>
      <Text className="mb-4 text-lg font-bold text-white">Placement Rate</Text>
      <View className="items-center">
        <LinearGradient colors={[colors.primaryPurple, colors.cyan]} className="h-36 w-36 items-center justify-center rounded-full">
          <View className="h-24 w-24 items-center justify-center rounded-full" style={{ backgroundColor: colors.background }}>
            <Text className="text-3xl font-bold text-white">67%</Text>
            <Text className="text-xs" style={{ color: colors.secondaryText }}>187 / 1,248</Text>
          </View>
        </LinearGradient>
      </View>
    </GlassCard>
  );
}

function LiveDrives() {
  return (
    <GlassCard>
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-white">Live Placement Drives</Text>
        <Text className="text-xs font-bold" style={{ color: colors.primaryPurple }}>View All</Text>
      </View>
      <View className="gap-3">
        {drives.map((drive) => (
          <View key={drive.company} className="flex-row items-center">
            <View className="h-11 w-11 items-center justify-center rounded-2xl bg-white">
              <Text className="font-bold" style={{ color: drive.company === "Google" ? colors.blue : colors.card }}>{drive.company.slice(0, 1)}</Text>
            </View>
            <View className="ml-3 flex-1">
              <Text className="font-bold text-white">{drive.company}</Text>
              <Text className="text-xs" style={{ color: colors.secondaryText }}>{drive.role}</Text>
              <Text className="text-[11px]" style={{ color: colors.secondaryText }}>{drive.meta}</Text>
            </View>
            <View className="rounded-full px-3 py-1" style={{ backgroundColor: `${toneColors[drive.tone]}22` }}>
              <Text className="text-xs font-bold" style={{ color: toneColors[drive.tone] }}>{drive.status}</Text>
            </View>
          </View>
        ))}
      </View>
    </GlassCard>
  );
}

function AIAssistantCard() {
  return (
    <LinearGradient colors={["#111827", "#581C87", "#0B1730"]} className="rounded-3xl border p-5" style={{ borderColor: colors.border }}>
      <View className="flex-row">
        <View className="h-20 w-20 items-center justify-center rounded-3xl" style={{ backgroundColor: "rgba(124, 58, 237, 0.35)" }}>
          <Ionicons name="sparkles" size={34} color={colors.cyan} />
        </View>
        <View className="ml-4 flex-1">
          <Text className="text-xl font-bold text-white">Ask SmartPlacify AI</Text>
          <Text className="mt-2 text-sm leading-5 text-white/75">Get instant insights, answer queries, and make smarter placement decisions.</Text>
        </View>
      </View>
      <View className="mt-5 flex-row rounded-2xl p-2" style={{ backgroundColor: "rgba(5, 11, 26, 0.55)" }}>
        <Text className="flex-1 px-2 py-2 text-xs text-white/70">Ask anything... e.g. eligible students for today's jobs</Text>
        <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-2xl" style={{ backgroundColor: colors.primaryPurple }}>
          <Ionicons name="arrow-forward" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

function RecentActivity() {
  return (
    <GlassCard>
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-white">Recent Activity</Text>
        <Text className="text-xs font-bold" style={{ color: colors.primaryPurple }}>View All</Text>
      </View>
      <View className="gap-4">
        {activities.map((activity) => (
          <View key={activity.title} className="flex-row">
            <View className="h-10 w-10 items-center justify-center rounded-2xl" style={{ backgroundColor: `${toneColors[activity.tone]}24` }}>
              <Ionicons name={activity.icon} size={18} color={toneColors[activity.tone]} />
            </View>
            <View className="ml-3 flex-1">
              <Text className="font-semibold text-white">{activity.title}</Text>
              <Text className="mt-1 text-xs" style={{ color: colors.secondaryText }}>{activity.meta}</Text>
            </View>
          </View>
        ))}
      </View>
    </GlassCard>
  );
}

function SkillsDemand() {
  return (
    <GlassCard>
      <Text className="mb-4 text-lg font-bold text-white">Top Skills in Demand</Text>
      {skills.map((skill) => (
        <View key={skill.label} className="mb-3 flex-row items-center">
          <Text className="w-28 text-sm text-white">{skill.label}</Text>
          <View className="h-3 flex-1 overflow-hidden rounded-full" style={{ backgroundColor: colors.secondaryBackground }}>
            <LinearGradient colors={[colors.blue, colors.primaryPurple]} className="h-full rounded-full" style={{ width: `${skill.value}%` }} />
          </View>
          <Text className="ml-3 w-9 text-right text-xs" style={{ color: colors.secondaryText }}>{skill.value}%</Text>
        </View>
      ))}
    </GlassCard>
  );
}

function QuickActions() {
  const actions = [
    { label: "Create Job", icon: "add-circle", tone: colors.primaryPurple },
    { label: "View All Students", icon: "people", tone: colors.blue },
    { label: "Generate Report", icon: "analytics", tone: colors.success },
    { label: "Send Notifications", icon: "paper-plane", tone: colors.warning }
  ] as const;

  return (
    <GlassCard>
      <Text className="mb-4 text-lg font-bold text-white">Quick Actions</Text>
      <View className="gap-3">
        {actions.map((action) => (
          <TouchableOpacity key={action.label} className="flex-row items-center rounded-2xl px-4 py-3" style={{ backgroundColor: action.tone }}>
            <Ionicons name={action.icon} size={18} color="white" />
            <Text className="ml-3 flex-1 font-bold text-white">{action.label}</Text>
            <Ionicons name="arrow-forward" size={18} color="white" />
          </TouchableOpacity>
        ))}
      </View>
    </GlassCard>
  );
}

function UpcomingInterviews() {
  return (
    <GlassCard>
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-white">Upcoming Interviews</Text>
        <Text className="text-xs font-bold" style={{ color: colors.primaryPurple }}>View All</Text>
      </View>
      <View className="gap-3">
        {interviews.map((interview) => (
          <View key={interview.student} className="flex-row items-center">
            <View className="h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: colors.secondaryBackground }}>
              <Ionicons name="person" size={17} color={colors.cyan} />
            </View>
            <View className="ml-3 flex-1">
              <Text className="font-bold text-white">{interview.student}</Text>
              <Text className="text-xs" style={{ color: colors.secondaryText }}>{interview.company} · {interview.time}</Text>
            </View>
            <View className="rounded-full px-3 py-1" style={{ backgroundColor: "rgba(16, 185, 129, 0.16)" }}>
              <Text className="text-xs font-bold" style={{ color: colors.success }}>{interview.mode}</Text>
            </View>
          </View>
        ))}
      </View>
    </GlassCard>
  );
}

function PlacementAnalytics() {
  const groups = [70, 44, 82, 58, 74, 62, 68, 96];

  return (
    <GlassCard>
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-white">Placement Analytics</Text>
        <View className="rounded-xl px-3 py-2" style={{ backgroundColor: colors.secondaryBackground }}>
          <Text className="text-xs text-white">This Year</Text>
        </View>
      </View>
      <View className="h-32 flex-row items-end justify-between">
        {groups.map((height, index) => (
          <View key={`${height}-${index}`} className="items-center">
            <View className="flex-row items-end gap-1">
              <View className="w-2 rounded-t" style={{ height, backgroundColor: colors.primaryPurple }} />
              <View className="w-2 rounded-t" style={{ height: height * 0.62, backgroundColor: colors.blue }} />
              <View className="w-2 rounded-t" style={{ height: height * 0.48, backgroundColor: colors.success }} />
            </View>
          </View>
        ))}
      </View>
    </GlassCard>
  );
}

function SuccessStoryCard() {
  return (
    <LinearGradient colors={["#1E1B4B", "#7C3AED", "#0F172A"]} className="rounded-3xl border p-5" style={{ borderColor: colors.border }}>
      <View className="flex-row items-center">
        <View className="flex-1">
          <Text className="text-2xl font-bold text-white">Your Next Success Story Starts Here</Text>
          <Text className="mt-3 text-sm leading-5 text-white/75">Help students find, manage and get the right talent opportunities.</Text>
        </View>
        <View className="ml-4 h-24 w-24 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.14)" }}>
          <Ionicons name="radio-button-on" size={58} color={colors.cyan} />
        </View>
      </View>
    </LinearGradient>
  );
}

export default function TpoDashboard() {
  return (
    <Screen>
      <TopBar />
      <SearchPill />
      <HeroBanner />
      <View className="gap-1">
        {kpis.map((item) => <KpiCard key={item.label} item={item} />)}
      </View>
      <SectionHeader title="Placement Overview" />
      <PlacementOverview />
      <SectionHeader title="Placement Rate" />
      <PlacementRate />
      <SectionHeader title="Live Placement Drives" />
      <LiveDrives />
      <SectionHeader title="AI Assistant" />
      <AIAssistantCard />
      <SectionHeader title="Recent Activity" />
      <RecentActivity />
      <SectionHeader title="Top Skills" />
      <SkillsDemand />
      <SectionHeader title="Quick Actions" />
      <QuickActions />
      <SectionHeader title="Upcoming Interviews" />
      <UpcomingInterviews />
      <SectionHeader title="Analytics" />
      <PlacementAnalytics />
      <View className="mt-5">
        <SuccessStoryCard />
      </View>
    </Screen>
  );
}
