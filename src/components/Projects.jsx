import React from "react";

export default function Projects() {
  const projects = [
    {
      index: "01",
      title: "AI-Based Skin Disease Detection System",
      desc: "An AI-powered system that detects and classifies skin diseases from images using machine learning and deep learning. Covers image processing, feature extraction, model training and testing, with a simple interface for predictions.",
      tags: ["Machine Learning", "Deep Learning", "Image Processing", "Python"],
    },
    {
      index: "02",
      title: "Groundwater Stewardship",
      desc: "An ML-based system for groundwater monitoring and prediction, paired with interactive dashboards for data visualization — built to support more sustainable water management decisions.",
      tags: ["Machine Learning", "Data Visualization", "Dashboards", "Sustainability"],
    },
  ];

  return (
    <section id="projects">
      <div className="section-head reveal">
        <span className="section-num">04</span>
        <h2 className="section-title">Selected <em>projects</em></h2>
        <div className="section-line"></div>
      </div>

      <div className="projects-list reveal">
        {projects.map((proj, idx) => (
          <div key={idx} className="project-row">
            <div className="project-index">{proj.index}</div>
            <div className="project-title">{proj.title}</div>
            <div>
              <p className="project-desc">{proj.desc}</p>
              <div className="project-tags">
                {proj.tags.map((tag, tIdx) => (
                  <span key={tIdx}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
