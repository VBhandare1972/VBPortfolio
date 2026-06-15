"use client";

import React, { useEffect, useState, useRef } from "react";

export default function GlowInsects({ active }) {
  const [insects, setInsects] = useState([]);
  const containerRef = useRef(null);
  const insectRefs = useRef([]);

  useEffect(() => {
    if (!active) {
      setInsects([]);
      return;
    }

    // Initialize exactly 6 insects for optimal performance and ambiance
    const temp = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      size: Math.random() * 3.5 + 4,
      glowSize: Math.random() * 8 + 8,
      pulseSpeed: 1 + Math.random() * 2,
    }));

    setInsects(temp);
  }, [active]);

  useEffect(() => {
    if (!active || insects.length === 0) return;

    let animationFrameId;
    const list = [...insects];

    const update = () => {
      list.forEach((ins) => {
        // Organic random walk steering forces
        ins.vx += (Math.random() - 0.5) * 0.15;
        ins.vy += (Math.random() - 0.5) * 0.15;

        // Velocity speed cap
        const speed = Math.sqrt(ins.vx * ins.vx + ins.vy * ins.vy);
        if (speed > 1.8) {
          ins.vx = (ins.vx / speed) * 1.8;
          ins.vy = (ins.vy / speed) * 1.8;
        }

        ins.x += ins.vx;
        ins.y += ins.vy;

        // Wrap around boundaries
        const margin = 50;
        if (ins.x < -margin) ins.x = window.innerWidth + margin;
        if (ins.x > window.innerWidth + margin) ins.x = -margin;
        if (ins.y < -margin) ins.y = window.innerHeight + margin;
        if (ins.y > window.innerHeight + margin) ins.y = -margin;
      });

      // Update positions directly on DOM elements for 60fps GPU performance (no querySelectorAll)
      const elements = insectRefs.current;
      if (elements && elements.length === list.length) {
        elements.forEach((el, index) => {
          if (!el) return;
          const ins = list[index];
          el.style.transform = `translate3d(${ins.x}px, ${ins.y}px, 0)`;
          
          // Organic sine pulse opacity
          const pulse = 0.35 + Math.sin(Date.now() * 0.001 * ins.pulseSpeed) * 0.45;
          el.style.opacity = pulse.toFixed(2);
        });
      }

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, insects]);

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 999,
        overflow: "hidden",
      }}
    >
      {insects.map((ins, index) => (
        <div
          key={ins.id}
          ref={(el) => {
            insectRefs.current[index] = el;
          }}
          className="glow-insect"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${ins.size}px`,
            height: `${ins.size}px`,
            borderRadius: "50%",
            background: "#d9f99d", // warm yellowish-green lime color
            boxShadow: `0 0 ${ins.glowSize}px ${ins.glowSize / 2}px rgba(163, 230, 53, 0.7), 0 0 ${ins.glowSize * 2}px ${ins.glowSize}px rgba(163, 230, 53, 0.35)`,
            willChange: "transform, opacity",
            transition: "opacity 0.2s ease",
          }}
        />
      ))}
    </div>
  );
}
