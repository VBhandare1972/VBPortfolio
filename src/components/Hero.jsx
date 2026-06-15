"use client";

import React, { useEffect, useRef, useState } from "react";

export default function Hero({ toggleNightMode }) {
  const farRef = useRef(null);
  const midRef = useRef(null);
  const nearRef = useRef(null);
  const moonRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const cueRef = useRef(null);

  const [stars, setStars] = useState([]);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate stars and particles on the client side asynchronously to prevent cascading renders
    const timer = setTimeout(() => {
      const tempStars = [];
      for (let i = 0; i < 60; i++) {
        tempStars.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 70,
          delay: Math.random() * 4,
          size: Math.random() * 2 + 1,
        });
      }
      setStars(tempStars);

      // Generate particles (floating fireflies/lights)
      const tempParticles = [];
      for (let i = 0; i < 22; i++) {
        tempParticles.push({
          id: i,
          left: Math.random() * 100,
          top: 40 + Math.random() * 55,
          opacity: (Math.random() * 0.5 + 0.2).toFixed(2),
          size: Math.random() * 3 + 1,
          duration: 10 + Math.random() * 14,
          delay: Math.random() * -20,
          driftX: Math.random() * 40 - 20,
        });
      }
      setParticles(tempParticles);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let mx = 0;
    let my = 0;
    let scrollZoom = 0;
    let reqId = null;

    const updateTransforms = () => {
      const far = farRef.current;
      const mid = midRef.current;
      const near = nearRef.current;
      const moon = moonRef.current;
      const content = contentRef.current;
      const cue = cueRef.current;

      const fz = 1 + scrollZoom * 0.15;
      const mz = 1 + scrollZoom * 0.35;
      const nz = 1 + scrollZoom * 0.6;
      const fade = Math.max(0, 1 - scrollZoom);

      if (far) {
        far.style.transform = `translate3d(${mx * -20}px, ${my * -8 - scrollZoom * 40}px, 0) scale(${fz})`;
        far.style.opacity = fade;
      }
      if (mid) {
        mid.style.transform = `translate3d(${mx * -45}px, ${my * -14 - scrollZoom * 90}px, 0) scale(${mz})`;
        mid.style.opacity = fade;
      }
      if (near) {
        near.style.transform = `translate3d(${mx * -80}px, ${my * -22 - scrollZoom * 160}px, 0) scale(${nz})`;
        near.style.opacity = fade;
      }
      if (moon) {
        moon.style.transform = `translate3d(${mx * 30}px, ${my * 18 + scrollZoom * 60}px, 0) scale(${Math.max(0.1, 1 - scrollZoom * 0.4)})`;
        moon.style.opacity = fade;
      }
      if (content) {
        content.style.opacity = fade;
        content.style.transform = `translate3d(0, ${-scrollZoom * 60}px, 0)`;
      }
      if (cue) {
        cue.style.opacity = fade;
      }
    };

    const handleMouseMove = (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      if (!reqId) {
        reqId = requestAnimationFrame(() => {
          updateTransforms();
          reqId = null;
        });
      }
    };

    const handleScroll = () => {
      const s = window.scrollY;
      const vh = window.innerHeight;
      scrollZoom = Math.min(s / vh, 1);
      if (!reqId) {
        reqId = requestAnimationFrame(() => {
          updateTransforms();
          reqId = null;
        });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener("mousemove", handleMouseMove, { passive: true });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });

    updateTransforms();

    return () => {
      if (hero) {
        hero.removeEventListener("mousemove", handleMouseMove);
      }
      window.removeEventListener("scroll", handleScroll);
      if (reqId) cancelAnimationFrame(reqId);
    };
  }, []);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="stars">
        {stars.map((s) => (
          <div
            key={s.id}
            className="star"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              animationDelay: `${s.delay}s`,
              width: `${s.size}px`,
              height: `${s.size}px`,
            }}
          />
        ))}
      </div>
      <div className="moon" ref={moonRef} onClick={toggleNightMode} />

      {/* Clouds */}
      <div className="cloud" style={{ top: "10%", width: "220px", height: "70px", animationDuration: "90s", animationDelay: "-10s" }}>
        <svg viewBox="0 0 220 70" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="45" rx="55" ry="25" fill="#ffffff" />
          <ellipse cx="120" cy="35" rx="70" ry="32" fill="#ffffff" />
          <ellipse cx="175" cy="48" rx="45" ry="20" fill="#ffffff" />
        </svg>
      </div>
      <div className="cloud" style={{ top: "22%", width: "160px", height: "55px", animationDuration: "70s", animationDelay: "-35s" }}>
        <svg viewBox="0 0 220 70" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="45" rx="55" ry="25" fill="#ffffff" />
          <ellipse cx="120" cy="35" rx="70" ry="32" fill="#ffffff" />
          <ellipse cx="175" cy="48" rx="45" ry="20" fill="#ffffff" />
        </svg>
      </div>
      <div className="cloud" style={{ top: "6%", left: "55%", width: "180px", height: "60px", animationDuration: "110s", animationDelay: "-60s" }}>
        <svg viewBox="0 0 220 70" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="45" rx="55" ry="25" fill="#ffffff" />
          <ellipse cx="120" cy="35" rx="70" ry="32" fill="#ffffff" />
          <ellipse cx="175" cy="48" rx="45" ry="20" fill="#ffffff" />
        </svg>
      </div>

      {/* Birds */}
      <div className="bird" style={{ top: "18%", width: "30px", height: "14px", animationDuration: "22s", animationDelay: "0s" }}>
        <svg viewBox="0 0 30 14" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,7 C6,1 9,1 15,7 C21,1 24,1 30,7" stroke="#5a4f42" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      <div className="bird" style={{ top: "26%", width: "22px", height: "11px", animationDuration: "28s", animationDelay: "-9s" }}>
        <svg viewBox="0 0 30 14" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,7 C6,1 9,1 15,7 C21,1 24,1 30,7" stroke="#5a4f42" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      <div className="bird" style={{ top: "15%", width: "18px", height: "9px", animationDuration: "34s", animationDelay: "-18s" }}>
        <svg viewBox="0 0 30 14" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,7 C6,1 9,1 15,7 C21,1 24,1 30,7" stroke="#5a4f42" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* Far skyline */}
      <div className="skyline-layer" id="layer-far" ref={farRef}>
        <svg viewBox="0 0 1600 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="180" width="120" height="220" fill="var(--skyline-1)" />
          <rect x="140" y="120" width="90" height="280" fill="var(--skyline-1)" />
          <rect x="250" y="200" width="160" height="200" fill="var(--skyline-1)" />
          <rect x="430" y="90" width="70" height="310" fill="var(--skyline-1)" />
          <rect x="520" y="160" width="130" height="240" fill="var(--skyline-1)" />
          <rect x="670" y="60" width="100" height="340" fill="var(--skyline-1)" />
          <rect x="790" y="170" width="150" height="230" fill="var(--skyline-1)" />
          <rect x="960" y="110" width="80" height="290" fill="var(--skyline-1)" />
          <rect x="1060" y="190" width="170" height="210" fill="var(--skyline-1)" />
          <rect x="1250" y="80" width="90" height="320" fill="var(--skyline-1)" />
          <rect x="1360" y="150" width="140" height="250" fill="var(--skyline-1)" />
          <rect x="1520" y="100" width="80" height="300" fill="var(--skyline-1)" />
        </svg>
      </div>

      {/* Mid skyline */}
      <div className="skyline-layer" id="layer-mid" ref={midRef}>
        <svg viewBox="0 0 1600 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <g fill="var(--skyline-2)">
            <rect x="-20" y="220" width="140" height="180" />
            <rect x="130" y="140" width="110" height="260" />
            <rect x="260" y="240" width="90" height="160" />
            <rect x="370" y="160" width="160" height="240" />
            <rect x="550" y="230" width="120" height="170" />
            <rect x="690" y="110" width="80" height="290" />
            <rect x="790" y="200" width="180" height="200" />
            <rect x="990" y="150" width="100" height="250" />
            <rect x="1110" y="240" width="140" height="160" />
            <rect x="1270" y="120" width="90" height="280" />
            <rect x="1380" y="210" width="160" height="190" />
            <rect x="1560" y="170" width="100" height="230" />
          </g>
          <g fill="#c75c2e" opacity="0.55" className="window-group mid-windows">
            <rect x="150" y="160" width="8" height="10" />
            <rect x="172" y="160" width="8" height="10" />
            <rect x="150" y="190" width="8" height="10" />
            <rect x="194" y="190" width="8" height="10" />
            <rect x="400" y="190" width="8" height="10" />
            <rect x="430" y="220" width="8" height="10" />
            <rect x="460" y="190" width="8" height="10" />
            <rect x="710" y="150" width="8" height="10" />
            <rect x="730" y="180" width="8" height="10" />
            <rect x="710" y="210" width="8" height="10" />
            <rect x="820" y="240" width="8" height="10" />
            <rect x="860" y="270" width="8" height="10" />
            <rect x="900" y="240" width="8" height="10" />
            <rect x="1010" y="190" width="8" height="10" />
            <rect x="1030" y="220" width="8" height="10" />
            <rect x="1290" y="160" width="8" height="10" />
            <rect x="1310" y="200" width="8" height="10" />
            <rect x="1410" y="250" width="8" height="10" />
            <rect x="1440" y="280" width="8" height="10" />
          </g>
        </svg>
      </div>

      {/* Near skyline */}
      <div className="skyline-layer" id="layer-near" ref={nearRef}>
        <svg viewBox="0 0 1600 420" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <g fill="var(--skyline-3)">
            <rect x="-30" y="260" width="200" height="160" />
            <rect x="180" y="180" width="130" height="240" />
            <rect x="320" y="280" width="160" height="140" />
            <rect x="490" y="210" width="100" height="210" />
            <rect x="600" y="290" width="220" height="130" />
            <rect x="830" y="190" width="120" height="230" />
            <rect x="960" y="270" width="180" height="150" />
            <rect x="1150" y="200" width="110" height="220" />
            <rect x="1270" y="280" width="200" height="140" />
            <rect x="1480" y="220" width="140" height="200" />
          </g>
          <g fill="#c75c2e" opacity="0.75" className="window-group near-windows">
            <rect x="210" y="220" width="10" height="14" />
            <rect x="240" y="220" width="10" height="14" />
            <rect x="210" y="260" width="10" height="14" />
            <rect x="270" y="260" width="10" height="14" />
            <rect x="520" y="250" width="10" height="14" />
            <rect x="550" y="290" width="10" height="14" />
            <rect x="860" y="230" width="10" height="14" />
            <rect x="890" y="270" width="10" height="14" />
            <rect x="920" y="230" width="10" height="14" />
            <rect x="1180" y="240" width="10" height="14" />
            <rect x="1210" y="280" width="10" height="14" />
            <rect x="1510" y="260" width="10" height="14" />
            <rect x="1540" y="300" width="10" height="14" />
          </g>
        </svg>
      </div>

      <div className="fog" />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `drift ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            "--drift-x": `${p.driftX}px`,
            "--drift-y": `-30px`,
          }}
        />
      ))}

      <div className="hero-content" ref={contentRef}>
        <div className="eyebrow">AI &amp; Data Science </div>
        <h1 className="title">
          Vaishnavi<br />
          <em>Kailas Bhandare</em>
        </h1>
        <p className="hero-sub">
          I'm Vaishnavi Kailas Bhandare, an Artificial Intelligence and Data Science student passionate about AI, Machine Learning, Data Analytics, and Software Development. With internship experience and hands-on project work, I enjoy building innovative solutions and continuously expanding my technical skills.</p>
        <div className="hero-cta">
          <a href="#projects" className="btn">View Projects</a>
          <a href="#contact" className="btn ghost">Get in Touch</a>
        </div>
      </div>

      <div className="scroll-cue" ref={cueRef}>
        <span>Scroll</span>
        <span className="line" />
        <span>Nashik, India</span>
      </div>
    </section>
  );
}
