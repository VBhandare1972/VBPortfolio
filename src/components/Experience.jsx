import React from "react";

export default function Experience() {
  const experiences = [
    {
      period: "Feb 2026 — Apr 2026",
      role: "AIML Intern",
      org: "Infosys Springboard",
      bullets: [
        "Worked on AI and Machine Learning projects.",
        "Applied ML concepts to solve real-world problems.",
      ],
    },
    {
      period: "Jan 2026 — Feb 2026",
      role: "AIML & Data Analytics Intern",
      org: "Techokraft Solutions",
      bullets: [
        "Worked on AI/ML and Data Analytics projects.",
        "Gained experience in data processing, Power BI, and data analysis.",
      ],
    },
    {
      period: "June 2023 — July 2023",
      role: "Intern",
      org: "Emerging Technologies",
      bullets: [
        "Worked on projects using C#.",
        "Improved programming and problem-solving skills through hands-on project work.",
      ],
    },
  ];

  return (
    <section id="experience">
      <div className="section-head reveal">
        <span className="section-num">03</span>
        <h2 className="section-title">Where I&apos;ve <em>worked</em></h2>
        <div className="section-line"></div>
      </div>

      <div className="timeline reveal">
        {experiences.map((exp, index) => (
          <div key={index} className="tl-item">
            <div className="tl-dot"></div>
            <span className="tl-period">{exp.period}</span>
            <div className="tl-role">{exp.role}</div>
            <div className="tl-org">{exp.org}</div>
            <ul>
              {exp.bullets.map((bullet, bIndex) => (
                <li key={bIndex}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
