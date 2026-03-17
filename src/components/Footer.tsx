import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold text-lg mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <FileText className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span>ATSChecker</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered ATS resume checker. Optimize your resume and land more interviews.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">ATS Checker</Link></li>
              <li><Link to="/builder" className="hover:text-foreground transition-colors">Resume Builder</Link></li>
              <li><Link to="/templates" className="hover:text-foreground transition-colors">Templates</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/blog/how-to-pass-ats" className="hover:text-foreground transition-colors">How to Pass ATS</Link></li>
              <li><Link to="/blog/resume-keywords" className="hover:text-foreground transition-colors">Resume Keywords</Link></li>
              <li><Link to="/blog/ats-resume-template" className="hover:text-foreground transition-colors">ATS Resume Template</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span>atschecker.in</span></li>
              <li><span>support@atschecker.in</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ATSChecker. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
