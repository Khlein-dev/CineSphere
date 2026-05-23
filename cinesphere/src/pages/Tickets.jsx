import { useState, useEffect, useRef } from "react";

/* ─── DESIGN TOKENS ─────────────────────────────────────────── */
const T = {
    bg: "#04040a",
    bgCard: "#0c0c18",
    bgDeep: "#020208",
    accent: "#e85d04",
    accentRgb: "232,93,4",
    gold: "#ffb703",
    text: "#e8e0d8",
    muted: "rgba(232,224,216,0.38)",
    font: "'Syne', sans-serif",
    body: "'DM Sans', sans-serif",
};

/* ─── DATA ───────────────────────────────────────────────────── */
const MOVIES = [
    {
        id: 1,
        title: "The Dark Knight",
        genre: "ACTION · CRIME",
        rating: "9.0",
        duration: "152 min",
        year: "2008",
        img: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        accent: "#e85d04",
        accentRgb: "232,93,4",
        desc: "Batman faces the Joker, a criminal mastermind who plunges Gotham into anarchy.",
    },
    {
        id: 2,
        title: "Inception",
        genre: "SCI-FI · THRILLER",
        rating: "8.8",
        duration: "148 min",
        year: "2010",
        img: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        accent: "#4895ef",
        accentRgb: "72,149,239",
        desc: "A thief who steals secrets through dreams takes on one last impossible job.",
    },
    {
        id: 3,
        title: "Interstellar",
        genre: "SCI-FI · DRAMA",
        rating: "8.6",
        duration: "169 min",
        year: "2014",
        img: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
        accent: "#f4a261",
        accentRgb: "244,162,97",
        desc: "A team of explorers travel through a wormhole in space to save humanity.",
    },
    {
        id: 4,
        title: "Spider-Man: Into the Spider-Verse",
        genre: "ANIMATION · ACTION",
        rating: "8.4",
        duration: "117 min",
        year: "2018",
        img: "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
        accent: "#e63946",
        accentRgb: "230,57,70",
        desc: "Teen Miles Morales becomes Spider-Man and leaps into the multiverse.",
    },
    {
        id: 5,
        title: "Spirited Away",
        genre: "ANIMATION · FANTASY",
        rating: "8.6",
        duration: "125 min",
        year: "2001",
        img: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
        accent: "#2ec4b6",
        accentRgb: "46,196,182",
        desc: "A girl stumbles into a spirit world and must work to free herself and her parents.",
    },
    {
        id: 6,
        title: "WALL·E",
        genre: "ANIMATION · SCI-FI",
        rating: "8.4",
        duration: "98 min",
        year: "2008",
        img: "https://image.tmdb.org/t/p/w500/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg",
        accent: "#4cc9f0",
        accentRgb: "76,201,240",
        desc: "A lone robot falls in love and joins a journey that could save humanity.",
    },
];

const DATES = (() => {
    const d = [];
    const now = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (let i = 0; i < 7; i++) {
        const dt = new Date(now);
        dt.setDate(now.getDate() + i);
        d.push({
            id: i,
            day: dayNames[dt.getDay()],
            date: dt.getDate(),
            month: monthNames[dt.getMonth()],
        });
    }
    return d;
})();

const TIMES = ["10:30", "13:00", "15:45", "18:15", "20:30", "22:50"];

const FORMATS = ["Standard", "IMAX", "4DX"];

/* seat map: 9 rows × 14 cols  */
const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const COLS = 14;

function generateSeats() {
    const taken = new Set();
    while (taken.size < 28) taken.add(`${ROWS[Math.floor(Math.random() * 9)]}-${Math.floor(Math.random() * 14)}`);
    return taken;
}
const TAKEN_SEATS = generateSeats();

const PRICES = { Standard: 12.5, IMAX: 18.0, "4DX": 22.5 };

