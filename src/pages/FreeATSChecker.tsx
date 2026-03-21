import Index from "./Index";

export default function FreeATSChecker() {
  return (
    <div>
      {/* Main website UI */}
      <Index />

      {/* SEO Content */}
      <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
        <h1>Free ATS Resume Checker</h1>

        <p>
          Use our free ATS resume checker to analyze your resume and get an
          instant ATS score. Improve your chances of getting shortlisted.
        </p>

        <h2>What is ATS?</h2>
        <p>
          ATS (Applicant Tracking System) helps companies filter resumes. A low
          ATS score can lead to rejection.
        </p>

        <h2>How to improve ATS score?</h2>
        <ul>
          <li>Add relevant keywords</li>
          <li>Use proper formatting</li>
          <li>Include skills and experience</li>
        </ul>
      </div>
    </div>
  );
}