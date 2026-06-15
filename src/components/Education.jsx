import React from "react";

export default function Education() {
  const academics = [
    {
      degree: "B.E. Artificial Intelligence and Data Science",
      school: "Pune Vidyarthi Griha's College of Engineering, Nashik",
      meta: "SE CGPA — 8.41",
    },
    {
      degree: "Diploma — Artificial Intelligence and Machine Learning",
      school: "K.K. Wagh Polytechnic, Nashik, Maharashtra · 2021–2024",
      meta: "Percentage — 75.89%",
    },
    {
      degree: "Secondary School",
      school: "Maratha Highschool, Nashik",
      meta: "Percentage — 83.40%",
    },
  ];

  const certifications = [
    "Smart India Hackathon — Participation",
    "24-Hour Hackathon — Participation",
    "Infosys Virtual Internship 6.0",
    "GDG Hackathon",
    "Talent Battle Code Training",
    "Zensar Basic Developer Training",
  ];

  return (
    <section id="education">
      <div className="section-head reveal reveal-up">
        <span className="section-num">05</span>
        <h2 className="section-title">Education &amp; <em>certificates</em></h2>
        <div className="section-line"></div>
      </div>

      <div className="edu-grid">
        <div className="reveal reveal-left">
          <div className="subhead">Academic Background</div>
          {academics.map((academic, index) => (
            <div
              key={index}
              className="edu-item"
              style={index === academics.length - 1 ? { borderBottom: "none" } : {}}
            >
              <div className="edu-degree">{academic.degree}</div>
              <div className="edu-school">{academic.school}</div>
              <div className="edu-meta">{academic.meta}</div>
            </div>
          ))}
        </div>

        <div className="reveal reveal-right">
          <div className="subhead">Certifications &amp; Participation</div>
          <ul className="cert-list">
            {certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
