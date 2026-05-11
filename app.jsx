const { useState, useEffect, useRef } = React;

const CALENDLY = "https://calendly.com/scale-aiaustralia/discoverycall";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
    }}>
      {children}
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [["Our Services", "#services"], ["About Us", "#why-us"], ["Contact Us", "#contact"]];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(6,6,10,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.4s ease",
      padding: "0 clamp(20px,5vw,60px)"
    }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#00e5ff,#0066ff)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, color: "#fff", letterSpacing: "-0.3px" }}>AI Automation <span style={{ color: "#00e5ff" }}>Australia</span></span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
          {links.map(([label, href]) => (
            <a key={label} href={href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.7)", textDecoration: "none", letterSpacing: "0.3px", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#fff"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.7)"}
            >{label}</a>
          ))}
          <a href={CALENDLY} target="_blank" rel="noreferrer" style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "1.2px",
            color: "#000", background: "linear-gradient(90deg,#00e5ff,#0099ff)", padding: "10px 22px",
            borderRadius: 6, textDecoration: "none", textTransform: "uppercase", transition: "opacity 0.2s"
          }} onMouseEnter={e => e.target.style.opacity = "0.85"} onMouseLeave={e => e.target.style.opacity = "1"}>Book a Call</a>
        </div>
        <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }} className="mobile-menu-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
      {open && (
        <div style={{ background: "rgba(6,6,10,0.97)", padding: "20px clamp(20px,5vw,60px) 28px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)} style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.8)", textDecoration: "none", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{label}</a>
          ))}
          <a href={CALENDLY} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 20, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "1.2px", color: "#000", background: "linear-gradient(90deg,#00e5ff,#0099ff)", padding: "12px 26px", borderRadius: 6, textDecoration: "none", textTransform: "uppercase" }}>Book a Call</a>
        </div>
      )}
      <style>{`
        @media(max-width:768px){ .desktop-nav{display:none!important} .mobile-menu-btn{display:block!important} }
      `}</style>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: "#06060a" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,229,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px", mask: "radial-gradient(ellipse 80% 70% at 50% 50%,black,transparent)", WebkitMask: "radial-gradient(ellipse 80% 70% at 50% 50%,black,transparent)" }} />
      <div style={{ position: "absolute", top: "15%", left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,102,255,0.12) 0%,transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,229,255,0.08) 0%,transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "140px clamp(20px,5vw,60px) 100px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 760 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)", borderRadius: 100, padding: "6px 16px", marginBottom: 32, animation: "fadeDown 0.7s ease forwards" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00e5ff", boxShadow: "0 0 8px #00e5ff", display: "inline-block" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#00e5ff", letterSpacing: "1.5px", textTransform: "uppercase" }}>AI Strategy for Australian Businesses</span>
          </div>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(36px,5.5vw,68px)", lineHeight: 1.05, color: "#fff", letterSpacing: "-1.5px", margin: "0 0 28px", animation: "fadeUp 0.8s ease 0.1s both" }}>
            Scale your business<br />
            <span style={{ background: "linear-gradient(90deg,#00e5ff,#0066ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>without sacrificing</span><br />
            your time, team or profit
          </h1>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(16px,2vw,19px)", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: 560, margin: "0 0 44px", animation: "fadeUp 0.8s ease 0.2s both" }}>
            We show Australian service-based businesses exactly what to automate, what to ignore, and how to implement it — without the overwhelm.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "fadeUp 0.8s ease 0.3s both" }}>
            <a href={CALENDLY} target="_blank" rel="noreferrer" style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.8px",
              color: "#000", background: "linear-gradient(90deg,#00e5ff,#0066ff)", padding: "16px 36px",
              borderRadius: 8, textDecoration: "none", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 10,
              boxShadow: "0 0 40px rgba(0,229,255,0.25)", transition: "box-shadow 0.3s, transform 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 60px rgba(0,229,255,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 40px rgba(0,229,255,0.25)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Book a Call
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 28, letterSpacing: "0.3px", animation: "fadeUp 0.8s ease 0.4s both" }}>
            Real businesses. Real results. No fluff, no guesswork, no wasted time and spend.
          </p>
        </div>
      </div>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeDown { from { opacity:0; transform:translateY(-16px) } to { opacity:1; transform:translateY(0) } }
      `}</style>
    </section>
  );
}

function Problem() {
  const items = [
    "Trying random tools that don't connect to anything",
    "Spending hours learning AI with no real outcome",
    "Investing in things they don't fully understand",
    "Still doing manual work they should have automated months ago",
  ];
  return (
    <section id="services" style={{ background: "#08080e", padding: "100px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#00e5ff", background: "rgba(0,229,255,0.07)", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>The Problem</div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,46px)", color: "#fff", letterSpacing: "-1px", margin: "0 0 16px", lineHeight: 1.15 }}>
            The problem isn't AI.<br />It's doing it <span style={{ color: "#00e5ff" }}>without a plan.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 52 }}>Right now, most business owners are:</p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
          {items.map((item, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.08}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "24px 28px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,60,60,0.1)", border: "1px solid rgba(255,60,60,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ff4444" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>{item}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.5}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "rgba(255,255,255,0.4)", marginTop: 48, textAlign: "center", letterSpacing: "-0.3px" }}>
            More complexity. Less clarity. <span style={{ color: "rgba(255,255,255,0.65)" }}>No real leverage.</span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function Solution() {
  const items = [
    ["Find exactly where you're losing time, leads, and money", "🔍"],
    ["Pinpoint what to automate first — and what to leave alone", "🎯"],
    ["Build a clear, practical plan you can act on immediately", "📋"],
    ["Avoid the expensive mistakes most businesses make early on", "🛡️"],
  ];
  return (
    <section style={{ background: "#06060a", padding: "100px clamp(20px,5vw,60px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,102,255,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
        <FadeIn>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#00e5ff", background: "rgba(0,229,255,0.07)", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>The Solution</div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,46px)", color: "#fff", letterSpacing: "-1px", margin: "0 0 52px", lineHeight: 1.15 }}>
            We turn AI into something that<br /><span style={{ color: "#00e5ff" }}>actually works</span> in your business
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20, marginBottom: 52 }}>
          {items.map(([text, icon], i) => (
            <FadeIn key={i} delay={0.1 + i * 0.08}>
              <div style={{ background: "linear-gradient(135deg,rgba(0,229,255,0.05),rgba(0,102,255,0.03))", border: "1px solid rgba(0,229,255,0.12)", borderRadius: 14, padding: "28px 24px", height: "100%" }}>
                <div style={{ fontSize: 28, marginBottom: 16 }}>{icon}</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: 0 }}>{text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.5}>
          <div style={{ textAlign: "center" }}>
            <a href={CALENDLY} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "1px", color: "#000", background: "linear-gradient(90deg,#00e5ff,#0066ff)", padding: "15px 34px", borderRadius: 8, textDecoration: "none", textTransform: "uppercase", display: "inline-block", boxShadow: "0 0 30px rgba(0,229,255,0.2)", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 50px rgba(0,229,255,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 30px rgba(0,229,255,0.2)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >Book a Call</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Services() {
  const includes = [
    "A deep-dive AI business audit to uncover time, cost and conversion leaks",
    "A clear, prioritised AI implementation roadmap tailored to your goals",
    "A vetted local AI developer matched to your niche, tech stack and working style",
    "A dedicated client success manager guiding you through the entire build",
  ];
  return (
    <section style={{ background: "#08080e", padding: "100px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#00e5ff", background: "rgba(0,229,255,0.07)", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>Our Services</div>
        </FadeIn>
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <FadeIn delay={0.1}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,44px)", color: "#fff", letterSpacing: "-1px", margin: "0 0 20px", lineHeight: 1.15 }}>
                AI Transformation<br /><span style={{ color: "#00e5ff" }}>Partner</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 28 }}>
                We don't just advise on AI — we partner with you to design, build and implement the right solutions for your business.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 20 }}>As your partner, you get:</p>
            </FadeIn>
            {includes.map((item, i) => (
              <FadeIn key={i} delay={0.25 + i * 0.07}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg,#00e5ff,#0066ff)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0 }}>{item}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div style={{ background: "linear-gradient(135deg,rgba(0,229,255,0.06),rgba(0,102,255,0.04))", border: "1px solid rgba(0,229,255,0.12)", borderRadius: 20, padding: "44px 40px" }}>
              <div style={{ fontSize: 40, marginBottom: 20 }}>🤝</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", margin: "0 0 16px" }}>Not a one-off call.</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: "0 0 28px" }}>
                You're getting a complete AI transformation — from diagnosis and roadmap, to a vetted team that actually delivers it.
              </p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24 }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", margin: 0, lineHeight: 1.7 }}>
                  From diagnosis and roadmap → vetted developer match → dedicated success manager throughout the entire build.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
      <style>{`@media(max-width:768px){.services-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

function Outcome() {
  const roadmap = [
    "A clear automation roadmap you can act on immediately",
    "Identified time and cost leaks across your operations",
    "The right tools for your situation (not just whatever's trending)",
    "A step-by-step plan for implementation",
  ];
  const partner = [
    "Match you with the most appropriate local AI developer based on niche experience, technical skill set and communication style",
    "Pair you with a dedicated client success manager to keep the whole build on track",
  ];
  return (
    <section style={{ background: "#06060a", padding: "100px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#00e5ff", background: "rgba(0,229,255,0.07)", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>The Outcome</div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(26px,3.5vw,44px)", color: "#fff", letterSpacing: "-1px", margin: "0 0 48px", lineHeight: 1.15 }}>
            Walk away knowing exactly <span style={{ color: "#00e5ff" }}>what to do,<br />who will do it</span>, and who has your back
          </h2>
        </FadeIn>
        <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <FadeIn delay={0.15}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px 28px" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#00e5ff", marginBottom: 24 }}>After your audit</p>
              {roadmap.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(0,229,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ background: "linear-gradient(135deg,rgba(0,229,255,0.06),rgba(0,102,255,0.04))", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 16, padding: "32px 28px" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#00e5ff", marginBottom: 24 }}>As your AI transformation partner, we</p>
              {partner.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(0,229,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>{item}</p>
                </div>
              ))}
              <div style={{ marginTop: 24, padding: "16px 20px", background: "rgba(0,229,255,0.05)", borderRadius: 10, borderLeft: "3px solid #00e5ff" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0 }}>
                  You won't walk away with another report that gathers dust. You'll have a clear roadmap, a vetted team, and a dedicated success manager.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
      <style>{`@media(max-width:768px){.two-col-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="why-us" style={{ background: "#08080e", padding: "100px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#00e5ff", background: "rgba(0,229,255,0.07)", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>Why Us</div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(26px,3.5vw,44px)", color: "#fff", letterSpacing: "-1px", margin: "0 0 20px", lineHeight: 1.15, maxWidth: 680 }}>
            You don't need more tools.<br />You need the <span style={{ color: "#00e5ff" }}>right plan</span> — and the right team.
          </h2>
        </FadeIn>
        <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 48 }}>
          <FadeIn delay={0.15}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px 28px" }}>
              <div style={{ fontSize: 32, marginBottom: 20 }}>🔭</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: "#fff", margin: "0 0 14px" }}>Holistic Business View</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: 0 }}>We don't just look at AI. We look at your entire business — sales, operations, and delivery — so automation actually works in the real world, not just on a slide deck.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px 28px" }}>
              <div style={{ fontSize: 32, marginBottom: 20 }}>🏥</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: "#fff", margin: "0 0 14px" }}>Industry Experience</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: 0 }}>We've worked across service-based industries including NDIS and healthcare, construction and real estate. We know how to create efficiency without breaking what's already working.</p>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.3}>
          <div style={{ margin: "48px 0", padding: "32px 36px", background: "linear-gradient(135deg,rgba(0,229,255,0.05),rgba(0,102,255,0.03))", border: "1px solid rgba(0,229,255,0.12)", borderRadius: 16, textAlign: "center" }}>
            <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(18px,2.5vw,26px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.5, margin: 0 }}>
              Most businesses don't fail because they ignore AI.<br />
              <span style={{ color: "#fff" }}>They fail because they implement the wrong things.</span><br />
              <span style={{ color: "#00e5ff" }}>We make sure you don't.</span>
            </p>
          </div>
        </FadeIn>

        <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            { quote: "She's knowledgeable, up to date with the latest tools, and genuinely focused on delivering real value. Highly recommend!", name: "Manjula", company: "Limes Digital" },
            { quote: "Best investment we've made this year. The AAA team took the time to understand my business and built something that actually works.", name: "Jenelle", company: "Encompassed Energy" },
          ].map((t, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.1}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "28px 28px 24px" }}>
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none" style={{ marginBottom: 16 }}><path d="M0 20V12C0 5.4 3.6 1.4 10.8 0L12 2.4C9.2 3.2 7.2 4.4 6 6C5 7.2 4.6 8.6 4.8 10H8V20H0ZM16 20V12C16 5.4 19.6 1.4 26.8 0L28 2.4C25.2 3.2 23.2 4.4 22 6C21 7.2 20.6 8.6 20.8 10H24V20H16Z" fill="#00e5ff" opacity="0.3"/></svg>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 20px", fontStyle: "italic" }}>"{t.quote}"</p>
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", margin: "0 0 2px" }}>{t.name}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#00e5ff", margin: 0 }}>{t.company}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.why-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

function Pricing() {
  return (
    <section style={{ background: "#06060a", padding: "100px clamp(20px,5vw,60px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,229,255,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <FadeIn>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#00e5ff", background: "rgba(0,229,255,0.07)", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>Start With Clarity</div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ background: "linear-gradient(135deg,rgba(0,229,255,0.07),rgba(0,102,255,0.05))", border: "1px solid rgba(0,229,255,0.18)", borderRadius: 20, padding: "52px 48px" }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(22px,3vw,34px)", color: "#fff", margin: "0 0 8px", letterSpacing: "-0.5px" }}>AI Business Audit + Roadmap</h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, margin: "28px 0" }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(52px,8vw,80px)", color: "#fff", letterSpacing: "-3px" }}>$497</span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: "0 0 12px" }}>
              A 90-minute deep-dive into your business. You'll leave with a prioritised automation roadmap and a clear implementation plan — no fluff, no upsell.
            </p>
            <div style={{ display: "inline-block", background: "rgba(255,220,0,0.1)", border: "1px solid rgba(255,220,0,0.2)", borderRadius: 100, padding: "5px 16px", marginBottom: 36 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#ffd700", fontWeight: 600 }}>Valued at $697 — Limited time only</span>
            </div>
            <div>
              <a href={CALENDLY} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "1px", color: "#000", background: "linear-gradient(90deg,#00e5ff,#0066ff)", padding: "17px 48px", borderRadius: 10, textDecoration: "none", textTransform: "uppercase", display: "inline-block", boxShadow: "0 0 40px rgba(0,229,255,0.3)", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 60px rgba(0,229,255,0.5)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 40px rgba(0,229,255,0.3)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >Book a Call</a>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.25}>
          <div style={{ marginTop: 56 }}>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(20px,2.5vw,30px)", color: "rgba(255,255,255,0.85)", marginBottom: 16, letterSpacing: "-0.5px" }}>
              Don't spend the next 3–6 months figuring this out alone
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.45)", marginBottom: 28 }}>You don't need more information. You need a clear plan.</p>
            <a href={CALENDLY} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#00e5ff", border: "1px solid rgba(0,229,255,0.3)", padding: "12px 32px", borderRadius: 8, textDecoration: "none", display: "inline-block", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,229,255,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >Book a Call</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  const socials = [
    { href: "https://www.linkedin.com/company/114214054/", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
    { href: "https://www.facebook.com/aiautomationaustralia/", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
    { href: "https://www.instagram.com/aiautomation.aus", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
    { href: "https://www.youtube.com/@aiautomationaustralia", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#030305"/></svg> },
  ];
  return (
    <footer id="contact" style={{ background: "#030305", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "60px clamp(20px,5vw,60px) 40px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="footer-top" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "start", marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#00e5ff,#0066ff)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color: "#fff" }}>AI Automation <span style={{ color: "#00e5ff" }}>Australia</span></span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="tel:0432259239" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>📞 0432 259 239</a>
              <a href="mailto:hello@aiaustralia.online" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>✉️ hello@aiaustralia.online</a>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer" style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,229,255,0.1)"; e.currentTarget.style.color = "#00e5ff"; e.currentTarget.style.borderColor = "rgba(0,229,255,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >{s.icon}</a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.25)", margin: 0 }}>© 2026 AI Automation Australia. All rights reserved.</p>
          <a href="https://aiaustralia.online/terms" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.25)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.5)"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.25)"}>Terms & Conditions</a>
        </div>
      </div>
      <style>{`@media(max-width:768px){.footer-top{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
}

function App() {
  return (
    <React.Fragment>
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <Services />
      <Outcome />
      <WhyUs />
      <Pricing />
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
