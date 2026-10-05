import { PropsWithChildren } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/lib/theme/colors";

type GradientCardProps = PropsWithChildren<{
  variant?: "purple" | "blue" | "cyan";
}>;

const gradients = {
  purple: [colors.primaryPurple, colors.blue],
  blue: [colors.blue, colors.cyan],
  cyan: [colors.cyan, colors.success]
} as const;

export function GradientCard({ children, variant = "purple" }: GradientCardProps) {
  return (
    <LinearGradient colors={gradients[variant]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="rounded-3xl p-5">
      {children}
    </LinearGradient>
  );
}
