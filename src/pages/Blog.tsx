import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const posts = [
  { slug: "free-ats-resume-checker", title: "Free ATS Resume Checker: Optimize Your Resume in 2024", excerpt: "Learn how to use our free ATS resume checker to improve your resume score and land more interviews." },
  { slug: "how-to-pass-ats", title: "How to Pass ATS: The Complete Guide", excerpt: "A comprehensive guide to understanding how ATS systems work and how to optimize your resume to pass them." },
  { slug: "ats-resume-template", title: "Best ATS Resume Templates That Actually Work", excerpt: "Download proven ATS-friendly resume templates designed to pass automated screening systems." },
  { slug: "resume-keywords", title: "Resume Keywords: The Ultimate Guide", excerpt: "Learn which keywords to include in your resume for different industries and job roles." },
];

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-12 flex-1">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">ATS & Resume Resources</h1>
          <p className="text-muted-foreground mt-2">Expert guides to help you beat the ATS and land your dream job</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {posts.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                <CardHeader>
                  <CardTitle className="text-base group-hover:text-primary transition-colors">{p.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{p.excerpt}</p>
                  <span className="text-sm font-medium text-primary flex items-center gap-1">
                    Read more <ArrowRight className="h-3 w-3" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
