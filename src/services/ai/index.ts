export type AIProviderRequest = {
  organizationId: string;
  role: "student" | "company" | "tpo" | "admin";
  prompt: string;
};

export async function sendAIRequest(_request: AIProviderRequest): Promise<never> {
  throw new Error("AI calls must be proxied through a secure backend. Phase 1 intentionally has no mobile AI secrets.");
}
