import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UploadZone from "@/components/UploadZone";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import AnalysisDashboard, { type AnalysisResult } from "@/components/AnalysisDashboard";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Index() {
  const uploadRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleScrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  <a href="/free-ats-resume-checker">
  Free ATS Resume Checker
</a>


  const handleAnalyze = async (resumeText: string, jobDescription: string) => {
    setIsLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-resume", {
        body: { resumeText, jobDescription },
      });

      if (error) throw error;
      if (!data) throw new Error("No data returned");

      setResult(data as AnalysisResult);

      // Scroll to results
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: unknown) {
      console.error("Analysis error:", err);
      toast({
        title: "Analysis failed",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero onScrollToUpload={handleScrollToUpload} />
      <UploadZone ref={uploadRef} onAnalyze={handleAnalyze} isLoading={isLoading} />

      {result && (
        <div id="results">
          <AnalysisDashboard result={result} />
        </div>
      )}

      <Features />
      <HowItWorks />
      <FAQ />
      <Footer />
    </div>
  );
}
