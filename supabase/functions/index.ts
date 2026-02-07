import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req: Request) => {
  // ✅ Handle CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // ✅ Get JSON Data
    const data = await req.json();

    // ✅ Load Env Variables
    const botToken = Deno.env.get("7244277654:AAF3Fxa26pLKeQMV4I0x9PkD7xnHY594YJQ");
    const chatId = Deno.env.get("6626415274");

    if (!botToken || !chatId) {
      throw new Error("BOT_TOKEN or CHAT_ID missing in Supabase Environment");
    }

    // ✅ Safe fallback values
    const box1 = data.box1 || "Not Provided";
    const box2 = data.box2 || "Not Provided";
    const service = data.service || "No Service Selected";
    const video = data.video || "No Link Provided";

    // ✅ Telegram Message
    const message =
      `📩 New Submission:\n\n` +
      `Text: ${box1}\n` +
      `Text: ${box2}\n` +
      `Service: ${service}\n` +
      `Video Link: ${video}`;

    // ✅ Telegram API URL
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // ✅ Send Request
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    // ✅ Read Telegram Response
    const result = await response.text();
    console.log("Telegram Response:", result);

    if (!response.ok) {
      throw new Error("Telegram Error: " + result);
    }

    // ✅ Success Response
    return new Response(
      JSON.stringify({
        message: "Order Submitted Wait ✅",
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error ❌",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});