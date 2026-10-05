import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { colors } from "@/lib/theme/colors";

type TabItem = {
  name: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
};

type RoleTabsProps = {
  tabs: TabItem[];
};

export function RoleTabs({ tabs }: RoleTabsProps) {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.cyan,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarStyle: {
          position: "absolute",
          height: 76,
          paddingTop: 8,
          paddingBottom: 16,
          marginHorizontal: 16,
          marginBottom: 12,
          borderRadius: 26,
          borderTopWidth: 0,
          backgroundColor: "#081329"
        },
        sceneStyle: { backgroundColor: colors.background }
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => <Ionicons name={tab.icon} color={color} size={size} />
          }}
        />
      ))}
    </Tabs>
  );
}
