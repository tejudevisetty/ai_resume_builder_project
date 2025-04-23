// ATSCheckForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

export function ATSChecker(){
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/ats-check", {
        resumeText,
        jobDescription
      });
      setFeedback(response.data.atsFeedback);
    } catch (error) {
      console.error("ATS check error:", error);
      setFeedback("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>ATS Resume Checker</h2>
      <textarea
        rows={10}
        placeholder="Paste your resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <textarea
        rows={10}
        placeholder="Paste the job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button onClick={handleCheck} disabled={loading}>
        {loading ? "Checking..." : "Run ATS Check"}
      </button>

      {feedback && (
        <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
          <h3>ATS Feedback:</h3>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

