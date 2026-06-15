import React from "react";

export default function Skills() {
  const categories = [
    {
      icon: "Aa",
      title: "Languages",
      skills: ["C", "C++", "Python (Basic)"],
    },
    {
      icon: "</>",
      title: "Web",
      skills: ["HTML", "CSS", "JavaScript"],
    },
    {
      icon: "∑",
      title: "AI & Data",
      skills: ["Machine Learning", "Artificial Intelligence", "Data Analysis", "Power BI"],
    },
    {
      icon: "✦",
      title: "Tools",
      skills: ["Canva", "Figma", "Android Studio", "GitHub · VS Code"],
    },
    {
      icon: "⟡",
      title: "Soft Skills",
      skills: ["Adaptability", "Teamwork", "Quick Learning"],
    },
  ];

  return (
    <section id="skills">
      <div className="section-head reveal reveal-up">
        <span className="section-num">02</span>
        <h2 className="section-title">Skills &amp; <em>toolkit</em></h2>
        <div className="section-line"></div>
      </div>

      <div className="skills-grid reveal reveal-scale">
        {categories.map((category, index) => (
          <div key={index} className="skill-card">
            <span className="skill-icon">{category.icon}</span>
            <h3>{category.title}</h3>
            <ul>
              {category.skills.map((skill, sIndex) => (
                <li key={sIndex}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
