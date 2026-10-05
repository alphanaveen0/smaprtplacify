import { AIQuickActions } from "@/components/ai/AIQuickActions";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";

export default function StudentAI() {
  return (
    <Screen>
      <Header title="SmartPlacify AI" subtitle="Mock quick actions only. Secure backend AI calls arrive in later phases." />
      <AIQuickActions />
    </Screen>
  );
}
