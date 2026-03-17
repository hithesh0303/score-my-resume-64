import { motion } from "framer-motion";

const steps = [
  { num: "1", title: "Upload Resume", desc: "Upload your resume in PDF, DOCX, or TXT format." },
  { num: "2", title: "AI Analysis", desc: "Our AI parses and scores your resume against ATS criteria." },
  { num: "3", title: "Get Results", desc: "View your score, missing keywords, and improvement suggestions." },
  { num: "4", title: "Optimize", desc: "Apply suggestions and re-check until your score is 90+." },
];

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold md:text-3xl">How ATS Checking Works</h2>
          <p className="text-muted-foreground mt-2">Simple 4-step process to optimize your resume</p>
        </div>
        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold mb-4">
                {s.num}
              </div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
