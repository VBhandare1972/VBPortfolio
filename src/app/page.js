"use client";

import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Page() {
  const glowRef = useRef(null);

  // Manage cinematic intro transition class on document body
  useEffect(() => {
    document.body.classList.add("intro");
    const timer = setTimeout(() => {
      document.body.classList.remove("intro");
    }, 1800);

    return () => {
      document.body.classList.remove("intro");
      clearTimeout(timer);
    };
  }, []);

  // Performance-optimized GPU-accelerated cursor glow tracker
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let reqId = null;

    const handleMouseMove = (e) => {
      if (!reqId) {
        reqId = requestAnimationFrame(() => {
          // Centering the 420px glow (translating by cursor x - width/2, cursor y - height/2)
          glow.style.transform = `translate3d(${e.clientX - 210}px, ${e.clientY - 210}px, 0)`;
          reqId = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (reqId) cancelAnimationFrame(reqId);
    };
  }, []);

  // IntersectionObserver to reveal sections as they scroll into view
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach((r) => io.observe(r));

    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <>
      {/* Cinematic Overlays */}
      <div className="grain"></div>
      <div className="vignette"></div>

      {/* Intro title text flicker */}
      <div className="intro-title">
        <span>A PORTFOLIO IN ONE TAKE</span>
        <h2>Nashik, present day.</h2>
      </div>

      {/* Cursor glow */}
      <div id="glow" ref={glowRef}></div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </>
  );
}
