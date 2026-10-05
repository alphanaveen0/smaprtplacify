import { PlaceholderScreen } from "@/components/dashboard/PlaceholderScreen";

export default function AdminSubscriptions() {
  return (
    <PlaceholderScreen
      title="Subscriptions"
      subtitle="Razorpay verification will be secure backend-only in a later phase."
      icon="card-outline"
      items={["Starter · student limits", "Professional · AI analysis limits", "Enterprise · custom reports"]}
    />
  );
}
