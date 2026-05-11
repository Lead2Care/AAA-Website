const { useState, useEffect, useRef } = React;

const CALENDLY = "https://calendly.com/scale-aiaustralia/discoverycall";
const WORKSHOP_FORM = "https://link.aiaustralia.online/widget/form/4KCzX5r7WMoAgUWem83y";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {if (e.isIntersecting) setInView(true);}, { threshold });
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
    </div>);

}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [["Our Services", "#services"], ["About Us", "#about"], ["Contact Us", "#contact"]];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,16,32,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.4s ease",
      padding: "0 clamp(20px,5vw,60px)"
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 84 }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img src="assets/aaa-logo-white.png" alt="AI Automation Australia" style={{ height: 52, width: "auto", display: "block" }} />
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
          {links.map(([label, href]) =>
          <a key={label} href={href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.7)", textDecoration: "none", letterSpacing: "0.3px", transition: "color 0.2s" }}
          onMouseEnter={(e) => e.target.style.color = "#fff"}
          onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.7)"}>
            {label}</a>
          )}
          <a href={CALENDLY} target="_blank" rel="noreferrer" style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "1.2px",
            color: "#000", background: "linear-gradient(90deg,#ec4899,#a855f7)", padding: "10px 22px",
            borderRadius: 6, textDecoration: "none", textTransform: "uppercase", transition: "opacity 0.2s"
          }} onMouseEnter={(e) => e.target.style.opacity = "0.85"} onMouseLeave={(e) => e.target.style.opacity = "1"}>Book a Call</a>
        </div>
        <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }} className="mobile-menu-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
      </div>
      {open &&
      <div style={{ background: "rgba(10,16,32,0.97)", padding: "20px clamp(20px,5vw,60px) 28px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {links.map(([label, href]) =>
        <a key={label} href={href} onClick={() => setOpen(false)} style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.8)", textDecoration: "none", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{label}</a>
        )}
          <a href={CALENDLY} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 20, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "1.2px", color: "#000", background: "linear-gradient(90deg,#ec4899,#a855f7)", padding: "12px 26px", borderRadius: 6, textDecoration: "none", textTransform: "uppercase" }}>Book a Call</a>
        </div>
      }
      <style>{`
        @media(max-width:768px){ .desktop-nav{display:none!important} .mobile-menu-btn{display:block!important} }
      `}</style>
    </nav>);

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

          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(40px,5.5vw,64px)", lineHeight: 1.05, color: "#fff", letterSpacing: "-1.5px", animation: "fadeUp 0.8s ease 0.1s both", margin: "0px 0px 28px", whiteSpace: "normal" }}>
            <span style={{ whiteSpace: "nowrap" }}>AI Should Create More Capacity</span>{" "}
            <span style={{ background: "linear-gradient(90deg,#ec4899,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", whiteSpace: "nowrap" }}>- Not More Chaos</span>
          </h1>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(16px,2vw,19px)", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: 560, margin: "0 0 44px", animation: "fadeUp 0.8s ease 0.2s both" }}>We offer practical AI strategy for growing businesses on what to automate, what to ignore, and how to implement AI - without adding more overwhelm.

          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "fadeUp 0.8s ease 0.3s both" }}>
            <a href={CALENDLY} target="_blank" rel="noreferrer" style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.8px",
              color: "#000", background: "linear-gradient(90deg,#ec4899,#a855f7)", padding: "16px 36px",
              borderRadius: 8, textDecoration: "none", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 10,
              boxShadow: "0 0 40px rgba(0,191,255,0.25)", transition: "box-shadow 0.3s, transform 0.2s"
            }}
            onMouseEnter={(e) => {e.currentTarget.style.boxShadow = "0 0 60px rgba(0,191,255,0.4)";e.currentTarget.style.transform = "translateY(-2px)";}}
            onMouseLeave={(e) => {e.currentTarget.style.boxShadow = "0 0 40px rgba(0,191,255,0.25)";e.currentTarget.style.transform = "translateY(0)";}}>
              
              Get Your AI Roadmap
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
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
    </section>);

}

