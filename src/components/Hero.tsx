import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero({ onScrollToUpload }: { onScrollToUpload: () => void }) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_60%)]" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground mb-6">
            <Zap className="h-3.5 w-3.5 text-primary" />
            AI-Powered Resume Analysis
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl text-balance leading-[1.1]">
            Check Your Resume{" "}
            <span className="text-primary">ATS Score</span>{" "}
            Instantly
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Upload your resume and get an instant ATS compatibility score, keyword analysis, and AI-powered suggestions to land more interviews.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="gap-2 font-semibold text-base px-8" onClick={onScrollToUpload}>
              Check My Resume
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="font-medium text-base" asChild>
              <a href="/builder">Build ATS Resume</a>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            {[
              { icon: Shield, text: "100% Free" },
              { icon: Zap, text: "Instant Results" },
              { icon: Target, text: "AI-Powered" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <item.icon className="h-4 w-4 text-primary" />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
