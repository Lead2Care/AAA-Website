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
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: "#0a1020" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,191,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,191,255,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px", mask: "radial-gradient(ellipse 80% 70% at 50% 50%,black,transparent)", WebkitMask: "radial-gradient(ellipse 80% 70% at 50% 50%,black,transparent)" }} />
      <div style={{ position: "absolute", top: "15%", left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,0.12) 0%,transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,191,255,0.08) 0%,transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "140px clamp(20px,5vw,60px) 100px", position: "relative", zIndex: 1 }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,191,255,0.08)", border: "1px solid rgba(0,191,255,0.2)", borderRadius: 100, padding: "6px 16px", margin: "32px 0 32px -6px", animation: "fadeDown 0.7s ease forwards" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00bfff", boxShadow: "0 0 8px #00bfff", display: "inline-block" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#00bfff", letterSpacing: "1.5px", textTransform: "uppercase" }}>AI Strategy for Australian Businesses</span>
          </div>

          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(40px,5.5vw,64px)", lineHeight: 1.05, color: "#fff", letterSpacing: "-1.5px", animation: "fadeUp 0.8s ease 0.1s both", margin: "0px 0px 28px", whiteSpace: "normal", maxWidth: 720 }}>
            Learn How To Automate Your Business{" "}
            <span style={{ background: "linear-gradient(90deg,#ec4899,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", whiteSpace: "nowrap" }}>In 7 Days</span>
          </h1>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(16px,2vw,19px)", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: 560, margin: "0 0 44px", animation: "fadeUp 0.8s ease 0.2s both" }}>
            We offer practical AI strategy for growing businesses on what to automate, what to ignore, and how to implement AI - without adding more overwhelm.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "fadeUp 0.8s ease 0.3s both" }}>
            <a href={CALENDLY} target="_blank" rel="noreferrer" style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.8px",
              color: "#000", background: "linear-gradient(90deg,#ec4899,#a855f7)", padding: "16px 36px",
              borderRadius: 8, textDecoration: "none", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 10,
              boxShadow: "0 0 40px rgba(0,191,255,0.25)", transition: "box-shadow 0.3s, transform 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 60px rgba(0,191,255,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 40px rgba(0,191,255,0.25)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Book A Free Discovery Call
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