function ProblemSolution() {
  const problems = [
  "Experimenting with disconnected tools",
  "Wasting time learning systems they'll never use",
  "Investing in AI without understanding the real ROI",
  "Still buried in manual work that should already be streamlined"];

  const solutions = [
  "Uncover operational bottlenecks",
  "Identify high-impact automation opportunities",
  "Avoid unnecessary tools and complexity",
  "Create a clear implementation plan that fits your business"];


  return (
    <section style={{ background: "#0d1424", padding: "100px clamp(20px,5vw,60px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "30%", left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(236,72,153,0.06),transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }}></div>
      <div style={{ position: "absolute", bottom: "20%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,191,255,0.06),transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }}></div>

      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
        <div className="ps-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "clamp(24px,4vw,56px)", alignItems: "stretch" }}>

          {/* PROBLEM SIDE */}
          <FadeIn>
            <div className="card-hover ps-card ps-problem" style={{ background: "linear-gradient(180deg,rgba(236,72,153,0.05),rgba(168,85,247,0.02))", border: "1px solid rgba(236,72,153,0.18)", borderRadius: 24, padding: "44px 40px", height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "inline-block", alignSelf: "flex-start", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#ec4899", background: "rgba(236,72,153,0.08)", border: "1px solid rgba(236,72,153,0.25)", borderRadius: 100, padding: "5px 14px", marginBottom: 24 }}>The Problem</div>

              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(26px,2.9vw,36px)", color: "#fff", letterSpacing: "-0.8px", margin: "0 0 8px", lineHeight: 1.15 }}>
                The problem isn't AI.
              </h2>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(26px,2.9vw,36px)", letterSpacing: "-0.8px", margin: "0 0 28px", lineHeight: 1.15, background: "linear-gradient(90deg,#ec4899,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                It's trying to implement it without a clear plan.
              </h2>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.55)", margin: "0 0 24px", lineHeight: 1.6 }}>Most businesses are:</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                {problems.map((p, i) =>
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(236,72,153,0.12)", border: "1px solid rgba(236,72,153,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="3" strokeLinecap="round"><line x1="6" y1="12" x2="18" y2="12" /></svg>
                    </div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: 0 }}>{p}</p>
                  </div>
                )}
              </div>

              <div style={{ marginTop: "auto", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 6px", fontWeight: 600 }}>The result?</p>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 17, color: "rgba(255,255,255,0.85)", margin: 0, letterSpacing: "-0.2px", lineHeight: 1.4 }}>
                  More complexity. More noise.<br /><span style={{ color: "#ec4899" }}>Less operational clarity.</span>
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

              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(26px,2.9vw,36px)", color: "#fff", letterSpacing: "-0.8px", margin: "0 0 28px", lineHeight: 1.15 }}>
                We help you identify <span style={{ background: "linear-gradient(90deg,#00bfff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>what's actually worth automating.</span>
              </h2>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.55)", margin: "0 0 24px", lineHeight: 1.6 }}>Through a practical AI business audit and roadmap, we help you:</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                {solutions.map((s, i) =>
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(0,191,255,0.12)", border: "1px solid rgba(0,191,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00bfff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: 0 }}>{s}</p>
                  </div>
                )}
              </div>

              <div style={{ marginTop: "auto", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 17, color: "rgba(255,255,255,0.85)", margin: 0, letterSpacing: "-0.2px", lineHeight: 1.4 }}>
                  No overwhelm.<br /><span style={{ background: "linear-gradient(90deg,#00bfff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Just practical systems that create more capacity.</span>
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
    </section>);

}

function _LegacyProblem() {
  const items = [
  ["Trying random tools that don't connect to anything", `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><circle cx="18" cy="6" r="3"/><line x1="6" y1="9" x2="6" y2="15"/></svg>`],
  ["Spending hours learning AI with no real outcome", `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>`],
  ["Investing in things they don't fully understand", `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="13"/><circle cx="12" cy="16.5" r="0.6" fill="#ec4899" stroke="none"/></svg>`],
  ["Still doing manual work they should have automated months ago", `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`]];

  return (
    <section style={{ background: "#0d1424", padding: "100px clamp(20px,5vw,60px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(236,72,153,0.05) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
        <FadeIn>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#00bfff", background: "rgba(0,191,255,0.07)", border: "1px solid rgba(0,191,255,0.15)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>The Problem</div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(31px,4.4vw,51px)", color: "#fff", letterSpacing: "-1px", margin: "0 0 16px", lineHeight: 1.15 }}>
            The problem isn't AI.<br />It's doing it <span style={{ color: "#00bfff" }}>without a plan.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 52 }}>Right now, most business owners are:</p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
          {items.map(([item, icon], i) =>
          <FadeIn key={i} delay={0.1 + i * 0.08}>
              <div className="card-hover" style={{ background: "linear-gradient(135deg,rgba(236,72,153,0.05),rgba(168,85,247,0.03))", border: "1px solid rgba(236,72,153,0.15)", borderRadius: 14, padding: "28px 24px", height: "100%" }}>
                <div style={{ marginBottom: 16, height: 30 }} dangerouslySetInnerHTML={{ __html: icon }} />
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: 0 }}>{item}</p>
              </div>
            </FadeIn>
          )}
        </div>
        <FadeIn delay={0.5}>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 18, color: "rgba(255,255,255,0.4)", marginTop: 48, textAlign: "center", letterSpacing: "-0.3px" }}>
            More complexity & less clarity = <span style={{ color: "rgba(255,255,255,0.65)" }}><span style={{ color: "rgb(234, 73, 155)" }}>No meaningful leverage</span></span>
          </p>
        </FadeIn>
      </div>
    </section>);

}

function _LegacySolution() {
  const items = [
  ["Find exactly where you're losing time, leads, and money", `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00bfff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`],
  ["Pinpoint what to automate first — and what to leave alone", `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00bfff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="#00bfff"/></svg>`],
  ["Build a clear, practical plan you can act on immediately", `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00bfff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4h6v3H9z"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="15" x2="13" y2="15"/></svg>`],
  ["Avoid the expensive mistakes most businesses make early on", `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00bfff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/></svg>`]];

  return (
    <section style={{ background: "#0a1020", padding: "100px clamp(20px,5vw,60px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
        <FadeIn>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#00bfff", background: "rgba(0,191,255,0.07)", border: "1px solid rgba(0,191,255,0.15)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>The Solution</div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(31px,4.4vw,51px)", color: "#fff", letterSpacing: "-1px", margin: "0 0 52px", lineHeight: 1.15 }}>
            We turn AI into something that<br /><span style={{ color: "#00bfff", fontSize: "57px" }}>actually works</span> in your business.
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20, marginBottom: 52 }}>
          {items.map(([text, icon], i) =>
          <FadeIn key={i} delay={0.1 + i * 0.08}>
              <div className="card-hover" style={{ background: "linear-gradient(135deg,rgba(0,191,255,0.05),rgba(168,85,247,0.03))", border: "1px solid rgba(0,191,255,0.12)", borderRadius: 14, padding: "28px 24px", height: "100%" }}>
                <div style={{ marginBottom: 16, height: 30 }} dangerouslySetInnerHTML={{ __html: icon }} />
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: 0 }}>{text}</p>
              </div>
            </FadeIn>
          )}
        </div>
        <FadeIn delay={0.5}>
          <div style={{ textAlign: "center" }}>
            <a href={CALENDLY} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "1px", color: "#000", background: "linear-gradient(90deg,#ec4899,#a855f7)", padding: "15px 34px", borderRadius: 8, textDecoration: "none", textTransform: "uppercase", display: "inline-block", boxShadow: "0 0 30px rgba(0,191,255,0.2)", transition: "all 0.3s" }}
            onMouseEnter={(e) => {e.currentTarget.style.boxShadow = "0 0 50px rgba(0,191,255,0.4)";e.currentTarget.style.transform = "translateY(-2px)";}}
            onMouseLeave={(e) => {e.currentTarget.style.boxShadow = "0 0 30px rgba(0,191,255,0.2)";e.currentTarget.style.transform = "translateY(0)";}}>
              Book a Call</a>
          </div>
        </FadeIn>
      </div>
    </section>);

}

