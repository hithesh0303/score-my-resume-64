import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompt = `You are an expert ATS (Applicant Tracking System) resume analyzer. Analyze the provided resume text and return a structured JSON response.

Your analysis must include:
1. ATS Score (0-100) based on weighted criteria:
   - Keyword relevance (30%): Are industry-relevant keywords present?
   - Resume structure (20%): Does it have clear sections (Experience, Education, Skills)?
   - Formatting (15%): Is it ATS-friendly (no tables, graphics, unusual formatting)?
   - Skills analysis (20%): Are skills relevant and well-presented?
   - Experience quality (15%): Are achievements quantified with metrics?

2. If a job description is provided, calculate match percentage and identify found/missing keywords.

3. Parse basic info: name, email, skills list.

4. Section-by-section scores with specific feedback.

5. 5-8 actionable improvement suggestions.

IMPORTANT: Return ONLY valid JSON with this exact structure:
{
  "atsScore": number,
  "matchPercentage": number | null,
  "sections": [
    {"name": "Keyword Matching", "score": number, "feedback": "string", "icon": "keywords"},
    {"name": "Resume Structure", "score": number, "feedback": "string", "icon": "structure"},
    {"name": "Formatting", "score": number, "feedback": "string", "icon": "formatting"},
    {"name": "Skills Analysis", "score": number, "feedback": "string", "icon": "skills"},
    {"name": "Experience Quality", "score": number, "feedback": "string", "icon": "experience"}
  ],
  "foundKeywords": ["string"],
  "missingKeywords": ["string"],
  "suggestions": ["string"],
  "parsedInfo": {
    "name": "string or null",
    "email": "string or null",
    "phone": "string or null",
    "skills": ["string"],
    "experienceYears": "string or null"
  }
}`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resumeText, jobDescription } = await req.json();

    if (!resumeText) {
      return new Response(JSON.stringify({ error: "No resume text provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build user prompt
    let cleanText = resumeText;
    if (resumeText.startsWith("__BASE64__")) {
      // For binary files, extract filename and tell AI we have encoded content
      const parts = resumeText.split("__");
      const filename = parts[2] || "resume";
      const base64Content = parts[3] || "";
      // Decode base64 to text (best effort for PDF/DOCX)
      try {
        const decoded = atob(base64Content);
        // Extract readable text from decoded content
        cleanText = decoded.replace(/[^\x20-\x7E\n\r\t]/g, " ").replace(/\s+/g, " ").trim();
        if (cleanText.length < 50) {
          cleanText = `[File: ${filename}] The file content could not be fully extracted. Please analyze what is available: ${cleanText}`;
        }
      } catch {
        cleanText = `[File: ${filename}] Binary file uploaded - content extraction limited.`;
      }
    }

    let userPrompt = `Analyze this resume:\n\n${cleanText.substring(0, 8000)}`;
    if (jobDescription) {
      userPrompt += `\n\n---\nJob Description to match against:\n${jobDescription.substring(0, 4000)}`;
    } else {
      userPrompt += `\n\nNo job description provided, so set matchPercentage to null and provide general keyword analysis.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse JSON from response (handle markdown code blocks)
    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
    }

    const result = JSON.parse(jsonStr.trim());

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-resume error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Analysis failed" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
