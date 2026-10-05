import { PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";
import { colors } from "@/lib/theme/colors";

type GlassCardProps = PropsWithChildren<ViewProps>;

export function GlassCard({ children, style, ...props }: GlassCardProps) {
  return (
    <View
      {...props}
      className="rounded-3xl border p-4"
      style={[{ backgroundColor: "rgba(11, 23, 48, 0.86)", borderColor: colors.border }, style]}
    >
      {children}
    </View>
  );
}