function Services() {
  const includes = [
  "A deep-dive AI business audit to uncover time, cost and conversion leaks",
  "A clear, prioritised AI implementation roadmap tailored to your goals",
  "A vetted local AI developer matched to your niche, tech stack and working style",
  "Greater clarity around tools, systems, workflows, and implementation options",
  "Ongoing strategic guidance available during implementation"];

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
                AI Business Audit +<br /><span style={{ color: "#00bfff" }}>Roadmap</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 28 }}>We help businesses identify where AI can genuinely reduce operational friction, save time, and create capacity — without adding unnecessary complexity.

              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 20 }}>WHAT’S INCLUDED:</p>
            </FadeIn>
            {includes.map((item, i) =>
            <FadeIn key={i} delay={0.25 + i * 0.07}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(0,191,255,0.15)", border: "1px solid rgba(0,191,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00bfff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0 }}>{item}</p>
                </div>
              </FadeIn>
            )}
          </div>
          <FadeIn delay={0.3}>
            <div className="card-hover" style={{ background: "linear-gradient(135deg,rgba(0,191,255,0.06),rgba(168,85,247,0.04))", border: "1px solid rgba(0,191,255,0.12)", borderRadius: 20, padding: "44px 40px" }}>
              <div style={{ marginBottom: 20 }} dangerouslySetInnerHTML={{ __html: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00bfff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13l3-3 3 3 4-4 4 4 4-4"/><path d="M3 13v3l5 4 4-3 4 3 5-4v-3"/></svg>` }} />
              <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", margin: "0 0 16px" }}>Implementation Support</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: "0 0 28px" }}>Once your roadmap is complete, we can connect you with trusted AI developers and implementation specialists from our vetted network based on your business needs, technical requirements, and budget.


This gives you a clear path forward without having to navigate the AI space alone or waste time searching for the right people yourself.</p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24 }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", margin: 0, lineHeight: 1.7 }}>From diagnosis and roadmap → vetted developer matching

                </p>
              </div>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.5}>
          <div style={{ marginTop: 64, textAlign: "center" }}>
            <a href={CALENDLY} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "1px", color: "#000", background: "linear-gradient(90deg,#ec4899,#a855f7)", padding: "15px 40px", borderRadius: 8, textDecoration: "none", textTransform: "uppercase", display: "inline-block", boxShadow: "0 0 30px rgba(0,191,255,0.2)", transition: "all 0.3s" }}
            onMouseEnter={(e) => {e.currentTarget.style.boxShadow = "0 0 50px rgba(0,191,255,0.4)";e.currentTarget.style.transform = "translateY(-2px)";}}
            onMouseLeave={(e) => {e.currentTarget.style.boxShadow = "0 0 30px rgba(0,191,255,0.2)";e.currentTarget.style.transform = "translateY(0)";}}>
              Get Started</a>
          </div>
        </FadeIn>
      </div>
      <style>{`@media(max-width:768px){.services-grid{grid-template-columns:1fr!important}}`}</style>
    </section>);
}