/* ─── GLOBAL STYLES ─────────────────────────────────────────── */
const TicketStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body,#root{
      background:#04040a;
      color:#e8e0d8;
      font-family:'DM Sans',sans-serif;
      overflow-x:hidden;
    }
    body::before{
      content:'';position:fixed;inset:0;
      background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.01) 2px,rgba(255,255,255,0.01) 4px);
      pointer-events:none;z-index:9998;
    }
    ::-webkit-scrollbar{width:3px;}
    ::-webkit-scrollbar-track{background:#04040a;}
    ::-webkit-scrollbar-thumb{background:rgba(232,93,4,0.4);border-radius:2px;}

    @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes scanX{0%{transform:translateX(-100%)}100%{transform:translateX(500%)}}
    @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
    @keyframes ticketIn{
      0%{opacity:0;transform:scale(0.88) rotateX(12deg)}
      100%{opacity:1;transform:scale(1) rotateX(0deg)}
    }
    @keyframes confirmPulse{
      0%,100%{box-shadow:0 0 0 0 rgba(232,93,4,0.5)}
      50%{box-shadow:0 0 0 10px rgba(232,93,4,0)}
    }
    @keyframes stepIn{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
    @keyframes dotBlink{0%,100%{opacity:1}50%{opacity:0.3}}

    .fade-up{animation:fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both;}
    .fade-in{animation:fadeIn 0.4s ease both;}
    .step-in{animation:stepIn 0.5s cubic-bezier(0.22,1,0.36,1) both;}
    .d1{animation-delay:.05s}.d2{animation-delay:.1s}.d3{animation-delay:.15s}
    .d4{animation-delay:.2s}.d5{animation-delay:.25s}.d6{animation-delay:.3s}

    .movie-pick-card{
      cursor:pointer;
      border:1px solid rgba(255,255,255,0.06);
      border-radius:6px;
      overflow:hidden;
      background:#0c0c18;
      transition:transform 0.38s cubic-bezier(0.34,1.56,0.64,1),
                 box-shadow 0.38s ease,
                 border-color 0.2s;
    }
    .movie-pick-card:hover{
      transform:translateY(-8px) scale(1.02);
      box-shadow:0 24px 56px rgba(0,0,0,0.75);
    }
    .movie-pick-card.selected{
      border-color:var(--sel-accent,#e85d04);
      box-shadow:0 0 0 1px var(--sel-accent,#e85d04),
                 0 20px 48px rgba(0,0,0,0.7);
    }

    .date-chip{
      flex:none;
      display:flex;flex-direction:column;align-items:center;
      padding:10px 16px;border-radius:4px;cursor:pointer;
      border:1px solid rgba(255,255,255,0.08);
      background:rgba(255,255,255,0.03);
      transition:all 0.22s ease;
    }
    .date-chip:hover{border-color:rgba(232,93,4,0.4);background:rgba(232,93,4,0.06);}
    .date-chip.selected{
      background:var(--accent);
      border-color:var(--accent);
      box-shadow:0 0 16px rgba(232,93,4,0.45);
    }

    .time-chip{
      padding:10px 20px;border-radius:3px;cursor:pointer;
      font-family:'Syne',sans-serif;font-size:13px;font-weight:600;
      border:1px solid rgba(255,255,255,0.08);
      background:rgba(255,255,255,0.03);
      color:rgba(255,255,255,0.55);
      transition:all 0.22s ease;
      clip-path:polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px));
    }
    .time-chip:hover{border-color:rgba(232,93,4,0.4);color:#fff;background:rgba(232,93,4,0.08);}
    .time-chip.selected{background:var(--accent);border-color:var(--accent);color:#fff;box-shadow:0 0 14px rgba(232,93,4,0.4);}

    .format-chip{
      padding:9px 22px;cursor:pointer;
      font-family:'Syne',sans-serif;font-size:11px;font-weight:700;
      letter-spacing:0.16em;text-transform:uppercase;
      border:1px solid rgba(255,255,255,0.1);
      background:transparent;color:rgba(255,255,255,0.38);
      transition:all 0.2s;
      clip-path:polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px));
    }
    .format-chip:hover{border-color:rgba(232,93,4,0.5);color:rgba(232,93,4,0.85);}
    .format-chip.selected{background:var(--accent);border-color:var(--accent);color:#fff;box-shadow:0 0 12px rgba(232,93,4,0.38);}

    /* seat */
    .seat{
      width:24px;height:22px;border-radius:3px 3px 2px 2px;
      cursor:pointer;border:none;padding:0;
      position:relative;transition:transform 0.18s cubic-bezier(0.34,1.56,0.64,1),background 0.15s;
    }
    .seat:hover:not(.taken){transform:scale(1.2);}
    .seat.free{background:#1e1e30;border:1px solid rgba(255,255,255,0.1);}
    .seat.taken{background:#2a0a0a;border:1px solid rgba(180,30,30,0.2);cursor:not-allowed;opacity:0.45;}
    .seat.chosen{background:var(--accent);border:1px solid var(--accent);box-shadow:0 0 10px rgba(232,93,4,0.55);}
    .seat.vip.free{background:#131326;border:1px solid rgba(255,183,3,0.25);}
    .seat.vip.chosen{background:#ffb703;border:1px solid #ffb703;box-shadow:0 0 10px rgba(255,183,3,0.55);}

    /* ticket reveal */
    .ticket-card{
      animation: ticketIn 0.7s cubic-bezier(0.22,1,0.36,1) both;
      perspective:800px;
    }

    /* shimmer loader */
    .shimmer-line{
      background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.04) 75%);
      background-size:200% 100%;
      animation:shimmer 1.6s infinite;
      border-radius:3px;
    }

    /* progress step */
    .step-dot{
      width:8px;height:8px;border-radius:50%;
      transition:all 0.35s cubic-bezier(0.34,1.56,0.64,1);
    }

    .confirm-btn{
      animation: confirmPulse 2.5s ease-in-out infinite;
    }

    /* dashed ticket divider */
    .ticket-tear{
      position:relative;display:flex;align-items:center;
      height:28px;margin:0 -1px;
    }
    .ticket-tear::before,.ticket-tear::after{
      content:'';position:absolute;
      width:16px;height:16px;border-radius:50%;
      background:#04040a;
    }
    .ticket-tear::before{left:-8px;}
    .ticket-tear::after{right:-8px;}

    @media(max-width:768px){
      .seat{width:18px;height:16px;}
      .movie-grid{grid-template-columns:repeat(2,1fr)!important;}
    }
  `}</style>
);

/* ─── STEP INDICATOR ─────────────────────────────────────────── */
const STEPS = ["Film", "Schedule", "Seats", "Confirm"];

function StepBar({ step }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 48 }}>
            {STEPS.map((s, i) => {
                const done = i < step;
                const active = i === step;
                const future = i > step;
                return (
                    <div key={s} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
                        {/* node */}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                            <div style={{
                                width: active ? 36 : 28, height: active ? 36 : 28,
                                borderRadius: "50%",
                                background: done ? T.accent : active ? T.accent : "rgba(255,255,255,0.05)",
                                border: active ? `2px solid ${T.accent}` : done ? `2px solid ${T.accent}` : "2px solid rgba(255,255,255,0.1)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                boxShadow: active ? `0 0 18px rgba(${T.accentRgb},0.55)` : done ? `0 0 8px rgba(${T.accentRgb},0.3)` : "none",
                                transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                                flexShrink: 0,
                            }}>
                                {done
                                    ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
                                    : <span style={{ fontSize: active ? 13 : 11, fontFamily: T.font, fontWeight: 700, color: future ? "rgba(255,255,255,0.25)" : "#fff" }}>{i + 1}</span>
                                }
                            </div>
                            <span style={{
                                fontSize: 10, fontFamily: T.font, fontWeight: 600,
                                letterSpacing: "0.18em", textTransform: "uppercase",
                                color: active ? "#fff" : done ? T.accent : "rgba(255,255,255,0.2)",
                                transition: "color 0.3s",
                            }}>{s}</span>
                        </div>
                        {/* connector */}
                        {i < STEPS.length - 1 && (
                            <div style={{ flex: 1, height: 1, margin: "0 6px", marginBottom: 22, background: done ? `rgba(${T.accentRgb},0.5)` : "rgba(255,255,255,0.07)", transition: "background 0.4s" }} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

/* ─── SECTION LABEL ──────────────────────────────────────────── */
function SLabel({ children }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ width: 3, height: 3, borderRadius: "50%", background: T.accent, boxShadow: `0 0 8px ${T.accent}` }} />
            <span style={{ fontFamily: T.font, fontSize: 10, fontWeight: 700, letterSpacing: "0.26em", textTransform: "uppercase", color: T.accent }}>{children}</span>
        </div>
    );
}

/* ─── HUD PANEL ──────────────────────────────────────────────── */
function Panel({ children, style = {} }) {
    return (
        <div style={{
            background: T.bgCard,
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 8,
            padding: "28px 28px",
            position: "relative",
            ...style,
        }}>
            {/* corner accents */}
            {[["top", "left"], ["bottom", "right"]].map(([v, h]) => (
                <div key={v + h} style={{ position: "absolute", [v]: 10, [h]: 10, width: 14, height: 14 }}>
                    <div style={{ position: "absolute", [v]: 0, [h]: 0, width: "100%", height: 1, background: `rgba(${T.accentRgb},0.35)` }} />
                    <div style={{ position: "absolute", [v]: 0, [h]: 0, width: 1, height: "100%", background: `rgba(${T.accentRgb},0.35)` }} />
                </div>
            ))}
            {children}
        </div>
    );
}

/* ─── STEP 1: MOVIE SELECTION ────────────────────────────────── */
function StepFilm({ selected, onSelect }) {
    return (
        <div className="step-in">
            <h2 style={{ fontFamily: T.font, fontSize: "clamp(1.7rem,3vw,2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", marginBottom: 8 }}>
                Choose your film
            </h2>
            <p style={{ fontSize: 14, color: T.muted, marginBottom: 36, fontStyle: "italic" }}>
                Select the movie you'd like to watch
            </p>
            <div
                className="movie-grid"
                style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}
            >
                {MOVIES.map((m, i) => (
                    <div
                        key={m.id}
                        className={`movie-pick-card fade-up d${Math.min(i + 1, 6)}${selected?.id === m.id ? " selected" : ""}`}
                        style={{ "--sel-accent": m.accent }}
                        onClick={() => onSelect(m)}
                    >
                        {/* poster */}
                        <div style={{ position: "relative", aspectRatio: "2/3", overflow: "hidden" }}>
                            <img src={m.img} alt={m.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: selected?.id === m.id ? "brightness(0.9)" : "brightness(0.78)", transition: "filter 0.3s" }} />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(4,4,10,0.92) 0%,transparent 55%)" }} />
                            {/* accent overlay when selected */}
                            {selected?.id === m.id && (
                                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 100%, rgba(${m.accentRgb},0.25) 0%, transparent 70%)` }} />
                            )}
                            {/* check badge */}
                            {selected?.id === m.id && (
                                <div style={{ position: "absolute", top: 10, right: 10, width: 26, height: 26, borderRadius: "50%", background: m.accent, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 14px rgba(${m.accentRgb},0.6)` }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
                                </div>
                            )}
                            {/* rating */}
                            <div style={{ position: "absolute", top: 10, left: 10, display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", background: "rgba(4,4,10,0.8)", border: "1px solid rgba(255,183,3,0.28)", borderRadius: 2 }}>
                                <svg width="9" height="9" viewBox="0 0 20 20" fill="#ffb703"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                <span style={{ fontSize: 10, color: T.gold, fontFamily: T.font, fontWeight: 700 }}>{m.rating}</span>
                            </div>
                            {/* bottom info */}
                            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 12px 12px" }}>
                                <p style={{ fontFamily: T.font, fontSize: 13, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 4 }}>{m.title}</p>
                                <p style={{ fontSize: 9, color: `rgba(${m.accentRgb},0.85)`, fontFamily: T.font, fontWeight: 700, letterSpacing: "0.14em" }}>{m.genre}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─── STEP 2: SCHEDULE ───────────────────────────────────────── */
function StepSchedule({ movie, date, time, format, onDate, onTime, onFormat }) {
    return (
        <div className="step-in">
            {/* movie recap */}
            <div style={{ display: "flex", gap: 18, alignItems: "center", marginBottom: 36 }}>
                <img src={movie.img} alt={movie.title} style={{ width: 56, height: 80, objectFit: "cover", borderRadius: 4, border: `1px solid rgba(${movie.accentRgb},0.35)` }} />
                <div>
                    <p style={{ fontSize: 10, fontFamily: T.font, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: `rgba(${movie.accentRgb},0.9)`, marginBottom: 4 }}>{movie.genre}</p>
                    <h2 style={{ fontFamily: T.font, fontSize: "clamp(1.5rem,2.5vw,2.1rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1 }}>{movie.title}</h2>
                    <p style={{ fontSize: 13, color: T.muted, marginTop: 4 }}>{movie.duration} · {movie.year}</p>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

                {/* DATE */}
                <Panel>
                    <SLabel>Select Date</SLabel>
                    <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
                        {DATES.map(d => (
                            <button key={d.id} className={`date-chip${date?.id === d.id ? " selected" : ""}`} onClick={() => onDate(d)}>
                                <span style={{ fontFamily: T.font, fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: date?.id === d.id ? "rgba(255,255,255,0.7)" : T.muted, marginBottom: 2 }}>{d.day}</span>
                                <span style={{ fontFamily: T.font, fontSize: 20, fontWeight: 800, color: date?.id === d.id ? "#fff" : "rgba(255,255,255,0.75)", lineHeight: 1 }}>{d.date}</span>
                                <span style={{ fontFamily: T.font, fontSize: 9, letterSpacing: "0.12em", color: date?.id === d.id ? "rgba(255,255,255,0.65)" : T.muted }}>{d.month}</span>
                            </button>
                        ))}
                    </div>
                </Panel>

                {/* FORMAT */}
                <Panel>
                    <SLabel>Format</SLabel>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        {FORMATS.map(f => (
                            <button key={f} className={`format-chip${format === f ? " selected" : ""}`} onClick={() => onFormat(f)}>
                                {f}
                                {f !== "Standard" && (
                                    <span style={{ marginLeft: 6, fontSize: 9, opacity: 0.7 }}>+${(PRICES[f] - PRICES.Standard).toFixed(2)}</span>
                                )}
                            </button>
                        ))}
                    </div>
                </Panel>

                {/* TIME */}
                <Panel>
                    <SLabel>Showtime</SLabel>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        {TIMES.map(t => (
                            <button key={t} className={`time-chip${time === t ? " selected" : ""}`} onClick={() => onTime(t)}>
                                {t}
                            </button>
                        ))}
                    </div>
                </Panel>
            </div>
        </div>
    );
}

/* ─── STEP 3: SEAT MAP ───────────────────────────────────────── */
function StepSeats({ movie, chosen, onToggle }) {
    const VIP_ROWS = ["H", "I"];

    return (
        <div className="step-in">
            <h2 style={{ fontFamily: T.font, fontSize: "clamp(1.5rem,2.5vw,2.1rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", marginBottom: 6 }}>Pick your seats</h2>
            <p style={{ fontSize: 14, color: T.muted, marginBottom: 32, fontStyle: "italic" }}>Select up to 8 seats</p>

            {/* screen */}
            <div style={{ marginBottom: 32, textAlign: "center" }}>
                <div style={{ display: "inline-block", width: "72%", height: 5, borderRadius: "50%", background: `rgba(${movie.accentRgb},0.55)`, boxShadow: `0 0 30px rgba(${movie.accentRgb},0.35), 0 0 60px rgba(${movie.accentRgb},0.15)`, marginBottom: 6 }} />
                <p style={{ fontSize: 9, fontFamily: T.font, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: `rgba(${movie.accentRgb},0.55)` }}>SCREEN</p>
            </div>

            {/* seat grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center", marginBottom: 32 }}>
                {ROWS.map(row => {
                    const isVip = VIP_ROWS.includes(row);
                    return (
                        <div key={row} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontFamily: T.font, fontSize: 10, fontWeight: 700, color: isVip ? T.gold : "rgba(255,255,255,0.22)", width: 16, textAlign: "center" }}>{row}</span>
                            <div style={{ display: "flex", gap: 4 }}>
                                {Array.from({ length: COLS }, (_, c) => {
                                    const id = `${row}-${c}`;
                                    const taken = TAKEN_SEATS.has(id);
                                    const picked = chosen.has(id);
                                    let cls = "seat";
                                    if (taken) cls += " taken";
                                    else if (picked) cls += " chosen";
                                    else cls += " free";
                                    if (isVip) cls += " vip";

                                    /* aisle gap */
                                    if (c === 3 || c === 10) return <span key={id}><span style={{ display: "inline-block", width: 10 }} /><button className={cls} key={id + "b"} disabled={taken} onClick={() => !taken && onToggle(id)} title={`${row}${c + 1}`} /></span>;
                                    return <button key={id} className={cls} disabled={taken} onClick={() => !taken && onToggle(id)} title={`${row}${c + 1}`} />;
                                })}
                            </div>
                            <span style={{ fontFamily: T.font, fontSize: 10, fontWeight: 700, color: isVip ? T.gold : "rgba(255,255,255,0.22)", width: 16, textAlign: "center" }}>{row}</span>
                        </div>
                    );
                })}
            </div>

            {/* legend */}
            <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
                {[
                    { color: "#1e1e30", border: "rgba(255,255,255,0.1)", label: "Available" },
                    { color: T.accent, border: T.accent, label: "Selected" },
                    { color: "#131326", border: "rgba(255,183,3,0.25)", label: "VIP (+$5)", gold: true },
                    { color: "#2a0a0a", border: "rgba(180,30,30,0.2)", label: "Taken", dim: true },
                ].map(({ color, border, label, gold, dim }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 7, opacity: dim ? 0.55 : 1 }}>
                        <div style={{ width: 16, height: 14, borderRadius: "2px 2px 1px 1px", background: color, border: `1px solid ${border}` }} />
                        <span style={{ fontSize: 11, fontFamily: T.font, color: gold ? T.gold : T.muted, letterSpacing: "0.08em" }}>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─── STEP 4: CONFIRM & TICKET ───────────────────────────────── */
function StepConfirm({ movie, date, time, format, seats, onConfirm, confirmed }) {
    const VIP_ROWS = ["H", "I"];
    const vipCount = [...seats].filter(s => VIP_ROWS.includes(s.split("-")[0])).length;
    const stdCount = seats.size - vipCount;
    const basePrice = PRICES[format] || PRICES.Standard;
    const vipExtra = 5;
    const subtotal = stdCount * basePrice + vipCount * (basePrice + vipExtra);
    const fees = +(subtotal * 0.1).toFixed(2);
    const total = +(subtotal + fees).toFixed(2);

    const seatList = [...seats].sort().map(s => {
        const [row, col] = s.split("-");
        return `${row}${parseInt(col) + 1}`;
    });

    const bookingRef = useRef(`CS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);

    if (confirmed) {
        return (
            <div className="step-in" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* success header */}
                <div style={{ textAlign: "center", marginBottom: 40 }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: `rgba(${T.accentRgb},0.15)`, border: `2px solid ${T.accent}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: `0 0 32px rgba(${T.accentRgb},0.35)` }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                    <h2 style={{ fontFamily: T.font, fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", marginBottom: 8 }}>Booking Confirmed!</h2>
                    <p style={{ fontSize: 14, color: T.muted, fontStyle: "italic" }}>Your digital ticket is ready. Enjoy the show.</p>
                </div>

                {/* ── TICKET ── */}
                <div className="ticket-card" style={{ width: "100%", maxWidth: 480 }}>
                    <div style={{ background: T.bgCard, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden" }}>

                        {/* ticket header with backdrop */}
                        <div style={{ position: "relative", height: 160, overflow: "hidden" }}>
                            <img src={movie.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%", filter: "brightness(0.35) saturate(0.7)" }} />
                            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right,rgba(4,4,10,0.9),rgba(4,4,10,0.4)), linear-gradient(to top,rgba(4,4,10,0.95),transparent 60%)` }} />
                            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 80% at 80% 40%,rgba(${movie.accentRgb},0.18) 0%,transparent 70%)` }} />
                            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 22px" }}>
                                <p style={{ fontSize: 9, fontFamily: T.font, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: `rgba(${movie.accentRgb},0.85)`, marginBottom: 4 }}>{movie.genre}</p>
                                <p style={{ fontFamily: T.font, fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>{movie.title}</p>
                            </div>
                            {/* booking ref */}
                            <div style={{ position: "absolute", top: 12, right: 14, padding: "4px 10px", background: "rgba(4,4,10,0.75)", border: `1px solid rgba(${movie.accentRgb},0.35)`, borderRadius: 2 }}>
                                <span style={{ fontFamily: T.font, fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", color: `rgba(${movie.accentRgb},0.9)` }}>#{bookingRef.current}</span>
                            </div>
                        </div>

                        {/* details grid */}
                        <div style={{ padding: "20px 22px 0" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px 12px" }}>
                                {[
                                    { label: "Date", value: `${date.day}, ${date.date} ${date.month}` },
                                    { label: "Time", value: time },
                                    { label: "Format", value: format },
                                    { label: "Seats", value: seatList.join(", ") },
                                    { label: "Quantity", value: `${seats.size} ticket${seats.size > 1 ? "s" : ""}` },
                                    { label: "Total", value: `$${total.toFixed(2)}`, highlight: true },
                                ].map(({ label, value, highlight }) => (
                                    <div key={label}>
                                        <p style={{ fontSize: 9, fontFamily: T.font, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.muted, marginBottom: 3 }}>{label}</p>
                                        <p style={{ fontFamily: T.font, fontSize: highlight ? 15 : 13, fontWeight: highlight ? 800 : 700, color: highlight ? T.accent : "#fff", letterSpacing: highlight ? "-0.01em" : "0.02em" }}>{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* tear divider */}
                        <div className="ticket-tear" style={{ margin: "20px 0 0" }}>
                            <div style={{ flex: 1, borderTop: "1px dashed rgba(255,255,255,0.1)", marginLeft: 8, marginRight: 8 }} />
                        </div>

                        {/* barcode area */}
                        <div style={{ padding: "18px 22px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                            {/* fake barcode */}
                            <div style={{ display: "flex", gap: 2, height: 46 }}>
                                {Array.from({ length: 30 }, (_, i) => (
                                    <div key={i} style={{ width: i % 4 === 0 ? 3 : i % 3 === 0 ? 2 : 1, height: "100%", background: i % 5 === 0 ? "rgba(255,255,255,0.5)" : i % 2 === 0 ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)", borderRadius: 1 }} />
                                ))}
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <p style={{ fontSize: 9, fontFamily: T.font, color: T.muted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 2 }}>CineSphere</p>
                                <p style={{ fontSize: 8, fontFamily: T.font, color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>Valid for one entry</p>
                                <p style={{ fontSize: 9, fontFamily: T.font, color: `rgba(${movie.accentRgb},0.7)`, letterSpacing: "0.12em", marginTop: 2 }}>{bookingRef.current}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* actions */}
                <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                    <GhostButton onClick={() => window.print()}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z" /></svg>
                        Print Ticket
                    </GhostButton>
                    <GhostButton>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                        Download
                    </GhostButton>
                </div>
            </div>
        );
    }

    return (
        <div className="step-in">
            <h2 style={{ fontFamily: T.font, fontSize: "clamp(1.5rem,2.5vw,2.1rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", marginBottom: 6 }}>Order Summary</h2>
            <p style={{ fontSize: 14, color: T.muted, marginBottom: 32, fontStyle: "italic" }}>Review your booking before confirming</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                {/* movie strip */}
                <Panel style={{ display: "flex", gap: 18, alignItems: "center" }}>
                    <img src={movie.img} alt={movie.title} style={{ width: 52, height: 74, objectFit: "cover", borderRadius: 4, border: `1px solid rgba(${movie.accentRgb},0.38)`, flexShrink: 0 }} />
                    <div>
                        <p style={{ fontSize: 9, fontFamily: T.font, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: `rgba(${movie.accentRgb},0.85)`, marginBottom: 4 }}>{movie.genre}</p>
                        <p style={{ fontFamily: T.font, fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 4 }}>{movie.title}</p>
                        <p style={{ fontSize: 12, color: T.muted }}>{movie.duration} · {movie.year}</p>
                    </div>
                </Panel>

                {/* details */}
                <Panel>
                    <SLabel>Booking Details</SLabel>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 20px" }}>
                        {[
                            { l: "Date", v: `${date.day}, ${date.date} ${date.month}` },
                            { l: "Time", v: time },
                            { l: "Format", v: format },
                            { l: "Seats", v: seatList.join(", ") || "—" },
                        ].map(({ l, v }) => (
                            <div key={l}>
                                <p style={{ fontSize: 9, fontFamily: T.font, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.muted, marginBottom: 4 }}>{l}</p>
                                <p style={{ fontFamily: T.font, fontSize: 14, fontWeight: 700, color: "#fff" }}>{v}</p>
                            </div>
                        ))}
                    </div>
                </Panel>

                {/* price breakdown */}
                <Panel>
                    <SLabel>Price Breakdown</SLabel>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {stdCount > 0 && <PriceLine label={`${stdCount}× Standard (${format})`} value={`$${(stdCount * basePrice).toFixed(2)}`} />}
                        {vipCount > 0 && <PriceLine label={`${vipCount}× VIP (${format})`} value={`$${(vipCount * (basePrice + vipExtra)).toFixed(2)}`} gold />}
                        <PriceLine label="Service fee (10%)" value={`$${fees.toFixed(2)}`} muted />
                        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "4px 0" }} />
                        <PriceLine label="Total" value={`$${total.toFixed(2)}`} big />
                    </div>
                </Panel>

                {/* confirm button */}
                <button
                    onClick={onConfirm}
                    className="confirm-btn"
                    style={{
                        width: "100%", padding: "15px", border: "none",
                        background: T.accent, color: "#fff", cursor: "pointer",
                        fontFamily: T.font, fontSize: 14, fontWeight: 700,
                        letterSpacing: "0.16em", textTransform: "uppercase",
                        borderRadius: 4,
                        clipPath: "polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))",
                        transition: "filter 0.2s",
                    }}
                    onMouseOver={e => e.currentTarget.style.filter = "brightness(1.15)"}
                    onMouseOut={e => e.currentTarget.style.filter = "brightness(1)"}
                >
                    Confirm & Pay ${total.toFixed(2)}
                </button>
            </div>
        </div>
    );
}

function PriceLine({ label, value, gold, muted, big }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: big ? 14 : 13, fontFamily: T.font, fontWeight: big ? 700 : 400, color: muted ? T.muted : gold ? T.gold : "rgba(255,255,255,0.65)" }}>{label}</span>
            <span style={{ fontSize: big ? 16 : 13, fontFamily: T.font, fontWeight: big ? 800 : 600, color: big ? T.accent : gold ? T.gold : muted ? T.muted : "#fff" }}>{value}</span>
        </div>
    );
}

function GhostButton({ children, onClick }) {
    const [hov, setHov] = useState(false);
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                display: "flex", alignItems: "center", gap: 8,
                background: hov ? "rgba(255,255,255,0.06)" : "transparent",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.6)",
                padding: "10px 20px", fontSize: 12,
                fontFamily: T.font, fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                cursor: "pointer", borderRadius: 3,
                transition: "background 0.2s, color 0.2s",
            }}
        >{children}</button>
    );
}

/* ─── SIDEBAR SUMMARY ────────────────────────────────────────── */
function Sidebar({ step, movie, date, time, format, seats }) {
    const VIP_ROWS = ["H", "I"];
    const vipCount = [...seats].filter(s => VIP_ROWS.includes(s.split("-")[0])).length;
    const stdCount = seats.size - vipCount;
    const basePrice = PRICES[format] || PRICES.Standard;
    const subtotal = stdCount * basePrice + vipCount * (basePrice + 5);
    const total = +(subtotal * 1.1).toFixed(2);

    const seatList = [...seats].sort().map(s => {
        const [row, col] = s.split("-");
        return `${row}${parseInt(col) + 1}`;
    });

    return (
        <div style={{ position: "sticky", top: 88, width: 280, flexShrink: 0 }}>
            <Panel>
                <p style={{ fontFamily: T.font, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: T.accent, marginBottom: 18 }}>Your Selection</p>

                {/* movie */}
                {movie ? (
                    <div style={{ display: "flex", gap: 12, marginBottom: 20, paddingBottom: 18, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <img src={movie.img} alt="" style={{ width: 40, height: 56, objectFit: "cover", borderRadius: 3, border: `1px solid rgba(${movie.accentRgb},0.3)`, flexShrink: 0 }} />
                        <div>
                            <p style={{ fontFamily: T.font, fontSize: 12, fontWeight: 800, color: "#fff", lineHeight: 1.25, marginBottom: 3 }}>{movie.title}</p>
                            <p style={{ fontSize: 9, fontFamily: T.font, color: `rgba(${movie.accentRgb},0.8)`, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>{movie.genre}</p>
                        </div>
                    </div>
                ) : (
                    <PlaceholderRow label="Film" />
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <SideRow icon="📅" label="Date" value={date ? `${date.day} ${date.date} ${date.month}` : null} />
                    <SideRow icon="🕐" label="Time" value={time || null} />
                    <SideRow icon="🎬" label="Format" value={format || null} />
                    <SideRow icon="💺" label="Seats" value={seatList.length ? seatList.join(", ") : null} />
                </div>

                {seats.size > 0 && (
                    <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                            <span style={{ fontSize: 11, fontFamily: T.font, color: T.muted }}>Estimated Total</span>
                            <span style={{ fontFamily: T.font, fontSize: 17, fontWeight: 800, color: T.accent }}>${total.toFixed(2)}</span>
                        </div>
                        <p style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", marginTop: 4 }}>incl. service fees</p>
                    </div>
                )}
            </Panel>
        </div>
    );
}

function SideRow({ icon, label, value }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12, opacity: 0.6 }}>{icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 9, fontFamily: T.font, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>{label}</p>
                {value
                    ? <p style={{ fontSize: 12, fontFamily: T.font, fontWeight: 700, color: "#fff", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</p>
                    : <div className="shimmer-line" style={{ height: 10, width: "70%", marginTop: 4 }} />
                }
            </div>
        </div>
    );
}

function PlaceholderRow({ label }) {
    return (
        <div style={{ display: "flex", gap: 12, marginBottom: 20, paddingBottom: 18, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="shimmer-line" style={{ width: 40, height: 56, borderRadius: 3 }} />
            <div style={{ flex: 1 }}>
                <div className="shimmer-line" style={{ height: 12, width: "80%", marginBottom: 6 }} />
                <div className="shimmer-line" style={{ height: 8, width: "50%" }} />
            </div>
        </div>
    );
}

/* ─── NAVBAR ─────────────────────────────────────────────────── */
function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);
    return (
        <nav style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
            height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 5%",
            background: scrolled ? "rgba(4,4,10,0.92)" : "rgba(4,4,10,0.7)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            backdropFilter: "blur(18px)",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                <div style={{ width: 32, height: 32, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M4 3.5A1.5 1.5 0 015.5 2h7.379a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0118.5 7.622V20.5A1.5 1.5 0 0117 22H5.5A1.5 1.5 0 014 20.5v-17z" /></svg>
                </div>
                <span style={{ fontFamily: T.font, fontWeight: 800, fontSize: 17, letterSpacing: "0.28em", color: "#fff", textTransform: "uppercase" }}>CineSphere</span>
                <span style={{ fontSize: 10, fontFamily: T.font, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: T.accent, marginLeft: 8, padding: "3px 8px", border: `1px solid rgba(${T.accentRgb},0.4)`, borderRadius: 2 }}>Tickets</span>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
                {["Home", "Discover", "Tickets", "My List"].map(l => (
                    <button key={l} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: T.font, fontSize: 12, fontWeight: l === "Tickets" ? 700 : 500, letterSpacing: "0.1em", textTransform: "uppercase", color: l === "Tickets" ? "#fff" : "rgba(255,255,255,0.35)", padding: "6px 12px", position: "relative" }}>
                        {l}
                        {l === "Tickets" && <div style={{ position: "absolute", bottom: 2, left: 12, right: 12, height: 1, background: T.accent, boxShadow: `0 0 6px ${T.accent}` }} />}
                    </button>
                ))}
            </div>
            <button style={{ background: T.accent, border: "none", color: "#fff", padding: "8px 18px", fontSize: 12, fontFamily: T.font, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2, clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
                onMouseOver={e => e.currentTarget.style.filter = "brightness(1.15)"}
                onMouseOut={e => e.currentTarget.style.filter = "brightness(1)"}
            >Sign In</button>
        </nav>
    );
}

/* ─── ROOT ───────────────────────────────────────────────────── */
export default function Tickets() {
    const [step, setStep] = useState(0);
    const [movie, setMovie] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [format, setFormat] = useState("Standard");
    const [seats, setSeats] = useState(new Set());
    const [confirmed, setConfirmed] = useState(false);
    const contentRef = useRef(null);

    const canNext = [
        () => !!movie,
        () => !!date && !!time,
        () => seats.size > 0,
        () => true,
    ];

    const next = () => {
        if (!canNext[step]()) return;
        setStep(s => Math.min(s + 1, 3));
        setTimeout(() => contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    };

    const back = () => {
        setStep(s => Math.max(s - 1, 0));
        setConfirmed(false);
    };

    const toggleSeat = (id) => {
        setSeats(prev => {
            const n = new Set(prev);
            if (n.has(id)) { n.delete(id); }
            else if (n.size < 8) { n.add(id); }
            return n;
        });
    };

    return (
        <>
            <TicketStyles />
            <div style={{ background: T.bg, minHeight: "100vh" }}>
                <Navbar />

                {/* Page hero header */}
                <div style={{ position: "relative", paddingTop: 64, overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 100% at 50% 0%, rgba(${T.accentRgb},0.08) 0%, transparent 70%)` }} />
                    <div style={{ padding: "44px 5% 0", position: "relative" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                            <div style={{ width: 3, height: 3, borderRadius: "50%", background: T.accent, boxShadow: `0 0 8px ${T.accent}` }} />
                            <span style={{ fontSize: 10, fontFamily: T.font, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: T.accent }}>Booking</span>
                        </div>
                        <h1 style={{ fontFamily: T.font, fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#fff", marginBottom: 6 }}>Book Tickets</h1>
                        <p style={{ fontSize: 14, color: T.muted, marginBottom: 36, fontStyle: "italic" }}>Complete the steps below to reserve your seats</p>
                        <div style={{ height: 1, background: `linear-gradient(to right,rgba(${T.accentRgb},0.5),rgba(${T.accentRgb},0.1),transparent)` }} />
                    </div>
                </div>

                {/* Main layout */}
                <div style={{ display: "flex", gap: 32, padding: "40px 5% 80px", alignItems: "flex-start" }}>

                    {/* LEFT: content */}
                    <div ref={contentRef} style={{ flex: 1, minWidth: 0 }}>
                        <StepBar step={confirmed ? 4 : step} />

                        {/* step content */}
                        <div style={{ minHeight: 400 }}>
                            {step === 0 && <StepFilm selected={movie} onSelect={m => { setMovie(m); }} />}
                            {step === 1 && <StepSchedule movie={movie} date={date} time={time} format={format} onDate={setDate} onTime={setTime} onFormat={setFormat} />}
                            {step === 2 && <StepSeats movie={movie} chosen={seats} onToggle={toggleSeat} />}
                            {step === 3 && <StepConfirm movie={movie} date={date} time={time} format={format} seats={seats} onConfirm={() => setConfirmed(true)} confirmed={confirmed} />}
                        </div>

                        {/* nav buttons */}
                        {!confirmed && (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 40, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                <button
                                    onClick={back}
                                    disabled={step === 0}
                                    style={{
                                        display: "flex", alignItems: "center", gap: 8,
                                        background: "transparent",
                                        border: step === 0 ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(255,255,255,0.12)",
                                        color: step === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.55)",
                                        padding: "11px 22px", fontSize: 12,
                                        fontFamily: T.font, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
                                        cursor: step === 0 ? "not-allowed" : "pointer",
                                        borderRadius: 3, transition: "all 0.2s",
                                    }}
                                >
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                                    Back
                                </button>

                                {/* progress info */}
                                <span style={{ fontSize: 11, fontFamily: T.font, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
                                    Step {step + 1} of {STEPS.length}
                                </span>

                                {step < 3 && (
                                    <button
                                        onClick={next}
                                        disabled={!canNext[step]()}
                                        style={{
                                            display: "flex", alignItems: "center", gap: 8,
                                            background: canNext[step]() ? T.accent : "rgba(255,255,255,0.05)",
                                            border: "none",
                                            color: canNext[step]() ? "#fff" : "rgba(255,255,255,0.2)",
                                            padding: "11px 26px", fontSize: 12,
                                            fontFamily: T.font, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                                            cursor: canNext[step]() ? "pointer" : "not-allowed",
                                            clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
                                            transition: "all 0.25s",
                                            filter: "brightness(1)",
                                        }}
                                        onMouseOver={e => { if (canNext[step]()) e.currentTarget.style.filter = "brightness(1.15)"; }}
                                        onMouseOut={e => e.currentTarget.style.filter = "brightness(1)"}
                                    >
                                        {step === 2 ? "Review Order" : "Continue"}
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* RIGHT: sticky sidebar */}
                    <Sidebar step={step} movie={movie} date={date} time={time} format={format} seats={seats} />
                </div>
            </div>
        </>
    );
}