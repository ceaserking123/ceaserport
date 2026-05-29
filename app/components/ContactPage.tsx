"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const STRIP_IMAGES = [
  { src: "/SEEDS-02.png", caption: "Creative Direction" },
  { src: "/photo.png", caption: "UI Design" },
  { src: "/art1.png", caption: "Development" },
  { src: "/art2.png", caption: "Branding" },

];

type FormState = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const stripRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    newsletter: false,
  });
  const [status, setStatus] = useState<FormState>("idle");

  // ── slide images up on mount ──────────────────────────────────────────────
  useGSAP(() => {
    if (!stripRef.current) return;
    const cards = stripRef.current.querySelectorAll(".img-card");
    gsap.fromTo(
      cards,
      { yPercent: 60, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.14,
        delay: 0.2,
      }
    );
  }, []);

  // ── title fade ────────────────────────────────────────────────────────────
  useGSAP(() => {
    if (!titleRef.current) return;
    gsap.fromTo(
      titleRef.current,
      { yPercent: 30, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.05 }
    );
  }, []);

  // ── continuous slow scroll of strip ──────────────────────────────────────
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    let pos = 0;
    let raf: number;
    const step = () => {
      pos -= 0.4;
      const maxScroll = el.scrollHeight / 2;
      if (Math.abs(pos) >= maxScroll) pos = 0;
      el.style.transform = `translateY(${pos}px)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── form submit via Formspree-style mailto fallback ───────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mnjrvjbr", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          message: form.message,
          newsletter: form.newsletter,
          _replyto: form.email,
          _subject: `New message from ${form.firstName} ${form.lastName}`,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ firstName: "", lastName: "", email: "", message: "", newsletter: false });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full bg-transparent border-b border-white/20 pb-3 pt-1 text-white placeholder:text-white/30 text-sm outline-none focus:border-white/60 transition-colors duration-300";

  return (
    <section className="bg-blue-900 h-screen overflow-hidden w-full flex flex-col">
      {/* ── header ── */}
      <div className="px-8 pt-14 pb-6 border-b border-white/10">
        <h1
          ref={titleRef}
          className="text-white opacity-0"
          style={{
            fontSize: "clamp(2.6rem, 7vw, 6rem)",
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Get in touch
        </h1>
      </div>

      {/* ── body grid ── */}
      <div className="flex flex-1 border-b border-white/10" style={{ minHeight: 520 }}>

        {/* left — form ─────────────────────────────────────────────────────── */}
        <div
          className="flex-1 px-8 py-10 border-r border-white/10"
          style={{ maxWidth: "42%" }}
        >
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
            <input
              className={field}
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              required
            />
            <input
              className={field}
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              required
            />
            <input
              className={field}
              type="email"
              placeholder="E-mail"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <textarea
              className={`${field} resize-none`}
              placeholder="Message"
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />

            {/* newsletter */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <span
                onClick={() => setForm({ ...form, newsletter: !form.newsletter })}
                className="w-4 h-4 border border-white/40 flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                style={{ background: form.newsletter ? "#fff" : "transparent" }}
              >
                {form.newsletter && (
                  <svg viewBox="0 0 10 10" className="w-2.5 h-2.5">
                    <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#1e3a8a" strokeWidth="1.5" fill="none" />
                  </svg>
                )}
              </span>
              <span
                className="text-white/40 uppercase tracking-widest"
                style={{ fontSize: 10, fontFamily: "'Courier New', monospace" }}
              >
                I want to subscribe to the newsletter
              </span>
            </label>

            {/* send button */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex items-center gap-4 group w-fit mt-2"
            >
              <span
                className="text-white transition-opacity duration-300"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 400, letterSpacing: "-0.02em" }}
              >
                {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : "Send"}
              </span>
              <span
                className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white group-hover:bg-white group-hover:text-blue-900 transition-all duration-300"
                style={{ fontSize: 18 }}
              >
                →
              </span>
            </button>

            {status === "error" && (
              <p className="text-red-400 text-xs tracking-widest uppercase" style={{ fontFamily: "'Courier New', monospace" }}>
                Something went wrong. Try emailing directly.
              </p>
            )}
          </form>
        </div>

        {/* middle — info ───────────────────────────────────────────────────── */}
        <div
          className="px-10 py-10 border-r border-white/10 flex flex-col gap-10"
          style={{
            minWidth: 260,
            fontFamily: "'Courier New', monospace",
          }}
        >
          {/* socials */}
          <div>
            <p className="text-white/30 uppercase tracking-widest mb-4" style={{ fontSize: 10 }}>
              Socials
            </p>
            <div className="flex flex-col gap-3">
              {/* ── replace href values with your links ── */}
         
              <a
                href="https://www.linkedin.com/in/ceaser-eghwrudjakpor-535b94197/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white flex items-center gap-1.5 hover:text-white/60 transition-colors"
                style={{ fontSize: 15 }}
              >
                LinkedIn <span style={{ fontSize: 12 }}>↗</span>
              </a>
              <a
                href="https://wa.me/2348147367123"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white flex items-center gap-1.5 hover:text-white/60 transition-colors"
                style={{ fontSize: 15 }}
              >
                WhatsApp <span style={{ fontSize: 12 }}>↗</span>
              </a>
            </div>
          </div>

          {/* address */}
          <div>
            <p className="text-white/30 uppercase tracking-widest mb-4" style={{ fontSize: 10 }}>
              Location
            </p>
            <p className="text-white leading-relaxed" style={{ fontSize: 14 }}>
              Lagos, Nigeria
            </p>
          </div>

          {/* contact info */}
          <div>
            <p className="text-white/30 uppercase tracking-widest mb-4" style={{ fontSize: 10 }}>
              Informations
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:ceaserking123@gmail.com"
                className="text-white hover:text-white/60 transition-colors"
                style={{ fontSize: 14 }}
              >
                ceaserking123@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* right — sliding image strip ─────────────────────────────────────── */}
        <div
          className="flex-1 overflow-hidden relative"
          style={{ maxWidth: 320 }}
        >
          {/* fade masks top/bottom */}
          <div
            className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
            style={{ height: 80, background: "linear-gradient(to bottom, #1e3a8a, transparent)" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
            style={{ height: 80, background: "linear-gradient(to top, #1e3a8a, transparent)" }}
          />

          {/* duplicated for seamless loop */}
          <div ref={stripRef} className="flex flex-col gap-3 p-4 will-change-transform">
            {[...STRIP_IMAGES, ...STRIP_IMAGES].map((img, i) => (
              <div
                key={i}
                className="img-card opacity-0 relative overflow-hidden flex-shrink-0"
                style={{ aspectRatio: "4/3", background: "#1e40af" }}
              >
                {/* placeholder gradient — replace with <Image> once you have real srcs */}
                <Image src={img.src} alt="Sky Background"
            width={1000}
            height={1000}
            className="object-cover object-top pointer-events-none"/>
             
                <div
                  className="absolute bottom-0 left-0 right-0 p-3"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    fontFamily: "'Courier New', monospace",
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {img.caption}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
