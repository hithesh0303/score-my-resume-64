import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What is an ATS?", a: "An Applicant Tracking System (ATS) is software used by employers to filter and rank resumes before a human reviews them. Over 90% of Fortune 500 companies use ATS systems." },
  { q: "How does ATS scoring work?", a: "Our AI analyzes your resume across 5 categories: keyword matching (30%), resume structure (20%), formatting (15%), skills analysis (20%), and experience quality (15%). Each category contributes to your overall ATS score." },
  { q: "What file formats are supported?", a: "We support PDF, DOCX, and TXT files up to 5MB in size." },
  { q: "Is my resume data secure?", a: "Yes. Your resume is processed in real-time and is not permanently stored. We do not share your data with third parties." },
  { q: "How can I improve my ATS score?", a: "Use keywords from the job description, follow a clean single-column format, avoid graphics and tables, use standard section headings, and include quantifiable achievements." },
  { q: "Is this tool free?", a: "Yes! ATSChecker is completely free to use with unlimited resume checks." },
];

export default function FAQ() {
  return (
    <section className="py-16 bg-card">
      <div className="container max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold md:text-3xl">Frequently Asked Questions</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
