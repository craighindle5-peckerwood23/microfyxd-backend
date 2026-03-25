import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const handler = async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const userId = req.headers.get("x-user-id");
  if (!userId) return new Response("Missing user", { status: 401 });

  const body = await req.json();
  const { conversation_id, content } = body;

  if (!conversation_id || !content) {
    return jsonError("conversation_id and content are required", 400);
  }

  // 1) Insert user message
  const { error: userMsgError } = await supabase.from("messages").insert({
    conversation_id,
    role: "user",
    content,
  });

  if (userMsgError) return jsonError(userMsgError.message, 500);

  // 2) Load recent conversation history
  const { data: history, error: historyError } = await supabase
    .from("messages")
    .select("role, content")
    .eq("conversation_id", conversation_id)
    .order("created_at", { ascending: true })
    .limit(30);

  if (historyError) return jsonError(historyError.message, 500);

  // 3) Call AI model (placeholder)
  const assistantReply = await callAiModel(history ?? []);

  // 4) Store assistant message
  const { error: assistantMsgError } = await supabase.from("messages").insert({
    conversation_id,
    role: "assistant",
    content: assistantReply,
  });

  if (assistantMsgError) return jsonError(assistantMsgError.message, 500);

  // 5) Return assistant reply
  return jsonOk({ reply: assistantReply });
};

const jsonOk = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const jsonError = (message: string, status = 400) =>
  new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });

// 🔧 Replace this with your real model call
async function callAiModel(
  history: { role: string; content: string }[]
): Promise<string> {
  // For now, echo last user message so the pipeline is testable
  const lastUser = [...history].reverse().find((m) => m.role === "user");
  return lastUser
    ? `You said: "${lastUser.content}". (AI reply placeholder)`
    : "Hello from Microfyxd AI backend.";
}
