import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const articles: Record<string, { title: string; description: string; content: string[] }> = {
  "free-ats-resume-checker": {
    title: "Free ATS Resume Checker: Optimize Your Resume in 2024",
    description: "Learn how to use our free ATS resume checker to improve your resume score and land more interviews.",
    content: [
      "An ATS (Applicant Tracking System) resume checker is a tool that analyzes your resume against the same criteria used by automated hiring software. Over 90% of large companies use ATS to filter resumes before a human ever sees them.",
      "Our free ATS checker scores your resume on keyword matching, formatting, structure, skills relevance, and experience quality. Each factor is weighted to reflect how real ATS systems prioritize content.",
      "To get the best results, upload your resume in PDF or DOCX format and paste the job description you're applying for. Our AI will compare your resume against the job requirements and highlight missing keywords.",
      "Key tips for improving your ATS score: Use standard section headings (Experience, Education, Skills), include relevant keywords naturally, avoid tables and graphics, use a single-column layout, and quantify achievements with numbers.",
      "After checking your score, use our AI suggestions to rewrite weak bullet points with strong action verbs and measurable results. Re-check your resume after each round of edits until you reach a score of 80+.",
    ],
  },
  "how-to-pass-ats": {
    title: "How to Pass ATS: The Complete Guide",
    description: "A comprehensive guide to understanding how ATS systems work and how to optimize your resume to pass them.",
    content: [
      "Applicant Tracking Systems parse your resume into structured data, extracting information like contact details, work history, education, and skills. They then rank candidates based on keyword matches with the job description.",
      "Common reasons resumes fail ATS: Using creative formats with columns or graphics, saving in incompatible formats, using non-standard section headings, missing critical keywords from the job description.",
      "Step 1: Mirror the job description. Identify the top 10-15 keywords and skills mentioned in the posting and naturally incorporate them into your resume.",
      "Step 2: Use a clean, single-column format. Avoid headers, footers, text boxes, tables, and images. Stick to standard fonts like Arial, Calibri, or Times New Roman.",
      "Step 3: Use standard section headings: Professional Summary, Work Experience, Education, Skills, Certifications. ATS systems are trained to recognize these specific headings.",
      "Step 4: Include both spelled-out terms and acronyms. For example, write 'Search Engine Optimization (SEO)' so the ATS catches both variations.",
      "Step 5: Quantify your achievements. Instead of 'Managed a team,' write 'Led a cross-functional team of 12, delivering projects 20% under budget.'",
    ],
  },
  "ats-resume-template": {
    title: "Best ATS Resume Templates That Actually Work",
    description: "Download proven ATS-friendly resume templates designed to pass automated screening systems.",
    content: [
      "The best ATS resume template is one that's simple, clean, and uses standard formatting that any ATS can parse correctly. Fancy designs might look good to humans but can confuse automated systems.",
      "Essential elements of an ATS-friendly template: Clear hierarchy with distinct sections, standard fonts (10-12pt), adequate white space, bullet points for achievements, and no graphics or icons.",
      "Our templates are designed by HR professionals and tested against the top 10 ATS systems including Taleo, Workday, Greenhouse, Lever, and iCIMS.",
      "Choose the right template based on your career stage: Entry-level candidates should lead with education and skills; mid-career professionals should highlight achievements; executives should focus on strategic impact.",
      "Visit our Templates page to download free ATS-friendly templates in multiple formats, or use our Resume Builder to create a custom ATS-optimized resume from scratch.",
    ],
  },
  "resume-keywords": {
    title: "Resume Keywords: The Ultimate Guide",
    description: "Learn which keywords to include in your resume for different industries and job roles.",
    content: [
      "Resume keywords are the specific words and phrases that ATS systems and recruiters look for when scanning your resume. They typically fall into categories: hard skills, soft skills, tools/technologies, certifications, and industry terms.",
      "How to find the right keywords: Analyze 3-5 similar job postings and identify recurring terms. Pay special attention to the 'Requirements' and 'Qualifications' sections.",
      "Hard skill keywords by industry: Tech (Python, AWS, Agile, CI/CD), Marketing (SEO, Google Analytics, Content Strategy), Finance (Financial Modeling, Bloomberg Terminal, Risk Assessment), Healthcare (HIPAA, EMR, Patient Care).",
      "Soft skill keywords that ATS systems look for: Leadership, Communication, Problem-solving, Team collaboration, Project management, Strategic planning.",
      "Keyword placement matters. Include the most important keywords in your summary, skills section, and the first bullet point of each role. Don't keyword-stuff—use them naturally in context.",
      "Use our ATS Checker with a job description to instantly see which keywords you're missing and get suggestions for natural integration.",
    ],
  },
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articles[slug] : null;

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-20 text-center flex-1">
          <h1 className="text-2xl font-bold">Article not found</h1>
          <Button asChild className="mt-4"><Link to="/blog">Back to Blog</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <article className="container py-12 max-w-3xl flex-1">
        <Link to="/blog">
          <Button variant="ghost" size="sm" className="mb-6 gap-2">
            <ArrowLeft className="h-3 w-3" /> Back to Blog
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <p className="text-muted-foreground mb-8 text-lg">{article.description}</p>
        <div className="space-y-4">
          {article.content.map((p, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
          ))}
        </div>
        <div className="mt-12 p-6 rounded-xl bg-primary/5 border text-center">
          <h3 className="font-semibold mb-2">Ready to check your resume?</h3>
          <p className="text-sm text-muted-foreground mb-4">Get your free ATS score in seconds.</p>
          <Button asChild><Link to="/">Check My Resume</Link></Button>
        </div>
      </article>
      <Footer />
    </div>
  );
}
