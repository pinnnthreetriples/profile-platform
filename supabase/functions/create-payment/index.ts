// Stage 0 placeholder - create-payment Edge Function
Deno.serve(async () => {
  return new Response(
    JSON.stringify({
      ok: true,
      message: "create-payment placeholder",
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
});