function ProblemSolution() {
  const problems = [
    "Experimenting with disconnected tools",
    "Wasting time learning systems they'll never use",
    "Investing in AI without understanding the real ROI",
    "Still buried in manual work that should already be streamlined",
  ];

  const solutions = [
    "Uncover operational bottlenecks",
    "Identify high-impact automation opportunities",
    "Avoid unnecessary tools and complexity",
    "Build a practical roadmap aligned with your operations and goals",
  ];

  return (
    <section id="services" style={{ background: "#0d1424", padding: "100px clamp(20px,5vw,60px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "30%", left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(236,72,153,0.06),transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }}></div>
      <div style={{ position: "absolute", bottom: "20%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,191,255,0.06),transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }}></div>

      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
        <div className="ps-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "clamp(24px,4vw,56px)", alignItems: "stretch" }}>

          {/* PROBLEM SIDE */}
          <FadeIn>
            <div className="card-hover ps-card ps-problem" style={{ background: "linear-gradient(180deg,rgba(236,72,153,0.05),rgba(168,85,247,0.02))", border: "1px solid rgba(236,72,153,0.18)", borderRadius: 24, padding: "44px 40px", height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "inline-block", alignSelf: "flex-start", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#ec4899", background: "rgba(236,72,153,0.08)", border: "1px solid rgba(236,72,153,0.25)", borderRadius: 100, padding: "5px 14px", marginBottom: 24 }}>The Problem</div>

              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(26px,2.9vw,36px)", color: "#fff", letterSpacing: "-0.8px", margin: "0 0 8px", lineHeight: 1.15 }}>
                AI can feel overwhelming.
              </h2>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: "-0.8px", margin: "0 0 28px", lineHeight: 1.15, background: "linear-gradient(90deg,#ec4899,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Without a clear plan, most businesses end up adding more complexity instead of creating leverage.
              </h2>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.55)", margin: "0 0 24px", lineHeight: 1.6 }}>Most businesses are:</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                {problems.map((p, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(236,72,153,0.12)", border: "1px solid rgba(236,72,153,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="3" strokeLinecap="round"><line x1="6" y1="12" x2="18" y2="12" /></svg>
                    </div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: 0 }}>{p}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "auto", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 6px", fontWeight: 600 }}></p>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 17, color: "rgba(255,255,255,0.85)", margin: 0, letterSpacing: "-0.2px", lineHeight: 1.4 }}>
                  <br /><span style={{ color: "#ec4899" }}>More noise. Less clarity. Less capacity.</span>
                </p>
              </div>
            </div>
          </FadeIn>

          {/* ARROW DIVIDER */}
          <div className="ps-arrow" style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
              <div style={{ width: 1, flex: 1, background: "linear-gradient(180deg,transparent,rgba(236,72,153,0.4),rgba(168,85,247,0.4))" }}></div>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#0d1424", border: "1px solid rgba(168,85,247,0.5)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 30px rgba(168,85,247,0.3)", flexShrink: 0, margin: "16px 0" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#psGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <defs><linearGradient id="psGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#ec4899" /><stop offset="100%" stopColor="#00bfff" /></linearGradient></defs>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <div style={{ width: 1, flex: 1, background: "linear-gradient(180deg,rgba(168,85,247,0.4),rgba(0,191,255,0.4),transparent)" }}></div>
            </div>
          </div>

          {/* SOLUTION SIDE */}
          <FadeIn delay={0.15}>
            <div className="card-hover ps-card ps-solution" style={{ background: "linear-gradient(180deg,rgba(0,191,255,0.05),rgba(168,85,247,0.03))", border: "1px solid rgba(0,191,255,0.2)", borderRadius: 24, padding: "44px 40px", height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "inline-block", alignSelf: "flex-start", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#00bfff", background: "rgba(0,191,255,0.08)", border: "1px solid rgba(0,191,255,0.25)", borderRadius: 100, padding: "5px 14px", marginBottom: 24 }}>The Solution</div>

              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(26px,2.9vw,36px)", color: "#fff", letterSpacing: "-0.8px", margin: "0 0 8px", lineHeight: 1.15 }}>
                Practical AI solutions for real business operations.
              </h2>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: "-0.8px", margin: "0 0 28px", lineHeight: 1.15, background: "linear-gradient(90deg,#00bfff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Discover what's actually worth automating.
              </h2>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.55)", margin: "0 0 24px", lineHeight: 1.6 }}>Through our strategic process we help you:</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                {solutions.map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(0,191,255,0.12)", border: "1px solid rgba(0,191,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00bfff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: 0 }}>{s}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "auto", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 17, color: "rgba(255,255,255,0.85)", margin: 0, letterSpacing: "-0.2px", lineHeight: 1.4 }}>
                  <br /><span style={{ background: "linear-gradient(90deg,#00bfff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Just practical systems that create more capacity.</span>
                </p>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .ps-grid{grid-template-columns:1fr!important;gap:0!important}
          .ps-arrow{height:80px!important;margin:8px 0}
          .ps-arrow > div{flex-direction:row!important}
          .ps-arrow > div > div:first-child,
          .ps-arrow > div > div:last-child{width:auto!important;height:1px!important;flex:1;background:linear-gradient(90deg,transparent,rgba(168,85,247,0.4),transparent)!important;margin:0!important}
          .ps-arrow > div > div:nth-child(2){margin:0 16px!important}
          .ps-card{padding:32px 24px!important}
        }
      `}</style>
    </section>
  );
}

function Services() {
  const includes = [
    "A deep-dive AI business audit to uncover time, cost and conversion leaks",
    "A clear roadmap designed around your workflows and goals",
    "Practical AI tools aligned with your business needs and workflows",
    "A prioritised action plan with practical next steps",
    "Access to ongoing support and implementation pathways",
  ];
  return (
    <section id="services" style={{ background: "#0d1424", padding: "100px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#00bfff", background: "rgba(0,191,255,0.07)", border: "1px solid rgba(0,191,255,0.15)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>Our Services</div>
        </FadeIn>
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <FadeIn delay={0.1}>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(31px,3.85vw,48px)", color: "#fff", letterSpacing: "-1px", margin: "0 0 20px", lineHeight: 1.15 }}>
                AI Business Growth<br /><span style={{ color: "#00bfff" }}>Starter Kit</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 28 }}>
                We help businesses identify where AI can genuinely reduce operational friction, save time, and create capacity — without adding unnecessary complexity.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 20 }}>WHAT’S INCLUDED:</p>
            </FadeIn>
            {includes.map((item, i) => (
              <FadeIn key={i} delay={0.25 + i * 0.07}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(0,191,255,0.15)", border: "1px solid rgba(0,191,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00bfff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0 }}>{item}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div className="card-hover" style={{ background: "linear-gradient(135deg,rgba(0,191,255,0.06),rgba(168,85,247,0.04))", border: "1px solid rgba(0,191,255,0.12)", borderRadius: 20, padding: "44px 40px" }}>
              <div style={{ marginBottom: 20 }} dangerouslySetInnerHTML={{ __html: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00bfff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13l3-3 3 3 4-4 4 4 4-4"/><path d="M3 13v3l5 4 4-3 4 3 5-4v-3"/></svg>` }} />
              <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", margin: "0 0 16px" }}>Implementation Pathways</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: "0 0 28px" }}>
                Once your roadmap is complete, we help you identify the most practical next steps based on your business goals, systems, budget, and level of support required. For some businesses, that may mean simple internal improvements using existing tools. For others, it may involve workshops, guided support, or connecting with trusted specialists from our vetted network. Our role is to help you move forward with clarity — without unnecessary complexity, overwhelm, or wasted spend.
              </p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24 }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", margin: 0, lineHeight: 1.7 }}>
                  From operational clarity → practical implementation pathways
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.4}>
          <div style={{ marginTop: 56, position: "relative", padding: "34px 40px", background: "linear-gradient(135deg,rgba(0,191,255,0.08),rgba(168,85,247,0.06))", border: "1px solid rgba(0,191,255,0.25)", borderRadius: 18, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 0% 0%, rgba(0,191,255,0.18), transparent 55%)", pointerEvents: "none" }} />
            <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600, fontSize: "clamp(17px,1.8vw,22px)", color: "#fff", lineHeight: 1.5, margin: 0, letterSpacing: "-0.3px", position: "relative" }}>
              No unrealistic promises or unnecessary complexity. <span style={{ background: "linear-gradient(90deg,#00bfff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Just practical guidance designed to help your business operate more smoothly and sustainably.</span>
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.5}>
          <div style={{ marginTop: 64, textAlign: "center" }}>
            <a href="#starter-kit" onClick={e => { e.preventDefault(); const t = document.getElementById('starter-kit'); if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 20, behavior: 'smooth' }); }} style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "1px", color: "#000", background: "linear-gradient(90deg,#ec4899,#a855f7)", padding: "15px 40px", borderRadius: 8, textDecoration: "none", textTransform: "uppercase", display: "inline-block", boxShadow: "0 0 30px rgba(0,191,255,0.2)", transition: "all 0.3s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 50px rgba(0,191,255,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 30px rgba(0,191,255,0.2)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Get Started
            </a>
          </div>
        </FadeIn>
      </div>
      <style>{`@media(max-width:768px){.services-grid{grid-template-columns:1fr!important}}`}</style>
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
            AI Strategy Built Around Real Business Operations<br /><span style={{ color: "#00e5ff" }}></span>
          </h2>
        </FadeIn>
        <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 48 }}>
          <FadeIn delay={0.15}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px 28px" }}>
              <div style={{ fontSize: 32, marginBottom: 20 }}>🔭</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: "#fff", margin: "0 0 14px" }}>Holistic Business View</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: 0 }}>Most AI providers understand tools. We focus on understanding your business first — how it operates, where friction exists, what’s slowing growth, and where AI can create genuine operational leverage.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px 28px" }}>
              <div style={{ fontSize: 32, marginBottom: 20 }}>🏥</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: "#fff", margin: "0 0 14px" }}>Local Experts</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: 0 }}>We work alongside a trusted network of Australian AI specialists, developers, and operational experts across a range of industries and business systems. As businesses grow and their needs evolve, we help connect them with the right expertise, practical support, and trusted implementation partners.</p>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.3}>
          <div style={{ margin: "48px 0", padding: "32px 36px", background: "linear-gradient(135deg,rgba(0,229,255,0.05),rgba(0,102,255,0.03))", border: "1px solid rgba(0,229,255,0.12)", borderRadius: 16, textAlign: "center" }}>
            <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(18px,2.5vw,26px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.5, margin: 0 }}>
              If you don't use AI your customers will choose competitors who do.<br />
              <span style={{ color: "#fff" }}>We help you become the business they stay loyal to.</span><br />
              <span style={{ background: "linear-gradient(90deg,#ec4899,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}></span>
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
    <section id="starter-kit" style={{ background: "#0a1020", padding: "100px clamp(20px,5vw,60px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,191,255,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <FadeIn>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#00bfff", background: "rgba(0,191,255,0.07)", border: "1px solid rgba(0,191,255,0.15)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>Start With Clarity</div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="card-hover" style={{ background: "linear-gradient(135deg,rgba(0,191,255,0.07),rgba(168,85,247,0.05))", border: "1px solid rgba(0,191,255,0.18)", borderRadius: 20, padding: "52px 48px" }}>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(24px,3.3vw,37px)", color: "#fff", margin: "0 0 8px", letterSpacing: "-0.5px" }}>AI Business Growth Starter Kit</h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, margin: "28px 0" }}>
              <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(52px,8vw,80px)", color: "#fff", letterSpacing: "-3px" }}>$497</span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: "0 0 12px" }}>
              A 90-minute deep-dive into your business. You'll leave with a prioritised automation roadmap and a clear implementation plan — no fluff, no upsell.
            </p>
            <div style={{ display: "inline-block", background: "rgba(236,72,153,0.1)", border: "1px solid rgba(168,85,247,0.3)", borderRadius: 100, padding: "5px 16px", marginBottom: 36 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#ec4899", fontWeight: 600 }}>Valued at $697 — Limited time only</span>
            </div>
            <div>
              <a href="https://calendly.com/scale-aiaustralia/90-min-ai-audit-and-roadmap" target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "1px", color: "#000", background: "linear-gradient(90deg,#ec4899,#a855f7)", padding: "17px 48px", borderRadius: 10, textDecoration: "none", textTransform: "uppercase", display: "inline-block", boxShadow: "0 0 40px rgba(0,191,255,0.3)", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 60px rgba(0,191,255,0.5)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 40px rgba(0,191,255,0.3)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >GET STARTED TODAY</a>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.25}>
          <div style={{ marginTop: 56 }}>
            <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "clamp(22px,2.75vw,33px)", color: "rgba(255,255,255,0.85)", marginBottom: 16, letterSpacing: "-0.5px" }}>
              Don't spend the next 3–6 months figuring this out alone.
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.45)", marginBottom: 28 }}>You don't need more information. You just need a clear plan.</p>
            <a href={CALENDLY} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#00bfff", border: "1px solid rgba(0,191,255,0.3)", padding: "12px 32px", borderRadius: 8, textDecoration: "none", display: "inline-block", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,191,255,0.08)"; }}
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
      <ProblemSolution />
      <Services />
      <WhyUs />
      <Pricing />
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
