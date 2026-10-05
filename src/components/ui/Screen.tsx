import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/lib/theme/colors";

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
  keyboard?: boolean;
}>;

export function Screen({ children, scroll = true, keyboard = false }: ScreenProps) {
  const content = scroll ? (
    <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View className="flex-1 px-5 pb-24">{children}</View>
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} enabled={keyboard} className="flex-1">
        {content}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
