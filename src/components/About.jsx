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
            
          </div>
        </div>

        <div className="about-text reveal reveal-right">
          <p>
            I am currently pursuing a B.E. in Artificial Intelligence and Data Science at Pune Vidyarthi Griha's College of Engineering, Nashik, and hold a Diploma in Artificial Intelligence and Machine Learning from K.K. Wagh Polytechnic, where I graduated with 75.89%.</p>
          <p>
            Through internships at Infosys Springboard, Techokraft Solutions, and Emerging Technologies, I have gained hands-on experience in Machine Learning, Data Analytics, Power BI, and software development. </p>
            
            <p> These experiences have strengthened my technical skills and provided exposure to solving real-world challenges using technology.</p>
          <p>Beyond coding, I enjoy designing intuitive user experiences and visual content using Figma and Canva. I am passionate about continuous learning, exploring emerging technologies, and developing innovative solutions that address real-world challenges.</p>
          
        </div>
      </div>
    </section>
  );
}
