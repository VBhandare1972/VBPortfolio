import React from "react";
import Image from "next/image";

export default function About() {
  return (
    <section id="about">
      <div className="section-head reveal reveal-up">
        <span className="section-num">01</span>
        <h2 className="section-title">About <em>me</em></h2>
        <div className="section-line"></div>
      </div>

      <div className="about-grid">
        <div className="reveal reveal-left">
          <div className="portrait-frame">
            <Image
              src="/images/portrait.jpeg"
              alt="Vaishnavi K. Bhandare"
              width={400}
              height={500}
              style={{ width: "100%", height: "auto", display: "block" }}
              priority
            />
          </div>
          <div className="portrait-caption">
            <span>Vaishnavi K. Bhandare</span>
            <span>Nashik, MH</span>
          </div>
        </div>

        <div className="about-text reveal reveal-right">
          <p>
            Currently pursuing a <strong>B.E. in Artificial Intelligence and Data Science</strong> at Pune Vidyarthi Griha&apos;s College of Engineering, Nashik — with a foundation built on a <strong>Diploma in AI &amp; Machine Learning</strong> from K.K. Wagh Polytechnic, where she graduated with 75.89%.
          </p>
          <p>
            Across three internships — at <strong>Infosys Springboard</strong>, <strong>Techokraft Solutions</strong>, and <strong>Emerging Technologies</strong> — she&apos;s applied machine learning to real problems, worked hands-on with Power BI and data analysis, and sharpened her programming fundamentals in C# and Python.
          </p>
          <p>
            She&apos;s drawn to projects that sit at the intersection of <strong>AI and impact</strong>: detecting skin disease from images, and building dashboards to support sustainable groundwater management. Outside of code, she enjoys translating ideas into interfaces — sketching in Figma and building in Android Studio.
          </p>
          <div className="lang-row">
            <span className="lang-chip">Python</span>
            <span className="lang-chip">C / C++</span>
            <span className="lang-chip">HTML · CSS · JS</span>
            <span className="lang-chip">Machine Learning</span>
            <span className="lang-chip">Power BI</span>
            <span className="lang-chip">Android Development</span>
          </div>
        </div>
      </div>
    </section>
  );
}
