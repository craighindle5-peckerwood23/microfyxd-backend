import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return new Response(JSON.stringify({ error: "Missing auth token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(token);

  if (userError || !user) {
    return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await req.json().catch(() => null);

  if (!body || !body.title || !body.details || !body.contact) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { title, category, details, contact } = body;

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      user_id: user.id,
      title,
      category: category || null,
      details,
      contact,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to create task" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true, task: data }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
