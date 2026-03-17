import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const templates = [
  { name: "Classic Professional", desc: "Clean single-column layout. Perfect for traditional industries.", features: ["Single column", "Standard headings", "Easy to scan"] },
  { name: "Modern Minimal", desc: "Contemporary design with subtle accents. Great for tech roles.", features: ["Clean typography", "Skill bars", "ATS-optimized"] },
  { name: "Executive", desc: "Polished layout for senior professionals and leadership roles.", features: ["Summary section", "Achievement focus", "Professional tone"] },
  { name: "Technical", desc: "Optimized for engineering and IT positions with skills emphasis.", features: ["Skills matrix", "Project section", "Technical focus"] },
  { name: "Entry Level", desc: "Ideal for recent graduates and career changers.", features: ["Education first", "Skills highlight", "Clean layout"] },
  { name: "Creative Professional", desc: "Balanced design for marketing, design, and creative roles.", features: ["Portfolio links", "Visual hierarchy", "ATS-safe"] },
];

export default function Templates() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-12 flex-1">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">ATS-Friendly Resume Templates</h1>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Download professionally designed templates that are guaranteed to pass ATS scanning systems.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                <div className="h-40 bg-muted rounded-t-lg flex items-center justify-center">
                  <div className="w-20 space-y-1.5 p-3 bg-card rounded shadow-sm">
                    <div className="h-1.5 bg-primary/30 rounded w-full" />
                    <div className="h-1 bg-muted-foreground/20 rounded w-3/4" />
                    <div className="h-1 bg-muted-foreground/20 rounded w-full" />
                    <div className="h-1 bg-muted-foreground/20 rounded w-5/6" />
                    <div className="h-1 bg-muted-foreground/20 rounded w-2/3" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-base">{t.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4">{t.desc}</p>
                  <ul className="space-y-1.5 mb-6">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-3.5 w-3.5 text-success" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="mt-auto gap-2" asChild>
                    <a href="/builder">
                      <Download className="h-4 w-4" /> Use Template
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
