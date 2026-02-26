import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    const body = await req.json();
    const symptoms = body?.symptoms;

    if (!symptoms || typeof symptoms !== "string" || symptoms.trim().length < 3) {
      return new Response(
        JSON.stringify({
          error: "Please describe your symptoms (minimum 3 characters).",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const aiResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `
You are a medical AI assistant.

IMPORTANT:
- You are NOT a doctor.
- Always include a disclaimer.
- Only return valid JSON.
- Do NOT return markdown formatting.

Return this exact JSON structure:

{
  "possibleConditions": [
    { "name": "Condition Name", "probability": "High/Medium/Low", "description": "Brief description" }
  ],
  "suggestedMedicines": [
    { "name": "Medicine Name", "type": "OTC/Prescription", "dosage": "Suggested dosage", "notes": "Important notes" }
  ],
  "severity": "Low/Medium/High/Emergency",
  "recommendations": ["Recommendation 1"],
  "whenToSeeDoctor": "When to seek medical attention",
  "disclaimer": "This is AI-generated information for educational purposes only."
}
`,
            },
            {
              role: "user",
              content: `Analyze these symptoms: ${symptoms}`,
            },
          ],
        }),
      }
    );

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI API error:", aiResponse.status, errorText);

      return new Response(
        JSON.stringify({
          error: "AI service failed to analyze symptoms.",
        }),
        {
          status: aiResponse.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await aiResponse.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "No analysis generated." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let analysis;

    try {
      const cleaned = content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      analysis = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("JSON parse error:", content);
      return new Response(
        JSON.stringify({ error: "Failed to parse AI response." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify(analysis), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Function error:", error);

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : "Unknown server error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});