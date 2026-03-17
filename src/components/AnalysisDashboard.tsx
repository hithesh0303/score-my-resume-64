import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, XCircle, Lightbulb, Target, FileText, Award, Briefcase } from "lucide-react";
import ScoreCircle from "./ScoreCircle";

export interface AnalysisResult {
  atsScore: number;
  matchPercentage: number | null;
  sections: {
    name: string;
    score: number;
    feedback: string;
    icon: string;
  }[];
  foundKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  parsedInfo: {
    name?: string;
    email?: string;
    phone?: string;
    skills: string[];
    experienceYears?: string;
  };
}

const iconMap: Record<string, React.ReactNode> = {
  keywords: <Target className="h-4 w-4" />,
  structure: <FileText className="h-4 w-4" />,
  formatting: <Award className="h-4 w-4" />,
  skills: <Briefcase className="h-4 w-4" />,
  experience: <CheckCircle className="h-4 w-4" />,
};

export default function AnalysisDashboard({ result }: { result: AnalysisResult }) {
  return (
    <section className="py-12">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Top scores */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="flex items-center justify-center py-8">
              <ScoreCircle score={result.atsScore} label="ATS Score" size={180} />
            </Card>

            {result.matchPercentage !== null && (
              <Card className="flex items-center justify-center py-8">
                <ScoreCircle score={result.matchPercentage} label="Job Match" size={180} />
              </Card>
            )}

            <Card className={result.matchPercentage === null ? "md:col-span-2" : ""}>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  Parsed Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {result.parsedInfo.name && <p><span className="font-medium">Name:</span> {result.parsedInfo.name}</p>}
                {result.parsedInfo.email && <p><span className="font-medium">Email:</span> {result.parsedInfo.email}</p>}
                {result.parsedInfo.skills.length > 0 && (
                  <div>
                    <span className="font-medium">Skills:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {result.parsedInfo.skills.slice(0, 15).map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Keywords */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Found Keywords ({result.foundKeywords.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {result.foundKeywords.map((k) => (
                    <Badge key={k} className="bg-success/10 text-success border-success/20 text-xs">{k}</Badge>
                  ))}
                  {result.foundKeywords.length === 0 && <p className="text-sm text-muted-foreground">No keywords matched</p>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-destructive" />
                  Missing Keywords ({result.missingKeywords.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {result.missingKeywords.map((k) => (
                    <Badge key={k} variant="outline" className="text-destructive border-destructive/20 text-xs">{k}</Badge>
                  ))}
                  {result.missingKeywords.length === 0 && <p className="text-sm text-muted-foreground">No missing keywords</p>}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Section Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full">
                {result.sections.map((sec) => (
                  <AccordionItem key={sec.name} value={sec.name}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3 w-full pr-4">
                        <span className="text-primary">{iconMap[sec.icon] || <FileText className="h-4 w-4" />}</span>
                        <span className="font-medium text-sm">{sec.name}</span>
                        <div className="ml-auto flex items-center gap-3 w-32">
                          <Progress value={sec.score} className="h-2" />
                          <span className="text-xs font-semibold w-8">{sec.score}%</span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground pl-9">
                      {sec.feedback}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-warning" />
                AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.suggestions.map((s, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-3 text-sm"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground">{s}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
