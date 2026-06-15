import React from "react";
import Image from "next/image";

export default function Projects() {
  const projects = [
    {
      index: "01",
      title: "AI-Based Skin Disease Detection System",
      desc: "An AI-powered system that detects and classifies skin diseases from images using machine learning and deep learning. Covers image processing, feature extraction, model training and testing, with a simple interface for predictions.",
      tags: ["Machine Learning", "Deep Learning", "Image Processing", "Python"],
      image: "/images/skin_disease.png",
      status: "completed",
    },
    {
      index: "02",
      title: "Groundwater Stewardship",
      desc: "An ML-based system for groundwater monitoring and prediction, paired with interactive dashboards for data visualization — built to support more sustainable water management decisions.",
      tags: ["Machine Learning", "Data Visualization", "Dashboards", "Sustainability"],
      image: "/images/groundwater.png",
      status: "completed",
    },
    {
      index: "03",
      title: "Project in Progress",
      desc: "An advanced machine learning system currently in training. Detailed case study, predictive algorithms, and source code repository revealing soon.",
      tags: ["Deep Learning", "Python"],
      image: "/images/crop_yield.png",
      status: "in-progress",
    },
    {
      index: "04",
      title: "Project in Progress",
      desc: "A computer vision and real-time object tracking system currently under active development. Architecture breakdown and dashboard revealing soon.",
      tags: ["Computer Vision", "Real-Time"],
      image: "/images/smart_parking.png",
      status: "in-progress",
    },
  ];

  return (
    <section id="projects">
      <div className="section-head reveal reveal-up">
        <span className="section-num">04</span>
        <h2 className="section-title">Selected <em>projects</em></h2>
        <div className="section-line"></div>
      </div>

      <div className="projects-grid">
        {projects.map((proj, idx) => (
          <div key={idx} className="project-card reveal reveal-up">
            <div className="project-img-wrapper">
              <Image
                src={proj.image}
                alt={proj.title}
                width={450}
                height={280}
                className={proj.status === "in-progress" ? "blur-img" : ""}
                style={{ width: "100%", height: "100%", display: "block" }}
              />
              <span className={`status-badge ${proj.status}`}>
                {proj.status === "completed" ? "Completed" : "In Progress"}
              </span>
              {proj.status === "in-progress" && (
                <div className="coming-soon-overlay">
                  <span>Revealing Soon</span>
                </div>
              )}
            </div>
            <div className="project-info">
              <div className="project-header-row">
                <div className="project-index">{proj.index}</div>
                <h3 className="project-title">{proj.title}</h3>
              </div>
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
