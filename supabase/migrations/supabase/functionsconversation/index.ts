import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const handler = async (req: Request): Promise<Response> => {
  const userId = req.headers.get("x-user-id"); // later: replace with real auth
  if (!userId) return new Response("Missing user", { status: 401 });

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) return jsonError(error.message);
    return jsonOk(data);
  }

  if (req.method === "POST") {
    const body = await req.json();
    const { title } = body;

    const { data, error } = await supabase
      .from("conversations")
      .insert({ user_id: userId, title })
      .select()
      .single();

    if (error) return jsonError(error.message, 500);
    return jsonOk(data, 201);
  }

  return new Response("Method not allowed", { status: 405 });
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
