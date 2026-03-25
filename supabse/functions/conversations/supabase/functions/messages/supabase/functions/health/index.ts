export const handler = async (): Promise<Response> => {
  return new Response(
    JSON.stringify({ ok: true, service: "microfyxd-ai-backend" }),
    { headers: { "Content-Type": "application/json" } }
  );
};
