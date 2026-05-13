// Stage 0 placeholder - btcpay-webhook Edge Function
Deno.serve(async () => {
  return new Response(
    JSON.stringify({
      ok: true,
      message: "btcpay-webhook placeholder",
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
});
