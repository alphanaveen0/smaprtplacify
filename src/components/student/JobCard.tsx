import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/lib/theme/colors";
import { Job } from "@/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatusBadge } from "@/components/ui/StatusBadge";

type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  return (
    <GlassCard style={{ marginBottom: 12 }}>
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-sm font-semibold" style={{ color: colors.cyan }}>{job.company}</Text>
          <Text className="mt-1 text-xl font-bold text-white">{job.title}</Text>
          <Text className="mt-1 text-sm" style={{ color: colors.secondaryText }}>{job.location} · Deadline {job.deadline}</Text>
        </View>
        <StatusBadge label={`${job.match}% Match`} tone="success" />
      </View>
      <View className="mt-5 flex-row items-center justify-between">
        <StatusBadge label={job.eligibility} tone="cyan" />
        <TouchableOpacity className="flex-row items-center rounded-full px-4 py-2" style={{ backgroundColor: colors.primaryPurple }}>
          <Text className="mr-2 text-sm font-bold text-white">View Job</Text>
          <Ionicons name="arrow-forward" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </GlassCard>
  );
}
