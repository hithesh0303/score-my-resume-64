import { motion } from "framer-motion";
import { BarChart3, Target, Lightbulb, FileText, Layers, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  { icon: BarChart3, title: "ATS Score Analysis", desc: "Get a detailed 0–100 score based on keyword matching, structure, formatting, skills, and experience quality." },
  { icon: Target, title: "Job Description Match", desc: "Paste a job description and see your match percentage with missing keywords highlighted." },
  { icon: Lightbulb, title: "AI Suggestions", desc: "Receive AI-powered improvements including action verbs, missing skills, and rewritten bullet points." },
  { icon: FileText, title: "Resume Parsing", desc: "Automatically extract name, email, skills, education, and experience sections from your resume." },
  { icon: Layers, title: "ATS Templates", desc: "Download ATS-friendly resume templates designed to pass automated screening systems." },
  { icon: Zap, title: "Resume Builder", desc: "Build a professional ATS-optimized resume from scratch with our form-based builder." },
];

export default function Features() {
  return (
    <section className="py-16 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold md:text-3xl">Everything You Need to Beat the ATS</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Our suite of tools helps you optimize every aspect of your resume for applicant tracking systems.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
