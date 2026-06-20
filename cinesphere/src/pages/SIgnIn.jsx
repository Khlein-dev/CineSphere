import { useState, useEffect } from "react";

/* ─── DESIGN TOKENS (shared with CineSphere) ──────────────────── */
const T = {
    bg: "#04040a",
    bgCard: "#0c0c16",
    accent: "#e85d04",
    gold: "#ffb703",
    text: "#e8e0d8",
    font: "'Syne', sans-serif",
    body: "'DM Sans', sans-serif",
};

function hexToRgb(hex) {
    const h = hex.replace("#", "");
    const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
    return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

const HERO_BACKDROP = "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg";
const NOW_STREAMING = [
    { title: "Coco", img: "https://image.tmdb.org/t/p/w200/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg" },
    { title: "Spider-Verse", img: "https://image.tmdb.org/t/p/w200/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg" },
    { title: "WALL·E", img: "https://image.tmdb.org/t/p/w200/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg" },
    { title: "Inception", img: "https://image.tmdb.org/t/p/w200/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg" },
];

/* ─── GLOBAL STYLES ─────────────────────────────────────────── */
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root { --accent: #e85d04; --gold: #ffb703; }

    body, #root {
      background: #04040a;
      color: #e8e0d8;
      font-family: 'DM Sans', sans-serif;
      overflow-x: hidden;
    }
    button, input { font-family: inherit; }

    body::before {
      content: '';
      position: fixed; inset: 0;
      background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.011) 2px, rgba(255,255,255,0.011) 4px);
      pointer-events: none; z-index: 9998;
    }
    body::after {
      content: '';
      position: fixed; inset: -50%; width: 200%; height: 200%;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.028; pointer-events: none;
      animation: grain 8s steps(10) infinite; z-index: 9997;
    }

    a:focus, button:focus, input:focus { outline: none; }
    a:focus-visible, button:focus-visible, input:focus-visible {
      outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 2px;
    }

    @keyframes grain {
      0%,100% { transform: translate(0,0); }
      10% { transform: translate(-2%,-3%); }
      20% { transform: translate(3%,1%); }
      30% { transform: translate(-1%,4%); }
      40% { transform: translate(2%,-2%); }
      50% { transform: translate(-3%,2%); }
      60% { transform: translate(1%,-4%); }
      70% { transform: translate(-2%,3%); }
      80% { transform: translate(3%,-1%); }
      90% { transform: translate(-1%,2%); }
    }
    @keyframes fadeUp { from{opacity:0; transform:translateY(26px);} to{opacity:1; transform:translateY(0);} }
    @keyframes slideInLeft { from{opacity:0; transform:translateX(-32px);} to{opacity:1; transform:translateX(0);} }
    @keyframes scanX { 0%{transform:translateX(-100%);} 100%{transform:translateX(500%);} }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes shake {
      10%,90% { transform: translateX(-1px); }
      20%,80% { transform: translateX(2px); }
      30%,50%,70% { transform: translateX(-4px); }
      40%,60% { transform: translateX(4px); }
    }

    .font-syne { font-family: 'Syne', sans-serif; }
    .animate-fadeUp { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
    .animate-slideInLeft { animation: slideInLeft 0.6s cubic-bezier(0.22,1,0.36,1) both; }
    .delay-100 { animation-delay: .1s; } .delay-200 { animation-delay: .2s; } .delay-300 { animation-delay: .3s; }

    /* sprocket divider — film-perforation seam between panels */
    .sprocket {
      width: 28px; flex: 0 0 28px;
      background-color: #020208;
      background-image: radial-gradient(circle, rgba(255,255,255,0.16) 3px, transparent 3.6px);
      background-size: 100% 30px;
      background-position: center 8px;
      background-repeat: repeat-y;
      position: relative;
    }
    .sprocket::before, .sprocket::after {
      content: ''; position: absolute; top: 0; bottom: 0; width: 1px;
      background: rgba(255,255,255,0.05);
    }
    .sprocket::before { left: 6px; } .sprocket::after { right: 6px; }

    .auth-input {
      width: 100%; background: rgba(255,255,255,0.045);
      border: 1px solid rgba(255,255,255,0.12); border-radius: 3px;
      color: #fff; font-size: 14px; padding: 13px 16px;
      transition: border-color 0.2s ease, background 0.2s ease;
    }
    .auth-input.has-action { padding-right: 44px; }
    .auth-input:focus { border-color: rgba(232,93,4,0.55); background: rgba(255,255,255,0.07); }
    .auth-input::placeholder { color: rgba(255,255,255,0.28); }
    .auth-input.invalid { border-color: rgba(239,68,68,0.55); }

    .auth-label {
      display: block; font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase;
      color: rgba(255,255,255,0.42); font-family: 'Syne', sans-serif; font-weight: 700;
      margin-bottom: 8px;
    }

    .eye-btn {
      position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
      background: none; border: none; color: rgba(255,255,255,0.4); cursor: pointer;
      display: flex; align-items: center; padding: 4px; transition: color 0.2s;
    }
    .eye-btn:hover { color: rgba(255,255,255,0.75); }

    .auth-checkbox { display: flex; align-items: center; gap: 9px; cursor: pointer; font-size: 13px; color: rgba(255,255,255,0.55); user-select: none; }

    .auth-primary-btn {
      width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
      background: var(--accent); color: #fff; border: none; padding: 14px 0;
      font-size: 12.5px; font-family: 'Syne', sans-serif; font-weight: 700;
      letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer;
      clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
      transition: filter 0.2s ease, transform 0.2s ease, opacity 0.2s ease;
    }
    .auth-primary-btn:hover:not(:disabled) { filter: brightness(1.15); transform: translateY(-1px); }
    .auth-primary-btn:disabled { opacity: 0.7; cursor: default; }

    .social-btn {
      flex: 1; display: flex; align-items: center; justify-content: center; gap: 9px;
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12);
      color: rgba(255,255,255,0.72); padding: 11px 0; font-size: 12.5px;
      font-family: 'DM Sans', sans-serif; font-weight: 500; cursor: pointer; border-radius: 3px;
      transition: all 0.2s ease;
    }
    .social-btn:hover { border-color: rgba(232,93,4,0.45); background: rgba(232,93,4,0.07); color: #fff; }

    .spinner {
      width: 15px; height: 15px; border-radius: 50%;
      border: 2px solid rgba(255,255,255,0.35); border-top-color: #fff;
      animation: spin 0.7s linear infinite;
    }

    .shake { animation: shake 0.4s ease; }

    .mobile-brand { display: none; }

    @media (max-width: 880px) {
      .auth-visual { display: none; }
      .sprocket { display: none; }
      .mobile-brand { display: flex; }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
      }
      body::after { display: none; }
    }
  `}</style>
);

/* ─── BRAND MARK ─────────────────────────────────────────────── */
function BrandMark({ light }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <div style={{ width: 32, height: 32, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)", flexShrink: 0 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M4 3.5A1.5 1.5 0 015.5 2h7.379a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0118.5 7.622V20.5A1.5 1.5 0 0117 22H5.5A1.5 1.5 0 014 20.5v-17z" /></svg>
            </div>
            <span style={{ fontFamily: T.font, fontWeight: 800, fontSize: 16, letterSpacing: "0.28em", color: light ? "#fff" : T.text, textTransform: "uppercase" }}>CineSphere</span>
        </div>
    );
}

/* ─── LEFT VISUAL PANEL ──────────────────────────────────────── */
function AuthVisual() {
    return (
        <div className="auth-visual" style={{ position: "relative", flex: 1.15, minHeight: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "44px 52px" }}>
            <img
                src={HERO_BACKDROP} alt=""
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", filter: "brightness(0.32) saturate(0.7)" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(4,4,10,0.92) 18%, rgba(4,4,10,0.55) 60%, rgba(4,4,10,0.85) 100%), linear-gradient(to top, rgba(4,4,10,0.95) 0%, transparent 55%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 70% at 25% 25%, rgba(232,93,4,0.16) 0%, transparent 70%)" }} />
            <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: 0, bottom: 0, width: "18%", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.012),transparent)", animation: "scanX 6s ease-in-out infinite" }} />
            </div>

            <div style={{ position: "relative", zIndex: 2 }} className="animate-fadeUp">
                <BrandMark light />
            </div>

            <div style={{ position: "relative", zIndex: 2, maxWidth: 460 }} className="animate-slideInLeft delay-100">
                <span style={{ fontSize: 11, letterSpacing: "0.3em", color: "var(--accent)", textTransform: "uppercase", fontFamily: T.font, fontWeight: 700 }}>Member Access</span>
                <h1 className="font-syne" style={{ fontSize: "clamp(1.9rem,3.4vw,2.7rem)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.02em", color: "#fff", margin: "16px 0 16px" }}>
                    Every story plays better on the big screen.
                </h1>
                <p style={{ fontSize: 14.5, lineHeight: 1.8, color: "rgba(232,224,216,0.55)", fontStyle: "italic", fontWeight: 300, maxWidth: 380 }}>
                    Sign in to pick up your watchlist, resume what you started, and keep building the queue.
                </p>
            </div>

            <div style={{ position: "relative", zIndex: 2 }} className="animate-fadeUp delay-200">
                <span style={{ fontSize: 10, letterSpacing: "0.28em", color: "rgba(255,255,255,0.32)", textTransform: "uppercase", fontFamily: T.font, fontWeight: 700, display: "block", marginBottom: 14 }}>
                    Now Streaming
                </span>
                <div style={{ display: "flex", gap: 10 }}>
                    {NOW_STREAMING.map(m => (
                        <div key={m.title} title={m.title} style={{ width: 56, aspectRatio: "2/3", borderRadius: 4, overflow: "hidden", border: "1px solid rgba(255,255,255,0.14)", opacity: 0.85 }}>
                            <img src={m.img} alt={m.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─── SOCIAL ICONS ───────────────────────────────────────────── */
function GoogleIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="9" />
            <text x="12" y="15.5" textAnchor="middle" fontSize="10" fill="currentColor" stroke="none" fontFamily="Syne, sans-serif" fontWeight="700">G</text>
        </svg>
    );
}
function AppleIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.7 12.7c0-2 1.05-3.5 2.65-4.5-.95-1.4-2.4-2.15-4.2-2.2-1.6-.05-3.05.95-3.85.95-.85 0-2.15-.9-3.55-.9-2.45.05-4.75 1.95-4.75 5.7 0 2.1.8 4.3 1.85 5.75 1 1.4 2 2.9 3.45 2.85 1.3-.05 1.85-.85 3.45-.85 1.6 0 2.1.85 3.5.8 1.45-.05 2.35-1.3 3.3-2.7.6-.85 1.05-1.7 1.35-2.6-1.85-.8-3.2-2.4-3.2-3.3z" />
            <path d="M13.6 4.1c.05-1.05.45-1.95 1.15-2.6-.7.05-1.55.5-2.1 1.15-.5.6-.95 1.5-.85 2.45.9.05 1.75-.45 1.8-1z" />
        </svg>
    );
}

/* ─── FORM FIELD ─────────────────────────────────────────────── */
function FormField({ label, id, type = "text", value, onChange, placeholder, autoComplete, invalid, rightSlot }) {
    return (
        <div style={{ marginBottom: 18 }}>
            <label htmlFor={id} className="auth-label">{label}</label>
            <div style={{ position: "relative" }}>
                <input
                    id={id} name={id} type={type} value={value} onChange={onChange}
                    placeholder={placeholder} autoComplete={autoComplete}
                    className={`auth-input${rightSlot ? " has-action" : ""}${invalid ? " invalid" : ""}`}
                />
                {rightSlot}
            </div>
        </div>
    );
}

/* ─── ROOT: SIGN IN PAGE ─────────────────────────────────────── */
export default function SignIn({ onBack }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [remember, setRemember] = useState(false);
    const [status, setStatus] = useState("idle"); // idle | loading | error | success
    const [errorMsg, setErrorMsg] = useState("");
    const [shake, setShake] = useState(false);

    const triggerError = (msg) => {
        setErrorMsg(msg);
        setStatus("error");
        setShake(true);
        setTimeout(() => setShake(false), 420);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            triggerError("Enter your email and password to continue.");
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            triggerError("That email address doesn't look right.");
            return;
        }
        if (password.length < 6) {
            triggerError("Password must be at least 6 characters.");
            return;
        }
        setStatus("loading");
        setTimeout(() => setStatus("success"), 1300);
    };

    const accentRgb = hexToRgb(T.accent);

    useEffect(() => {
        if (status === "success" && onBack) {
            const t = setTimeout(() => onBack(), 1700);
            return () => clearTimeout(t);
        }
    }, [status, onBack]);

    return (
        <>
            <GlobalStyles />
            <div style={{ display: "flex", minHeight: "100vh", background: T.bg }}>
                <AuthVisual />

                <div className="sprocket" aria-hidden="true" />

                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 7%", position: "relative", minHeight: "100vh" }}>
                    <div style={{ width: "100%", maxWidth: 380 }}>

                        <div className="mobile-brand animate-fadeUp" style={{ marginBottom: 40 }}>
                            <BrandMark />
                        </div>

                        <a href="/" onClick={onBack ? (e) => { e.preventDefault(); onBack(); } : undefined} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "rgba(255,255,255,0.4)", textDecoration: "none", marginBottom: 30, letterSpacing: "0.04em" }}
                            onMouseOver={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
                            onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                            Back to CineSphere
                        </a>

                        {status === "success" ? (
                            <div className="animate-fadeUp" style={{ textAlign: "left" }}>
                                <div style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.4)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <h2 className="font-syne" style={{ fontSize: "1.7rem", fontWeight: 800, color: "#fff", marginBottom: 10 }}>You're in.</h2>
                                <p style={{ fontSize: 14, color: "rgba(232,224,216,0.5)", marginBottom: 24, lineHeight: 1.7 }}>
                                    Signed in as <strong style={{ color: T.text }}>{email}</strong>. Taking you to your watchlist.
                                </p>
                                <div style={{ height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
                                    <div style={{ height: "100%", width: "100%", background: "linear-gradient(90deg, var(--accent), var(--gold))", transformOrigin: "left" }} />
                                </div>
                            </div>
                        ) : (
                            <>
                                <span style={{ fontSize: 11, letterSpacing: "0.28em", color: "var(--accent)", textTransform: "uppercase", fontFamily: T.font, fontWeight: 700 }}>Welcome back</span>
                                <h2 className="font-syne" style={{ fontSize: "clamp(1.8rem,3vw,2.2rem)", fontWeight: 800, color: "#fff", margin: "12px 0 8px", letterSpacing: "-0.02em" }}>
                                    Sign in to continue
                                </h2>
                                <p style={{ fontSize: 13.5, color: "rgba(232,224,216,0.42)", marginBottom: 30 }}>
                                    New here? <a href="#" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Create an account</a>
                                </p>

                                <form onSubmit={handleSubmit} className={shake ? "shake" : ""} noValidate>
                                    <FormField
                                        label="Email" id="email" type="email" value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="you@email.com" autoComplete="email"
                                        invalid={status === "error" && !email.trim()}
                                    />
                                    <FormField
                                        label="Password" id="password" type={showPw ? "text" : "password"} value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="••••••••" autoComplete="current-password"
                                        invalid={status === "error" && (!password.trim() || password.length < 6)}
                                        rightSlot={
                                            <button type="button" className="eye-btn" onClick={() => setShowPw(s => !s)} aria-label={showPw ? "Hide password" : "Show password"}>
                                                {showPw ? (
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.94 10.94 0 0112 20c-5.5 0-9-4-10.5-8 .77-2.17 2.07-4.07 3.79-5.5M9.5 5.4A10.6 10.6 0 0112 5c5.5 0 9 4 10.5 8a13.7 13.7 0 01-2.3 3.6" /><path d="M9.9 9.9a3 3 0 104.2 4.2" /><path d="M2 2l20 20" /></svg>
                                                ) : (
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z" /><circle cx="12" cy="12" r="3" /></svg>
                                                )}
                                            </button>
                                        }
                                    />

                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 10 }}>
                                        <label className="auth-checkbox">
                                            <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
                                            <span style={{
                                                width: 16, height: 16, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center",
                                                border: remember ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.25)",
                                                background: remember ? "var(--accent)" : "transparent",
                                                boxShadow: remember ? "0 0 8px rgba(232,93,4,0.5)" : "none",
                                                transition: "all 0.2s", flexShrink: 0,
                                            }}>
                                                {remember && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2"><path d="M5 13l4 4L19 7" /></svg>}
                                            </span>
                                            Remember me
                                        </label>
                                        <a href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none" }}
                                            onMouseOver={e => e.currentTarget.style.color = "var(--accent)"}
                                            onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
                                        >Forgot password?</a>
                                    </div>

                                    {status === "error" && (
                                        <div role="alert" style={{
                                            display: "flex", alignItems: "flex-start", gap: 9, marginBottom: 20, padding: "10px 13px",
                                            background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 3,
                                        }}>
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.2" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>
                                            <span style={{ fontSize: 13, color: "#fca5a5" }}>{errorMsg}</span>
                                        </div>
                                    )}

                                    <button type="submit" className="auth-primary-btn" disabled={status === "loading"} style={{ marginBottom: 26, boxShadow: `0 14px 32px rgba(${accentRgb},0.25)` }}>
                                        {status === "loading" ? (<><span className="spinner" /> Signing in…</>) : (
                                            <>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                                                Sign In
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
                                    <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
                                    <span style={{ fontSize: 11, letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", fontFamily: T.font }}>or continue with</span>
                                    <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
                                </div>

                                <div style={{ display: "flex", gap: 12 }}>
                                    <button type="button" className="social-btn"><GoogleIcon /> Google</button>
                                    <button type="button" className="social-btn"><AppleIcon /> Apple</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}