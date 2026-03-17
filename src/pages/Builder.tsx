import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Download, Eye } from "lucide-react";
import { motion } from "framer-motion";

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  summary: string;
  experience: { title: string; company: string; duration: string; bullets: string }[];
  education: { degree: string; school: string; year: string }[];
  skills: string;
}

const empty: ResumeData = {
  name: "", email: "", phone: "", summary: "",
  experience: [{ title: "", company: "", duration: "", bullets: "" }],
  education: [{ degree: "", school: "", year: "" }],
  skills: "",
};

export default function Builder() {
  const [data, setData] = useState<ResumeData>(empty);
  const [showPreview, setShowPreview] = useState(false);

  const update = <K extends keyof ResumeData>(key: K, val: ResumeData[K]) =>
    setData((prev) => ({ ...prev, [key]: val }));

  const addExp = () => update("experience", [...data.experience, { title: "", company: "", duration: "", bullets: "" }]);
  const removeExp = (i: number) => update("experience", data.experience.filter((_, idx) => idx !== i));

  const addEdu = () => update("education", [...data.education, { degree: "", school: "", year: "" }]);
  const removeEdu = (i: number) => update("education", data.education.filter((_, idx) => idx !== i));

  const handlePrint = () => {
    setShowPreview(true);
    setTimeout(() => window.print(), 300);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8 flex-1">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Resume Builder</h1>
          <p className="text-muted-foreground mt-2">Build an ATS-friendly resume in minutes</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div className="space-y-6 print:hidden">
            <Card>
              <CardHeader><CardTitle className="text-base">Personal Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><Label>Full Name</Label><Input value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="John Doe" /></div>
                  <div><Label>Email</Label><Input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="john@example.com" /></div>
                </div>
                <div><Label>Phone</Label><Input value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+1 234 567 890" /></div>
                <div><Label>Professional Summary</Label><Textarea value={data.summary} onChange={(e) => update("summary", e.target.value)} placeholder="A brief summary of your professional background..." rows={3} /></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Experience</CardTitle>
                <Button variant="outline" size="sm" onClick={addExp}><Plus className="h-3 w-3 mr-1" />Add</Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {data.experience.map((exp, i) => (
                  <div key={i} className="space-y-3 relative">
                    {data.experience.length > 1 && (
                      <Button variant="ghost" size="icon" className="absolute -top-1 -right-1 h-7 w-7" onClick={() => removeExp(i)}><Trash2 className="h-3 w-3" /></Button>
                    )}
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div><Label>Job Title</Label><Input value={exp.title} onChange={(e) => { const n = [...data.experience]; n[i] = { ...n[i], title: e.target.value }; update("experience", n); }} /></div>
                      <div><Label>Company</Label><Input value={exp.company} onChange={(e) => { const n = [...data.experience]; n[i] = { ...n[i], company: e.target.value }; update("experience", n); }} /></div>
                    </div>
                    <div><Label>Duration</Label><Input value={exp.duration} onChange={(e) => { const n = [...data.experience]; n[i] = { ...n[i], duration: e.target.value }; update("experience", n); }} placeholder="Jan 2020 – Present" /></div>
                    <div><Label>Bullet Points</Label><Textarea value={exp.bullets} onChange={(e) => { const n = [...data.experience]; n[i] = { ...n[i], bullets: e.target.value }; update("experience", n); }} placeholder="One achievement per line" rows={3} /></div>
                    {i < data.experience.length - 1 && <hr />}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Education</CardTitle>
                <Button variant="outline" size="sm" onClick={addEdu}><Plus className="h-3 w-3 mr-1" />Add</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.education.map((edu, i) => (
                  <div key={i} className="space-y-3 relative">
                    {data.education.length > 1 && (
                      <Button variant="ghost" size="icon" className="absolute -top-1 -right-1 h-7 w-7" onClick={() => removeEdu(i)}><Trash2 className="h-3 w-3" /></Button>
                    )}
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div><Label>Degree</Label><Input value={edu.degree} onChange={(e) => { const n = [...data.education]; n[i] = { ...n[i], degree: e.target.value }; update("education", n); }} /></div>
                      <div><Label>School</Label><Input value={edu.school} onChange={(e) => { const n = [...data.education]; n[i] = { ...n[i], school: e.target.value }; update("education", n); }} /></div>
                      <div><Label>Year</Label><Input value={edu.year} onChange={(e) => { const n = [...data.education]; n[i] = { ...n[i], year: e.target.value }; update("education", n); }} placeholder="2024" /></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-base">Skills</CardTitle></CardHeader>
              <CardContent>
                <Textarea value={data.skills} onChange={(e) => update("skills", e.target.value)} placeholder="JavaScript, React, Python, Project Management..." rows={3} />
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button onClick={() => setShowPreview(!showPreview)} variant="outline" className="gap-2">
                <Eye className="h-4 w-4" /> {showPreview ? "Hide" : "Show"} Preview
              </Button>
              <Button onClick={handlePrint} className="gap-2">
                <Download className="h-4 w-4" /> Export PDF
              </Button>
            </div>
          </div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showPreview ? 1 : 0.3 }}
            className="sticky top-20"
          >
            <Card className="print:shadow-none print:border-none">
              <CardContent className="p-8 text-sm" id="resume-preview">
                <h2 className="text-xl font-bold text-center">{data.name || "Your Name"}</h2>
                <p className="text-center text-muted-foreground text-xs mt-1">
                  {[data.email, data.phone].filter(Boolean).join(" • ")}
                </p>

                {data.summary && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-xs uppercase tracking-wider border-b pb-1 mb-2">Summary</h3>
                    <p className="text-xs text-muted-foreground">{data.summary}</p>
                  </div>
                )}

                {data.experience.some((e) => e.title) && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-xs uppercase tracking-wider border-b pb-1 mb-2">Experience</h3>
                    {data.experience.filter((e) => e.title).map((exp, i) => (
                      <div key={i} className="mb-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-xs">{exp.title}</span>
                          <span className="text-xs text-muted-foreground">{exp.duration}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{exp.company}</p>
                        {exp.bullets && (
                          <ul className="list-disc pl-4 mt-1 space-y-0.5">
                            {exp.bullets.split("\n").filter(Boolean).map((b, j) => (
                              <li key={j} className="text-xs text-muted-foreground">{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {data.education.some((e) => e.degree) && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-xs uppercase tracking-wider border-b pb-1 mb-2">Education</h3>
                    {data.education.filter((e) => e.degree).map((edu, i) => (
                      <div key={i} className="flex justify-between mb-1">
                        <span className="text-xs"><span className="font-medium">{edu.degree}</span> — {edu.school}</span>
                        <span className="text-xs text-muted-foreground">{edu.year}</span>
                      </div>
                    ))}
                  </div>
                )}

                {data.skills && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-xs uppercase tracking-wider border-b pb-1 mb-2">Skills</h3>
                    <p className="text-xs text-muted-foreground">{data.skills}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
