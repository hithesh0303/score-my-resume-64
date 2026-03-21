export default function FreeATSChecker() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Free ATS Resume Checker</h1>

      <p>
        Check your resume ATS score instantly using our free ATS checker tool.
        Improve your chances of getting shortlisted for jobs.
      </p>

      <a href="/">
        <button style={{ padding: "10px", marginTop: "10px" }}>
          Check My Resume
        </button>
      </a>

      <h2>What is ATS?</h2>
      <p>
        ATS (Applicant Tracking System) is used by companies to filter resumes.
        If your resume is not optimized, it may get rejected automatically.
      </p>

      <h2>How to improve ATS score?</h2>
      <ul>
        <li>Add relevant keywords</li>
        <li>Use proper formatting</li>
        <li>Include skills and experience</li>
      </ul>
    </div>
  );
}