function HowItWorks() {
  const steps = [
  {
    n: "01",
    title: "Business Audit",
    desc: "We map your workflows, bottlenecks, and operational friction points.",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/><path d="M8 11h6"/><path d="M11 8v6"/></svg>`
  },
  {
    n: "02",
    title: "AI Roadmap",
    desc: "You receive practical recommendations prioritised by impact, complexity, and ROI.",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v16"/><path d="M15 6v16"/></svg>`
  },
  {
    n: "03",
    title: "Implementation Support",
    desc: "Implement internally or work with a vetted developer from our trusted network.",
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M7.8 7.8 11 16"/><path d="M16.2 7.8 13 16"/><path d="M8 6h8"/></svg>`
  }];


  return (
    <section style={{ background: "#0a1020", padding: "100px clamp(20px,5vw,60px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "10%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,191,255,0.08),transparent 70%)", filter: "blur(60px)" }}></div>
      <div style={{ position: "absolute", bottom: "10%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,0.07),transparent 70%)", filter: "blur(60px)" }}></div>
      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <FadeIn>
            <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#00bfff", background: "rgba(0,191,255,0.07)", border: "1px solid rgba(0,191,255,0.15)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>How It Works</div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(31px,3.85vw,48px)", color: "#fff", letterSpacing: "-1px", margin: "0 0 16px", lineHeight: 1.15 }}>
              A clear path from <span style={{ background: "linear-gradient(90deg,#00bfff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>confusion to clarity</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: "0 auto", maxWidth: 580 }}>
              A simple, three-step process designed to take you from scattered AI ideas to a focused implementation plan.
            </p>
          </FadeIn>
        </div>

        <div className="hiw-pipeline" style={{ position: "relative" }}>
          {/* horizontal connector line */}
          <div className="hiw-connector" style={{ position: "absolute", top: 44, left: "16.6%", right: "16.6%", height: 2, background: "linear-gradient(90deg,rgba(0,191,255,0.4),rgba(168,85,247,0.4),rgba(236,72,153,0.4))", zIndex: 0 }}>
            <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(90deg,transparent 0,transparent 6px,#0a1020 6px,#0a1020 10px)" }}></div>
          </div>

          <div className="hiw-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32, position: "relative", zIndex: 1 }}>
            {steps.map((s, i) =>
            <FadeIn key={s.n} delay={0.2 + i * 0.12}>
                <div className="card-hover hiw-card" style={{ background: "linear-gradient(180deg,rgba(13,20,36,0.95),rgba(10,16,32,0.95))", border: "1px solid rgba(0,191,255,0.15)", borderRadius: 20, padding: "32px 28px 36px", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", transition: "all 0.3s" }}>
                  {/* Number disc */}
                  <div style={{ width: 88, height: 88, borderRadius: "50%", background: "radial-gradient(circle at 30% 30%,rgba(0,191,255,0.25),rgba(168,85,247,0.18) 60%,rgba(13,20,36,1) 100%)", border: "1px solid rgba(0,191,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: "0 0 40px rgba(0,191,255,0.25)", position: "relative" }}>
                    <div style={{ position: "absolute", inset: 6, borderRadius: "50%", background: "#0a1020", display: "flex", alignItems: "center", justifyContent: "center", color: "#00bfff" }} dangerouslySetInnerHTML={{ __html: s.icon }} />
                    <div style={{ position: "absolute", top: -6, right: -6, fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: 13, color: "#000", background: "linear-gradient(135deg,#00bfff,#a855f7)", borderRadius: 100, padding: "4px 10px", letterSpacing: "0.5px", boxShadow: "0 4px 12px rgba(0,191,255,0.4)" }}>{s.n}</div>
                  </div>

                  <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", margin: "0 0 12px", letterSpacing: "-0.3px" }}>{s.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:860px){
          .hiw-grid{grid-template-columns:1fr!important;gap:20px!important}
          .hiw-connector{display:none!important}
          .hiw-card{flex-direction:row!important;text-align:left!important;align-items:flex-start!important;gap:20px;padding:24px!important}
          .hiw-card > div:first-child{margin-bottom:0!important;flex-shrink:0;width:72px!important;height:72px!important}
        }
      `}</style>
    </section>);

}

function Outcome() {
  const roadmap = [
  "A clear automation roadmap you can act on immediately",
  "Identified time and cost leaks across your operations",
  "The right tools for your situation (not just whatever's trending)",
  "A step-by-step plan for implementation"];

  const partner = [
  "Match you with the most appropriate local AI developer based on niche experience, technical skill set and communication style"];

  return (
    <section style={{ background: "#0a1020", padding: "100px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#00bfff", background: "rgba(0,191,255,0.07)", border: "1px solid rgba(0,191,255,0.15)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>The Outcome</div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(29px,3.85vw,48px)", letterSpacing: "-1px", margin: "0 0 40px", lineHeight: 1.15, color: "rgb(234, 74, 163)" }}>
            <span style={{ color: "rgb(255, 255, 255)" }}>Walk away knowing</span> <span style={{ color: "#00bfff" }}>what's worth automating<br /><span style={{ color: "rgb(255, 255, 255)" }}>and how to do it.</span></span>
          </h2>
        </FadeIn>
        <div style={{ marginBottom: 56 }}>
          <FadeIn delay={0.15}>
            <div className="card-hover" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "40px 44px" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#00bfff", marginBottom: 24, fontSize: "18px" }}>AFTER YOUR AUDIT YOU'LL LEAVE WITH:</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px 32px", padding: "2px 0px 0px" }} className="audit-bullets">
              {roadmap.map((item, i) =>
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(0,191,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#00bfff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>{item}</p>
                </div>
                )}
              </div>
              <div style={{ marginTop: 24, padding: "16px 20px", background: "rgba(0,191,255,0.05)", borderRadius: 10, borderLeft: "3px solid #00bfff", margin: "54px 0px 0px" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0 }}>No unrealistic promises or unnecessary complexity. Just practical guidance designed to help your business operate more smoothly and sustainably.</p>
              </div>
            </div>
          </FadeIn>
        </div>
        <div className="two-col-grid impl-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center", position: "relative" }}>
          <FadeIn delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", position: "relative", zIndex: 2 }}>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, color: "#fff", letterSpacing: "-1px", margin: "0 0 20px", lineHeight: 1.15, fontSize: "clamp(31px,3.85vw,48px)" }}>
                Implementation With Our<br /><span style={{ background: "linear-gradient(90deg,#ec4899,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Developer Network</span>
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: 0 }}>If you'd like help bringing the roadmap to life, we'll connect you with a vetted developer from our trusted network — matched to your business and ready to build.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="100%" height="auto" viewBox="0 0 420 280" fill="none" style={{ maxWidth: 491, display: "block" }} preserveAspectRatio="xMidYMid meet">
                <defs>
                  <radialGradient id="nodeCore" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </radialGradient>
                  <radialGradient id="nodeDev" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00bfff" />
                    <stop offset="100%" stopColor="#0066ff" />
                  </radialGradient>
                </defs>
                <g stroke="rgba(0,191,255,0.35)" strokeWidth="1.2" strokeDasharray="3 4">
                  <line x1="210" y1="140" x2="70" y2="50" />
                  <line x1="210" y1="140" x2="350" y2="50" />
                  <line x1="210" y1="140" x2="40" y2="160" />
                  <line x1="210" y1="140" x2="380" y2="160" />
                  <line x1="210" y1="140" x2="110" y2="240" />
                  <line x1="210" y1="140" x2="310" y2="240" />
                </g>
                {[[70, 50], [350, 50], [40, 160], [380, 160], [110, 240], [310, 240]].map(([x, y], i) =>
                <g key={i}>
                  <circle cx={x} cy={y} r="22" fill="rgba(0,191,255,0.08)" stroke="rgba(0,191,255,0.4)" strokeWidth="1" />
                  <circle cx={x} cy={y} r="14" fill="url(#nodeDev)" opacity="0.9" />
                  <circle cx={x} cy={y - 3} r="4" fill="#fff" />
                  <path d={`M${x - 7} ${y + 7} Q${x} ${y + 1} ${x + 7} ${y + 7}`} stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                </g>
                )}
                <circle cx="210" cy="140" r="40" fill="rgba(236,72,153,0.1)" stroke="rgba(236,72,153,0.4)" strokeWidth="1" />
                <circle cx="210" cy="140" r="28" fill="url(#nodeCore)" />
                <text x="210" y="146" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="14" fontWeight="800" fill="#fff" letterSpacing="0.5">AAA</text>
              </svg>
            </div>
          </FadeIn>
        </div>
      </div>
      <style>{`@media(max-width:768px){.two-col-grid{grid-template-columns:1fr!important}}`}</style>
    </section>);
}

function TestimonialsCarousel() {
  const testimonials = [
    { quote: "AAA is knowledgeable, up to date with the latest tools, and genuinely focused on delivering real value. Highly recommend!", name: "Manjula", company: "Limes Digital" },
    { quote: "Best investment we've made this year. The AAA team took the time to understand my business and built something that actually works.", name: "Jenelle", company: "Encompassed Energy" },
    { quote: "AAA has such a strong understanding of AI and how to actually apply it in business. Everything feels clear, practical and easy to implement! Highly recommend! Thankyou!", name: "Megan", company: "The Hair Academy by Meagan Ellise" },
    { quote: "AAA has really helped me with the fundamentals of AI to help me bring my business to the next step. I'm looking forward to continuing to learn more as we go.", name: "Sam", company: "Sip With Sam" }];
  const [idx, setIdx] = useState(testimonials.length - 1);
  const containerRef = useRef(null);
  const [cardW, setCardW] = useState(420);
  const [centerPad, setCenterPad] = useState(0);
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        const cw = Math.min(460, Math.max(280, w * 0.32));
        setCardW(cw);
        setCenterPad((w - cw) / 2);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    const id = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 8000);
    return () => { clearInterval(id); window.removeEventListener("resize", measure); };
  }, []);
  const step = cardW + 20;
  const slides = testimonials.concat(testimonials);
  const go = (dir) => setIdx((i) => (i + dir + testimonials.length) % testimonials.length);
  return (
    <div>
      <div ref={containerRef} style={{ overflow: "hidden", width: "100%" }}>
        <div style={{ display: "flex", gap: 20, transition: "transform 0.7s cubic-bezier(.4,.2,.2,1)", transform: `translateX(${centerPad - idx * step}px)` }}>
          {slides.map((t, i) =>
          <div key={i} className="testimonial-card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "32px 28px", flex: `0 0 ${cardW}px`, minHeight: 360, display: "flex", flexDirection: "column", opacity: i % testimonials.length === idx ? 1 : 0.45, transition: "opacity 0.5s ease" }}>
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none" style={{ marginBottom: 18 }}><path d="M0 20V12C0 5.4 3.6 1.4 10.8 0L12 2.4C9.2 3.2 7.2 4.4 6 6C5 7.2 4.6 8.6 4.8 10H8V20H0ZM16 20V12C16 5.4 19.6 1.4 26.8 0L28 2.4C25.2 3.2 23.2 4.4 22 6C21 7.2 20.6 8.6 20.8 10H24V20H16Z" fill="#00bfff" opacity="0.3" /></svg>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 24px", fontStyle: "italic", flex: 1 }}>"{t.quote}"</p>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", margin: "0 0 2px" }}>{t.name}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#00bfff", margin: 0 }}>{t.company}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, marginTop: 32 }}>
        <button onClick={() => go(-1)} aria-label="Previous" style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.25s", padding: 0 }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#ec4899"; e.currentTarget.style.background = "rgba(236,72,153,0.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {testimonials.map((_, i) =>
          <button key={i} onClick={() => setIdx(i)} aria-label={`Go to ${i + 1}`} style={{ width: i === idx ? 28 : 8, height: 8, borderRadius: 4, background: i === idx ? "#ec4899" : "rgba(255,255,255,0.18)", border: "none", padding: 0, cursor: "pointer", transition: "all 0.35s" }} />
          )}
        </div>
        <button onClick={() => go(1)} aria-label="Next" style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.25s", padding: 0 }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#ec4899"; e.currentTarget.style.background = "rgba(236,72,153,0.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
    </div>);
}

function About() {
  const stats = [
    { num: "$40M+", label: "Client revenue scaled" },
    { num: "$25M+", label: "Personal sales contribution" },
    { num: "10+ yrs", label: "Business growth strategy" }];
  return (
    <section id="about" style={{ background: "#0a1020", padding: "120px clamp(20px,5vw,60px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "10%", right: "-5%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(236,72,153,0.10) 0%,transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "5%", left: "-5%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,191,255,0.08) 0%,transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>

        <FadeIn>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#00bfff", background: "rgba(0,191,255,0.07)", border: "1px solid rgba(0,191,255,0.15)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>Meet the Founder</div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(29px,3.85vw,48px)", color: "#fff", letterSpacing: "-1px", margin: "0 0 32px", lineHeight: 1.15, maxWidth: 760 }}>
            Helping businesses grow <span style={{ background: "linear-gradient(90deg,#ec4899,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>without drowning in operations.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, margin: "0 0 44px", padding: "20px 0", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", maxWidth: 720 }}>
            {stats.map((s, i) =>
            <div key={i}>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(20px,2.2vw,26px)", color: "#fff", letterSpacing: "-0.5px", marginBottom: 4 }}>{s.num}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.3px" }}>{s.label}</div>
            </div>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="about-body-grid" style={{ display: "grid", gridTemplateColumns: "1fr minmax(280px,360px)", gap: 40, alignItems: "start" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.65)" }}>
              <p style={{ margin: "0 0 18px" }}>Amber Hills is the founder of AI Automation Australia, helping founder-led businesses simplify operations, reduce overwhelm, and implement practical AI systems that genuinely support the way they work.</p>
              <p style={{ margin: "0 0 18px" }}>With a background in <span style={{ color: "#fff" }}>organisational psychology</span> and more than a decade in business growth strategy, Amber has helped service-based businesses across Australia scale to <span style={{ color: "#fff" }}>more than $40M in revenue</span>, while personally contributing to <span style={{ color: "#fff" }}>over $25M in client sales</span> through sales psychology, operational strategy, and business systems design.</p>
              <p style={{ margin: "0 0 18px" }}>But behind that growth, she experienced firsthand the pressure that often comes with scaling a business — operational bottlenecks, constant decision-making, communication overload, and the mental weight many business owners quietly carry every day.</p>
              <div style={{ position: "relative", padding: "4px 0 4px 22px", margin: "0 0 18px" }}>
                <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg,#ec4899,#a855f7)", borderRadius: 2 }} />
                <p style={{ margin: 0, color: "rgba(255,255,255,0.85)", fontStyle: "italic" }}>After experiencing severe burnout and stress-related hospitalisations, Amber began rethinking the way businesses approach growth, systems, and technology.</p>
              </div>
              <p style={{ margin: 0 }}>Today, her work focuses on helping everyday business owners navigate AI without the confusion, hype, or unnecessary complexity. Through practical strategy, implementation guidance, and operational frameworks, she helps businesses create smoother workflows, reduce mental load, and build more sustainable ways of working.</p>
            </div>
            <figure style={{ margin: 0, padding: 0, position: "sticky", top: 100 }}>
              <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "4 / 5", background: "#0d1424", border: "1px solid rgba(255,255,255,0.10)" }}>
                <img src="assets/amber.png" alt="Amber Hills, founder of AI Automation Australia" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 55%,rgba(10,16,32,0.92) 100%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", left: 18, right: 18, bottom: 16 }}>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", margin: "0 0 2px", letterSpacing: "-0.4px" }}>Amber Hills</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#00bfff", margin: 0, letterSpacing: "0.5px" }}>Founder · AI Automation Australia</p>
                </div>
              </div>
            </figure>
          </div>
        </FadeIn>

      </div>
      <style>{`@media(max-width:780px){.about-body-grid{grid-template-columns:1fr!important}.about-body-grid > figure{position:static!important;max-width:340px;margin:0 auto!important}}`}</style>
    </section>);
}

function WhyUs() {
  return (
    <section id="why-us" style={{ background: "#0d1424", padding: "100px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#00bfff", background: "rgba(0,191,255,0.07)", border: "1px solid rgba(0,191,255,0.15)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>Why Us</div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(29px,3.85vw,48px)", color: "#fff", letterSpacing: "-1px", margin: "0 0 20px", lineHeight: 1.15, maxWidth: 680 }}>
            You don't need more tools.<br />You need the <span style={{ color: "#00bfff" }}>right plan</span> — and the right team.
          </h2>
        </FadeIn>
        <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 48 }}>
          <FadeIn delay={0.15}>
            <div className="card-hover" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px 28px" }}>
              <div style={{ marginBottom: 20 }} dangerouslySetInnerHTML={{ __html: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00bfff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 14l8-3 4 9-3 1z"/><path d="M14 11l6-2 2 4-6 2"/><line x1="12" y1="19" x2="8" y2="22"/><line x1="12" y1="19" x2="14" y2="22"/></svg>` }} />
              <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 20, color: "#fff", margin: "0 0 14px" }}>Holistic Business View</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: 0 }}>We don't just look at AI. We look at your entire business — sales, operations, and delivery — so automation actually works in the real world, not just on a slide deck.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="card-hover" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px 28px" }}>
              <div style={{ marginBottom: 20 }} dangerouslySetInnerHTML={{ __html: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00bfff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="17"/><line x1="9" y1="9" x2="9" y2="9.01"/><line x1="15" y1="9" x2="15" y2="9.01"/><line x1="9" y1="13" x2="9" y2="13.01"/><line x1="15" y1="13" x2="15" y2="13.01"/><path d="M10 21v-4h4v4"/></svg>` }} />
              <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 20, color: "#fff", margin: "0 0 14px" }}>Industry Experience</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: 0 }}>We've worked across service-based industries including NDIS and healthcare, construction and real estate. We know how to create efficiency without breaking what's already working.</p>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.3}>
          <div style={{ margin: "48px 0", textAlign: "center" }}>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "clamp(18px,2.5vw,26px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.5, margin: 0 }}>
              Most businesses don't fail because they ignore AI.<br />
              <span style={{ color: "#fff" }}>They fail because they implement the wrong things.</span><br />
              <span style={{ background: "linear-gradient(90deg,#ec4899,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>We make sure you don't.</span>
            </p>
          </div>
        </FadeIn>

        <div style={{ width: "100%" }}>
          <TestimonialsCarousel />
        </div>
      </div>
      <style>{`@media(max-width:768px){.why-grid{grid-template-columns:1fr!important}}`}</style>
    </section>);

}

function Pricing() {
  return (
    <section style={{ background: "#0a1020", padding: "100px clamp(20px,5vw,60px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,191,255,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <FadeIn>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#00bfff", background: "rgba(0,191,255,0.07)", border: "1px solid rgba(0,191,255,0.15)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>Start With Clarity</div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="card-hover" style={{ background: "linear-gradient(135deg,rgba(0,191,255,0.07),rgba(168,85,247,0.05))", border: "1px solid rgba(0,191,255,0.18)", borderRadius: 20, padding: "52px 48px" }}>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(24px,3.3vw,37px)", color: "#fff", margin: "0 0 8px", letterSpacing: "-0.5px" }}>AI Business Audit + Roadmap</h2>
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
              <a href={CALENDLY} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "1px", color: "#000", background: "linear-gradient(90deg,#ec4899,#a855f7)", padding: "17px 48px", borderRadius: 10, textDecoration: "none", textTransform: "uppercase", display: "inline-block", boxShadow: "0 0 40px rgba(0,191,255,0.3)", transition: "all 0.3s" }}
              onMouseEnter={(e) => {e.currentTarget.style.boxShadow = "0 0 60px rgba(0,191,255,0.5)";e.currentTarget.style.transform = "translateY(-2px)";}}
              onMouseLeave={(e) => {e.currentTarget.style.boxShadow = "0 0 40px rgba(0,191,255,0.3)";e.currentTarget.style.transform = "translateY(0)";}}>
                Get Your AI Roadmap</a>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.25}>
          <div style={{ marginTop: 56 }}>
            <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "clamp(22px,2.75vw,33px)", color: "rgba(255,255,255,0.85)", marginBottom: 16, letterSpacing: "-0.5px" }}>Don't spend the next 3–6 months figuring this out alone.

            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.45)", marginBottom: 28 }}>You don't need more information. You just need a clear plan.</p>
            <a href={CALENDLY} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#00bfff", border: "1px solid rgba(0,191,255,0.3)", padding: "12px 32px", borderRadius: 8, textDecoration: "none", display: "inline-block", transition: "all 0.3s" }}
            onMouseEnter={(e) => {e.currentTarget.style.background = "rgba(0,191,255,0.08)";}}
            onMouseLeave={(e) => {e.currentTarget.style.background = "transparent";}}>
              Book a Call</a>
          </div>
        </FadeIn>
      </div>
    </section>);

}

function FAQItem({ q, a, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="card-hover" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${open ? "rgba(0,191,255,0.35)" : "rgba(255,255,255,0.08)"}`, borderRadius: 14, padding: "4px 4px", marginBottom: 14, transition: "border-color 0.3s ease" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", background: "transparent", border: "none", padding: "22px 26px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, cursor: "pointer", textAlign: "left" }}>
        <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 17, color: "#fff", letterSpacing: "-0.2px", lineHeight: 1.4 }}>{q}</span>
        <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: open ? "linear-gradient(135deg,#00bfff,#a855f7)" : "rgba(0,191,255,0.1)", border: open ? "none" : "1px solid rgba(0,191,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={open ? "#000" : "#00bfff"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      <div style={{ maxHeight: open ? 600 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
        <div style={{ padding: "0 26px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, whiteSpace: "pre-line" }}>{a}</div>
      </div>
    </div>);
}

function FAQ() {
  const faqs = [
  { q: "Is this actually useful for small businesses?", a: "Yes — especially for businesses already experiencing operational bottlenecks, repetitive admin, communication overload, or growing complexity.\n\nMost businesses don't need dozens of AI tools. They need clarity around where automation can genuinely save time, reduce friction, and support the way their business already works." },
  { q: "What happens during the AI Business Audit?", a: "We take a detailed look at your workflows, operations, communication systems, and day-to-day processes to identify where AI and automation could create the biggest impact.\n\nFrom there, we create a prioritised roadmap tailored to your business, goals, and current systems." },
  { q: "How long does it take to receive the roadmap?", a: "Most roadmap documents are delivered within 7 business days following your audit session." },
  { q: "Will I need a developer?", a: "Not always.\n\nSome businesses can implement simple improvements internally using existing tools and workflows. More advanced automations or custom integrations may require technical support.\n\nIf needed, we can connect you with trusted developers from our vetted network based on your business requirements and budget." },
  { q: "Can I implement the roadmap myself?", a: "Absolutely.\n\nThe roadmap is designed to give you clear, practical direction whether you choose to implement internally, work with your own team, learn through workshops, or engage external support." },
  { q: "How much does implementation usually cost?", a: "Implementation costs vary depending on the complexity of your business, systems, and goals.\n\nSome businesses may only require simple workflow improvements using existing tools, while others may choose to invest in more advanced custom automations.\n\nOur role is to help you understand what's worth doing first — before you spend unnecessary money on tools or development." },
  { q: "Do I need technical knowledge or AI experience?", a: "No.\n\nWe work with many non-technical business owners who simply want practical guidance without the overwhelm, jargon, or complexity that often surrounds AI." },
  { q: "What types of businesses do you work with?", a: "We primarily work with founder-led and service-based businesses looking to improve operational efficiency, reduce manual workload, and create more sustainable systems for growth." },
  { q: "What if my business changes after the roadmap is created?", a: "That's completely normal.\n\nThe roadmap is designed to provide strategic direction and prioritised next steps — not lock your business into rigid systems. AI implementation should evolve alongside your business over time." },
  { q: "Are there ongoing software or subscription costs?", a: "Potentially, depending on the tools and systems recommended.\n\nPart of our process is helping you avoid unnecessary subscriptions and identify the most practical, cost-effective solutions for your business stage and goals." },
  { q: "Do you build the automations yourselves?", a: "Our primary focus is strategy, operational clarity, and implementation guidance.\n\nWhere technical implementation is required, we can connect you with trusted developers and specialists from our vetted network." }];

  return (
    <section id="faq" style={{ background: "#0d1424", padding: "100px clamp(20px,5vw,60px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "20%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,0.06),transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }}></div>
      <div style={{ position: "absolute", bottom: "10%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,191,255,0.05),transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }}></div>
      <div style={{ maxWidth: 880, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <FadeIn>
            <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#00bfff", background: "rgba(0,191,255,0.07)", border: "1px solid rgba(0,191,255,0.15)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>FAQ</div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(31px,3.85vw,48px)", color: "#fff", letterSpacing: "-1px", margin: "0 0 16px", lineHeight: 1.15 }}>
              Frequently Asked <span style={{ background: "linear-gradient(90deg,#00bfff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Questions</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: "0 auto", maxWidth: 560 }}>
              Everything you need to know before getting started. Still have questions? <a href={CALENDLY} target="_blank" rel="noreferrer" style={{ color: "#00bfff", textDecoration: "none", fontWeight: 600 }}>Book a call</a>.
            </p>
          </FadeIn>
        </div>
        <div>
          {faqs.map((f, i) =>
          <FadeIn key={i} delay={0.05 * i}>
              <FAQItem q={f.q} a={f.a} defaultOpen={i === 0} />
            </FadeIn>
          )}
        </div>
      </div>
    </section>);
}

function Footer() {
  const socials = [
  { href: "https://www.linkedin.com/company/ai-automation-australia/about/", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg> },
  { href: "https://www.facebook.com/aiautomationaustralia/", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
  { href: "https://www.instagram.com/aiautomation.aus?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
  { href: "https://www.youtube.com/@aiautomationaustralia", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#030305" /></svg> }];

  return (
    <footer id="contact" style={{ background: "#070b14", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "60px clamp(20px,5vw,60px) 40px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div className="footer-top" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "start", marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <img src="assets/aaa-logo-white.png" alt="AI Automation Australia" style={{ height: 46, width: "auto", display: "block" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="tel:0432259239" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s", display: "inline-flex", alignItems: "center", gap: 10 }} onMouseEnter={(e) => e.currentTarget.style.color = "#fff"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>0432 259 239</a>
              <a href="mailto:scale@aiaustralia.online" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s", display: "inline-flex", alignItems: "center", gap: 10 }} onMouseEnter={(e) => e.currentTarget.style.color = "#fff"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>scale@aiaustralia.online</a>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {socials.map((s, i) =>
            <a key={i} href={s.href} target="_blank" rel="noreferrer" style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={(e) => {e.currentTarget.style.background = "rgba(0,191,255,0.1)";e.currentTarget.style.color = "#00bfff";e.currentTarget.style.borderColor = "rgba(0,191,255,0.3)";}}
            onMouseLeave={(e) => {e.currentTarget.style.background = "rgba(255,255,255,0.04)";e.currentTarget.style.color = "rgba(255,255,255,0.5)";e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";}}>
              {s.icon}</a>
            )}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.25)", margin: 0 }}>© 2026 AI Automation Australia. All rights reserved.</p>
          <a href="https://aiaustralia.online/terms" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.25)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "rgba(255,255,255,0.5)"} onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.25)"}>Terms & Conditions</a>
        </div>
      </div>
      <style>{`@media(max-width:768px){.footer-top{grid-template-columns:1fr!important}}`}</style>
    </footer>);

}

function WorkshopPopup() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-workshop-popup", onOpen);
    return () => window.removeEventListener("open-workshop-popup", onOpen);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);
  if (!open) return null;
  const checks = [
    { color: "#00bfff", lead: "Free guide:", body: "The Australian Business Owner's AI Starter Checklist" },
    { color: "#a855f7", lead: "", body: "A live walkthrough of the 5 highest-impact automations for service businesses" },
    { color: "#ec4899", lead: "", body: "Your questions answered in real time" }];
  return (
    <div role="dialog" aria-modal="true" aria-label="Free AI Workshop"
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(5,8,18,0.78)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "fadeIn 0.35s ease both" }}
      onClick={() => setOpen(false)}>
      <div className="workshop-popup" onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", width: "100%", maxWidth: 980, background: "#0a1020", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 30px 80px rgba(0,0,0,0.6),0 0 60px rgba(168,85,247,0.15)", display: "grid", gridTemplateColumns: "minmax(0,420px) minmax(0,1fr)", maxHeight: "92vh", animation: "popIn 0.45s cubic-bezier(.2,.8,.2,1) both" }}>

        <div className="workshop-popup-img" style={{ position: "relative", background: "#0d1424", minHeight: 380 }}>
          <img src="assets/amber.png" alt="Amber Hills speaking on stage" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 55%", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent 60%,rgba(10,16,32,0.85) 100%)", pointerEvents: "none" }} />
        </div>

        <div style={{ padding: "44px clamp(28px,3.5vw,48px)", overflowY: "auto", position: "relative" }}>
          <button onClick={() => setOpen(false)} aria-label="Close"
            style={{ position: "absolute", top: 18, right: 18, width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.65)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>

          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(24px,2.6vw,32px)", color: "#fff", letterSpacing: "-0.5px", lineHeight: 1.2, margin: "0 0 6px" }}>
            Not sure where to start with AI?
          </h2>
          <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(24px,2.6vw,32px)", letterSpacing: "-0.5px", lineHeight: 1.2, margin: "0 0 22px", background: "linear-gradient(90deg,#ec4899,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            We'll show you exactly.
          </h3>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", margin: "0 0 26px" }}>
            Join our free live workshop on <span style={{ color: "#fff", fontWeight: 600 }}>Thursday 21st May at 11am</span> and walk away with a clear starting point for transforming your business with AI.
          </p>

          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#00bfff", marginBottom: 14 }}>What you'll get</div>

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 14 }}>
            {checks.map((c, i) =>
            <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{ flex: "0 0 22px", width: 22, height: 22, borderRadius: "50%", border: `1.5px solid ${c.color}`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, lineHeight: 1.55, color: "rgba(255,255,255,0.78)", margin: 0 }}>
                {c.lead && <span style={{ color: "#fff", fontWeight: 700 }}>{c.lead} </span>}{c.body}
              </p>
            </li>
            )}
          </ul>

          <a href={WORKSHOP_FORM} target="_blank" rel="noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "1.2px", textTransform: "uppercase", color: "#fff", background: "linear-gradient(90deg,#ec4899,#a855f7)", padding: "18px 28px", borderRadius: 10, textDecoration: "none", boxShadow: "0 10px 30px rgba(236,72,153,0.30),0 0 60px rgba(168,85,247,0.15)", transition: "transform 0.2s, box-shadow 0.3s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(236,72,153,0.45),0 0 70px rgba(168,85,247,0.25)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(236,72,153,0.30),0 0 60px rgba(168,85,247,0.15)"; }}>
            Save My Seat — It's Free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", textAlign: "center", margin: "16px 0 0" }}>
            No spam. Just the workshop details and your free guide.
          </p>
        </div>
      </div>
      <style>{`
        @keyframes popIn{from{opacity:0;transform:translateY(20px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @media(max-width:760px){
          .workshop-popup{grid-template-columns:1fr!important;max-height:94vh!important}
          .workshop-popup-img{min-height:200px!important;max-height:220px}
          .workshop-popup-img > div{background:linear-gradient(180deg,transparent 50%,rgba(10,16,32,0.95) 100%)!important}
        }
      `}</style>
    </div>);
}

function WorkshopFloatingButton() {
  return (
    <button onClick={() => window.dispatchEvent(new Event("open-workshop-popup"))} aria-label="Open free workshop signup"
      style={{ position: "fixed", right: 20, bottom: 20, zIndex: 900, display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 24px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "1.2px", textTransform: "uppercase", color: "#000", background: "linear-gradient(90deg,#ec4899,#a855f7)", boxShadow: "0 10px 30px rgba(236,72,153,0.30),0 0 50px rgba(168,85,247,0.18)", transition: "transform 0.2s, box-shadow 0.3s" }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(236,72,153,0.45),0 0 70px rgba(168,85,247,0.30)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(236,72,153,0.30),0 0 50px rgba(168,85,247,0.18)"; }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#000" aria-hidden="true">
        <path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2z" />
        <path d="M19 14l0.7 2.3L22 17l-2.3 0.7L19 20l-0.7-2.3L16 17l2.3-0.7L19 14z" opacity="0.85" />
      </svg>
      Free Workshop
    </button>);
}

function App() {
  return (
    <React.Fragment>
      <WorkshopPopup />
      <WorkshopFloatingButton />
      <Nav />
      <Hero />
      <ProblemSolution />
      <Services />
      <HowItWorks />
      <Outcome />
      <WhyUs />
      <About />
      <Pricing />
      <FAQ />
      <Footer />
    </React.Fragment>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);