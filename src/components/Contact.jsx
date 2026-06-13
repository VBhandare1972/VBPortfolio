import React from "react";

export default function Contact() {
  return (
    <section id="contact">
      <div className="reveal">
        <div className="subhead" style={{ textAlign: "center" }}>
          Get in touch
        </div>
        <h2 className="contact-title">
          Let&apos;s build something<br />
          <em>worth shipping.</em>
        </h2>
        <div className="contact-links">
          <a href="mailto:vaishnavibhandare27@gmail.com">
            vaishnavibhandare27@gmail.com
          </a>
          <a href="tel:+917385882612">+91 73858 82612</a>
          <a
            href="https://www.linkedin.com/in/vaishnavibhandare-028263305"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <footer>
          © 2026 Vaishnavi Kailas Bhandare — Hirawadi, Panchavati, Nashik
        </footer>
      </div>
    </section>
  );
}
