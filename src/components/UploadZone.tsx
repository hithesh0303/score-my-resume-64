import { useCallback, useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface UploadZoneProps {
  onAnalyze: (resumeText: string, jobDescription: string) => void;
  isLoading: boolean;
}

const UploadZone = forwardRef<HTMLDivElement, UploadZoneProps>(({ onAnalyze, isLoading }, ref) => {
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleFile = useCallback(async (f: File) => {
    const maxSize = 5 * 1024 * 1024;
    const allowed = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];

    if (f.size > maxSize) {
      toast({ title: "File too large", description: "Maximum file size is 5MB.", variant: "destructive" });
      return;
    }
    if (!allowed.includes(f.type) && !f.name.endsWith(".txt") && !f.name.endsWith(".docx") && !f.name.endsWith(".pdf")) {
      toast({ title: "Invalid file type", description: "Please upload a PDF, DOCX, or TXT file.", variant: "destructive" });
      return;
    }

    setFile(f);

    if (f.type === "text/plain" || f.name.endsWith(".txt")) {
      const text = await f.text();
      setResumeText(text);
    } else {
      // For PDF/DOCX, we'll send to the edge function for parsing
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1];
        setResumeText(`__BASE64__${f.name}__${base64}`);
      };
      reader.readAsDataURL(f);
    }
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const handleSubmit = () => {
    if (!resumeText) {
      toast({ title: "No resume", description: "Please upload a resume file first.", variant: "destructive" });
      return;
    }
    onAnalyze(resumeText, jobDescription);
  };

  return (
    <section ref={ref} className="py-16">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Upload Your Resume</h2>
            <p className="text-muted-foreground mt-2">Upload your resume and optionally paste a job description for matching</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Upload area */}
            <div
              className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-colors cursor-pointer ${
                dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <input
                id="file-input"
                type="file"
                accept=".pdf,.docx,.txt"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />

              <AnimatePresence mode="wait">
                {file ? (
                  <motion.div key="file" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); setFile(null); setResumeText(""); }}
                    >
                      <X className="h-3 w-3 mr-1" /> Remove
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium">Drop your resume here</p>
                    <p className="text-sm text-muted-foreground">PDF, DOCX, or TXT (max 5MB)</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Job Description */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Job Description (optional)</label>
              <Textarea
                placeholder="Paste the job description here for keyword matching..."
                className="min-h-[180px] resize-none"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Paste a job description to get match percentage and missing keywords</p>
            </div>
          </div>

          <div className="text-center pt-2">
            <Button size="lg" className="font-semibold px-12" onClick={handleSubmit} disabled={isLoading || !resumeText}>
              {isLoading ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing...</>
              ) : (
                "Analyze Resume"
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

UploadZone.displayName = "UploadZone";
export default UploadZone;
