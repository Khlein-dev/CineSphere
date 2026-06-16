import { useState, useEffect, useRef, useCallback } from "react";

/* ─── DESIGN TOKENS ─────────────────────────────────────────── */
const T = {
  bg:       "#04040a",
  bgCard:   "#0c0c16",
  bgFooter: "#020208",
  accent:   "#e85d04",
  gold:     "#ffb703",
  text:     "#e8e0d8",
  font:     "'Syne', sans-serif",
  body:     "'DM Sans', sans-serif",
};

/* ─── DATA ───────────────────────────────────────────────────── */
const slides = [
  {
    studio: "Warner Bros. Pictures",
    title: "The Dark Knight",
    year: "2008",
    genre: "ACTION · CRIME · THRILLER",
    rating: "9.0",
    votes: "2.9M",
    desc: "When Gotham's criminal underworld is unleashed by the Joker, Batman must confront chaos — and the limits of his own moral code.",
    img: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    accent: "#e85d04",
    accentRgb: "232,93,4",
  },
  {
    studio: "Pixar Animation Studios",
    title: "Coco",
    year: "2017",
    genre: "ANIMATION · FAMILY · MUSIC",
    rating: "8.4",
    votes: "780K",
    desc: "Beneath a sky of marigold petals, Miguel crosses into the Land of the Dead to unravel the secret his family has buried for generations.",
    img: "https://image.tmdb.org/t/p/original/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
    accent: "#f77f00",
    accentRgb: "247,127,0",
  },
  {
    studio: "Sony Pictures Animation",
    title: "Spider-Man: Into the Spider-Verse",
    year: "2018",
    genre: "ANIMATION · ACTION · SCI-FI",
    rating: "8.4",
    votes: "620K",
    desc: "Miles Morales becomes Spider-Man and meets alternate-universe versions of the hero — a dazzling leap into a comic-book multiverse like no other.",
    img: "https://image.tmdb.org/t/p/original/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
    accent: "#e63946",
    accentRgb: "230,57,70",
  },
  {
    studio: "Pixar Animation Studios",
    title: "WALL·E",
    year: "2008",
    genre: "ANIMATION · SCI-FI · ROMANCE",
    rating: "8.4",
    votes: "1.1M",
    desc: "Centuries after humanity fled to the stars, a small robot still tends an abandoned Earth — until one visitor changes everything.",
    img: "https://image.tmdb.org/t/p/original/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg",
    accent: "#4cc9f0",
    accentRgb: "76,201,240",
  },
];

const ALL_GENRES = ["All", "Action", "Animation", "Sci-Fi", "Crime", "Adventure"];

const movies = [
  {
    title: "The Dark Knight",
    rating: "9.0",
    year: "2008",
    genre: "Crime",
    img: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    title: "Avengers: Infinity War",
    rating: "8.4",
    year: "2018",
    genre: "Action",
    img: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  },
  {
    title: "Spider-Man: Into the Spider-Verse",
    rating: "8.4",
    year: "2018",
    genre: "Animation",
    img: "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
  },
  {
    title: "Jurassic World",
    rating: "7.0",
    year: "2015",
    genre: "Adventure",
    img: "https://image.tmdb.org/t/p/w500/rhr4y79GpxQF9IsfJItRXVaoGs4.jpg",
  },
  {
    title: "Interstellar",
    rating: "8.6",
    year: "2014",
    genre: "Sci-Fi",
    img: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
  },
  {
    title: "Spirited Away",
    rating: "8.6",
    year: "2001",
    genre: "Animation",
    img: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
  },
  {
    title: "Inception",
    rating: "8.8",
    year: "2010",
    genre: "Sci-Fi",
    img: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
  },
  {
    title: "The Amazing Spider-Man",
    rating: "6.9",
    year: "2012",
    genre: "Action",
    img: "https://image.tmdb.org/t/p/w500/jexoNYnPd6vVrmygwF6QZmWPFdu.jpg",
  },
  {
    title: "WALL·E",
    rating: "8.4",
    year: "2008",
    genre: "Sci-Fi",
    img: "https://image.tmdb.org/t/p/w500/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg",
  },
  {
    title: "The Incredibles",
    rating: "8.0",
    year: "2004",
    genre: "Animation",
    img: "https://image.tmdb.org/t/p/w500/2LqaLgk4Z226KkgPJuiOQ58wvrm.jpg",
  },
];

/* ─── GLOBAL STYLES ─────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --accent: #e85d04;
      --accent-rgb: 232,93,4;
      --gold: #ffb703;
    }

    html { scroll-behavior: smooth; }

    body, #root {
      background: #04040a;
      color: #e8e0d8;
      font-family: 'DM Sans', sans-serif;
      overflow-x: hidden;
    }

    /* scanlines */
    body::before {
      content: '';
      position: fixed; inset: 0;
      background: repeating-linear-gradient(
        0deg, transparent, transparent 2px,
        rgba(255,255,255,0.011) 2px, rgba(255,255,255,0.011) 4px
      );
      pointer-events: none;
      z-index: 9998;
    }

    /* noise grain */
    body::after {
      content: '';
      position: fixed; inset: -50%;
      width: 200%; height: 200%;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.028;
      pointer-events: none;
      animation: grain 8s steps(10) infinite;
      z-index: 9997;
    }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: #04040a; }
    ::-webkit-scrollbar-thumb { background: rgba(232,93,4,0.4); border-radius: 2px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(232,93,4,0.7); }

    /* keyframes */
    @keyframes grain {
      0%,100% { transform: translate(0,0); }
      10%  { transform: translate(-2%,-3%); }
      20%  { transform: translate(3%,1%); }
      30%  { transform: translate(-1%,4%); }
      40%  { transform: translate(2%,-2%); }
      50%  { transform: translate(-3%,2%); }
      60%  { transform: translate(1%,-4%); }
      70%  { transform: translate(-2%,3%); }
      80%  { transform: translate(3%,-1%); }
      90%  { transform: translate(-1%,2%); }
    }
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(30px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes slideInLeft {
      from { opacity:0; transform:translateX(-36px); }
      to   { opacity:1; transform:translateX(0); }
    }
    @keyframes scanX {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(500%); }
    }
    @keyframes progressFill {
      from { width:0%; }
      to   { width:100%; }
    }
    @keyframes blink {
      0%,100% { opacity:1; }
      50%      { opacity:0; }
    }
    @keyframes pulseGlow {
      0%,100% { box-shadow: 0 0 0 0 rgba(232,93,4,0.4); }
      50%      { box-shadow: 0 0 0 6px rgba(232,93,4,0); }
    }
    @keyframes chipIn {
      from { opacity:0; transform:translateY(8px) scale(0.95); }
      to   { opacity:1; transform:translateY(0) scale(1); }
    }

    /* utilities */
    .font-syne { font-family:'Syne',sans-serif; }
    .animate-fadeUp      { animation: fadeUp      0.7s cubic-bezier(0.22,1,0.36,1) both; }
    .animate-slideInLeft { animation: slideInLeft 0.6s cubic-bezier(0.22,1,0.36,1) both; }
    .delay-100 { animation-delay:.10s; }
    .delay-200 { animation-delay:.20s; }
    .delay-300 { animation-delay:.30s; }
    .delay-400 { animation-delay:.40s; }

    .progress-active { animation: progressFill 6s linear forwards; }

    /* card base */
    .movie-card {
      transition:
        transform   0.45s cubic-bezier(0.34,1.56,0.64,1),
        box-shadow  0.45s ease;
      transform-style: preserve-3d;
      will-change: transform;
    }
    .movie-card:hover { transform: translateY(-12px) scale(1.025); }

    /* search input */
    .search-input {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px;
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      padding: 7px 14px 7px 36px;
      width: 0;
      opacity: 0;
      transition: width 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease, border-color 0.2s;
      outline: none;
    }
    .search-input.open {
      width: 180px;
      opacity: 1;
    }
    .search-input:focus {
      border-color: rgba(232,93,4,0.5);
    }
    .search-input::placeholder { color: rgba(255,255,255,0.3); }

    /* genre chip */
    .genre-chip {
      font-family: 'Syne', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      padding: 6px 16px;
      border-radius: 2px;
      border: 1px solid rgba(255,255,255,0.1);
      background: transparent;
      color: rgba(255,255,255,0.38);
      cursor: pointer;
      transition: all 0.22s ease;
      animation: chipIn 0.4s ease both;
      white-space: nowrap;
      clip-path: polygon(
        0 0,calc(100% - 5px) 0,100% 5px,
        100% 100%,5px 100%,0 calc(100% - 5px)
      );
    }
    .genre-chip:hover {
      border-color: rgba(232,93,4,0.5);
      color: rgba(232,93,4,0.8);
    }
    .genre-chip.active {
      background: var(--accent);
      border-color: var(--accent);
      color: #fff;
      box-shadow: 0 0 14px rgba(232,93,4,0.45);
    }

    /* card grid appear */
    .card-appear {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.22,1,0.36,1);
    }
    .card-appear.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `}</style>
);

/* ─── RATING BAR ─────────────────────────────────────────────── */
function RatingBar({ score, accentColor }) {
  const pct = (parseFloat(score) / 10) * 100;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 72, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: accentColor
            ? `linear-gradient(90deg, ${accentColor}, #ffb703)`
            : "linear-gradient(90deg, var(--accent), #ffb703)",
          borderRadius: 2,
          transition: "width 0.8s cubic-bezier(0.22,1,0.36,1)",
        }} />
      </div>
      <span style={{ fontSize: 13, color: T.gold, fontWeight: 600, fontFamily: T.font }}>{score}</span>
    </div>
  );
}

/* ─── HEX BADGE ──────────────────────────────────────────────── */
function HexBadge({ children, color = "var(--accent)" }) {
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px",
      fontSize: 10, fontFamily: T.font, fontWeight: 700,
      letterSpacing: "0.18em", color,
      border: `1px solid ${color}`,
      textTransform: "uppercase", opacity: 0.92,
      background: `${color}12`,
    }}>
      {children}
    </span>
  );
}

/* ─── CAROUSEL ───────────────────────────────────────────────── */
function Carousel() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState(null);
  const [trans, setTrans]     = useState(false);
  const [key, setKey]         = useState(0);
  const timer                 = useRef(null);

  const go = useCallback((n) => {
    if (trans) return;
    const next = ((n % slides.length) + slides.length) % slides.length;
    setTrans(true);
    setPrev(current);
    setTimeout(() => {
      setCurrent(next);
      setPrev(null);
      setTrans(false);
      setKey(k => k + 1);
    }, 650);
  }, [current, trans]);

  useEffect(() => {
    timer.current = setInterval(() => go(current + 1), 7500);
    return () => clearInterval(timer.current);
  }, [current, go]);

  const s = slides[current];

  return (
    <div style={{ position: "relative", height: "100vh", minHeight: 620, overflow: "hidden" }}>

      {/* ── previous BG (fades out) ── */}
      {prev !== null && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1, opacity: trans ? 0 : 1, transition: "opacity 0.65s ease" }}>
          <img src={slides[prev].img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.28) saturate(0.4)" }} />
        </div>
      )}

      {/* ── current BG ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, opacity: trans ? 0 : 1, transition: "opacity 0.65s ease", transitionDelay: trans ? "0s" : "0.08s" }}>
        <img
          src={s.img} alt={s.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 18%", filter: "brightness(0.35) saturate(0.75)", transform: "scale(1.05)", transition: "transform 9s ease" }}
        />
        {/* gradient stack */}
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(108deg,rgba(4,4,10,0.97) 28%,rgba(4,4,10,0.48) 62%,transparent 100%), linear-gradient(to top,rgba(4,4,10,0.92) 0%,transparent 52%)` }} />
        {/* accent radial */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 55% 75% at 78% 38%, rgba(${s.accentRgb},0.14) 0%, transparent 70%)`, transition: "background 1s ease" }} />
      </div>

      {/* ── scan sweep ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 4, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, width: "20%", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.013),transparent)", animation: "scanX 5s ease-in-out infinite" }} />
      </div>

      {/* ── progress strips ── */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", gap: 3, zIndex: 10, padding: "0 5%" }}>
        {slides.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
            <div
              className={i === current ? "progress-active" : ""}
              style={{
                height: "100%",
                background: i < current ? "rgba(255,255,255,0.45)" : i === current ? s.accent : "transparent",
                width: i < current ? "100%" : undefined,
              }}
            />
          </div>
        ))}
      </div>

      {/* ── hero copy ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 5, display: "flex", alignItems: "center", padding: "0 5% 72px" }}>
        <div style={{ maxWidth: 660 }}>

          {/* meta row */}
          <div key={`meta-${key}`} className="animate-slideInLeft" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
            <HexBadge color={s.accent}>{s.genre}</HexBadge>
            <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.13)" }} />
            <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(255,255,255,0.38)", textTransform: "uppercase", fontFamily: T.font }}>{s.studio}</span>
          </div>

          {/* title */}
          <h1
            key={`title-${key}`}
            className="font-syne animate-fadeUp"
            style={{
              fontSize: "clamp(3rem,6.5vw,5.8rem)",
              fontWeight: 800, lineHeight: 0.9,
              letterSpacing: "-0.03em", color: "#fff",
              marginBottom: 28,
              textShadow: `0 0 80px rgba(${s.accentRgb},0.28)`,
            }}
          >{s.title}</h1>

          {/* stats */}
          <div key={`stats-${key}`} className="animate-fadeUp delay-100" style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 22 }}>
            <RatingBar score={s.rating} accentColor={s.accent} />
            <Pip />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", letterSpacing: "0.1em" }}>{s.year}</span>
            <Pip />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", letterSpacing: "0.08em" }}>{s.votes} ratings</span>
          </div>

          {/* desc */}
          <p key={`desc-${key}`} className="animate-fadeUp delay-200" style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(232,224,216,0.6)", marginBottom: 38, maxWidth: 500, fontStyle: "italic", fontWeight: 300 }}>
            {s.desc}
          </p>

          {/* cta */}
          <div key={`cta-${key}`} className="animate-fadeUp delay-300" style={{ display: "flex", gap: 12 }}>
            <AccentBtn accent={s.accent} accentRgb={s.accentRgb}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              Watch Now
            </AccentBtn>
            <GhostBtn accentRgb={s.accentRgb}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
              My List
            </GhostBtn>
          </div>
        </div>
      </div>

      {/* ── thumbnail strip ── */}
      <div style={{ position: "absolute", right: "3.5%", top: "50%", transform: "translateY(-50%)", zIndex: 8, display: "flex", flexDirection: "column", gap: 10 }}>
        {slides.map((sl, i) => {
          const active = i === current;
          return (
            <button
              key={i} onClick={() => go(i)}
              style={{
                width: active ? 58 : 48, height: active ? 82 : 68,
                borderRadius: 5, overflow: "hidden", padding: 0, background: "none",
                border: active ? `2px solid ${s.accent}` : "1px solid rgba(255,255,255,0.1)",
                opacity: active ? 1 : 0.42,
                cursor: "pointer",
                transition: "all 0.38s cubic-bezier(0.34,1.56,0.64,1)",
                boxShadow: active ? `0 0 20px rgba(${s.accentRgb},0.55)` : "none",
              }}
            >
              <img src={sl.img} alt={sl.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </button>
          );
        })}
      </div>

      {/* ── arrows ── */}
      <CarouselArrow dir={-1} onClick={() => go(current - 1)} accentRgb={s.accentRgb} />
      <CarouselArrow dir={ 1} onClick={() => go(current + 1)} accentRgb={s.accentRgb} />

      {/* ── bottom HUD ── */}
      <div style={{ position: "absolute", bottom: 30, left: "5%", zIndex: 8, display: "flex", alignItems: "center", gap: 18 }}>
        <span style={{ fontFamily: T.font, fontSize: 10, letterSpacing: "0.28em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>Featured</span>
        <div style={{ display: "flex", gap: 6 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => go(i)} style={{
              width: i === current ? 28 : 6, height: 6,
              borderRadius: 3, border: "none", padding: 0, cursor: "pointer",
              background: i === current ? s.accent : "rgba(255,255,255,0.18)",
              transition: "all 0.38s cubic-bezier(0.34,1.56,0.64,1)",
              boxShadow: i === current ? `0 0 10px rgba(${s.accentRgb},0.75)` : "none",
            }} />
          ))}
        </div>
        <span style={{ fontFamily: T.font, fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.18em" }}>
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

/* ─── SMALL HELPERS ──────────────────────────────────────────── */
function Pip() {
  return <span style={{ width: 1, height: 15, background: "rgba(255,255,255,0.12)", display: "inline-block" }} />;
}

function AccentBtn({ children, accent = "var(--accent)", accentRgb = "232,93,4", onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 9,
        background: accent, color: "#fff", border: "none",
        padding: "13px 26px", fontSize: 12,
        fontFamily: T.font, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
        cursor: "pointer",
        clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
        transition: "filter 0.2s ease, transform 0.2s ease",
        filter: hov ? "brightness(1.18)" : "brightness(1)",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
      }}
    >{children}</button>
  );
}

function GhostBtn({ children, accentRgb = "232,93,4", onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 9,
        background: hov ? `rgba(${accentRgb},0.08)` : "transparent",
        color: hov ? "#fff" : "rgba(255,255,255,0.65)",
        border: hov ? `1px solid rgba(${accentRgb},0.55)` : "1px solid rgba(255,255,255,0.15)",
        padding: "13px 22px", fontSize: 12,
        fontFamily: T.font, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
        cursor: "pointer", backdropFilter: "blur(8px)",
        transition: "all 0.22s ease",
      }}
    >{children}</button>
  );
}

function CarouselArrow({ dir, onClick, accentRgb }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "absolute", top: "50%",
        [dir === -1 ? "left" : "right"]: dir === -1 ? 18 : 76,
        transform: "translateY(-50%)",
        zIndex: 10, width: 44, height: 44,
        borderRadius: "50%",
        border: hov ? `1px solid rgba(${accentRgb},0.6)` : "1px solid rgba(255,255,255,0.12)",
        background: hov ? `rgba(${accentRgb},0.22)` : "rgba(4,4,10,0.52)",
        backdropFilter: "blur(10px)",
        color: hov ? "#fff" : "rgba(255,255,255,0.55)",
        fontSize: 22, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s ease",
      }}
    >{dir === -1 ? "‹" : "›"}</button>
  );
}

/* ─── MOVIE CARD ─────────────────────────────────────────────── */
function MovieCard({ title, rating, year, genre, img, index }) {
  const [hov, setHov]       = useState(false);
  const [visible, setVis]   = useState(false);
  const ref                 = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`movie-card card-appear${visible ? " visible" : ""}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        aspectRatio: "2/3",
        borderRadius: 6,
        overflow: "hidden",
        cursor: "pointer",
        background: T.bgCard,
        border: hov ? "1px solid rgba(232,93,4,0.22)" : "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        transitionDelay: `${index * 0.06}s`,
        boxShadow: hov
          ? "0 28px 64px rgba(0,0,0,0.85), 0 0 0 1px rgba(232,93,4,0.22)"
          : "0 6px 24px rgba(0,0,0,0.55)",
      }}
    >
      {/* poster */}
      <img
        src={img} alt={title} loading="lazy"
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.6s ease",
          transform: hov ? "scale(1.1)" : "scale(1.0)",
          filter: hov ? "brightness(0.42) saturate(0.55)" : "brightness(0.88)",
        }}
      />

      {/* genre tag */}
      <div style={{
        position: "absolute", top: 10, left: 10,
        padding: "3px 8px", fontSize: 9,
        fontFamily: T.font, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.7)", background: "rgba(4,4,10,0.72)",
        border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(6px)",
        borderRadius: 2, transition: "opacity 0.28s",
        opacity: hov ? 0 : 1,
      }}>{genre}</div>

      {/* rating badge */}
      <div style={{
        position: "absolute", top: 10, right: 10,
        display: "flex", alignItems: "center", gap: 5, padding: "4px 8px",
        background: "rgba(4,4,10,0.82)", border: "1px solid rgba(255,183,3,0.28)",
        borderRadius: 2, backdropFilter: "blur(6px)",
        transition: "opacity 0.28s", opacity: hov ? 0 : 1,
      }}>
        <StarIcon size={10} />
        <span style={{ fontSize: 11, color: T.gold, fontWeight: 700, fontFamily: T.font }}>{rating}</span>
      </div>

      {/* static title */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "linear-gradient(to top,rgba(4,4,10,1) 52%,transparent)",
        padding: "30px 14px 14px",
        transition: "opacity 0.28s", opacity: hov ? 0 : 1,
      }}>
        <p style={{ fontFamily: T.font, fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "0.02em", lineHeight: 1.3 }}>{title}</p>
      </div>

      {/* hover overlay */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: 16, opacity: hov ? 1 : 0,
        transition: "opacity 0.32s ease",
      }}>
        {/* HUD corners */}
        <HudCorner pos="tl" />
        <HudCorner pos="br" />

        <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.38)", marginBottom: 7, fontFamily: T.font, textTransform: "uppercase" }}>
          {year} · {genre}
        </div>
        <p style={{ fontFamily: T.font, fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 8, lineHeight: 1.2 }}>{title}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
          <StarIcon size={12} />
          <span style={{ fontSize: 13, color: T.gold, fontWeight: 700, fontFamily: T.font }}>{rating}</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{
            flex: 1, background: "var(--accent)", border: "none", color: "#fff",
            padding: "9px 0", fontSize: 11, fontFamily: T.font, fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2,
            clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))",
            transition: "filter 0.18s",
          }}
            onMouseOver={e => e.currentTarget.style.filter = "brightness(1.18)"}
            onMouseOut={e => e.currentTarget.style.filter = "brightness(1)"}
          >▶ Watch</button>
          <button style={{
            width: 36, background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.7)",
            fontSize: 16, cursor: "pointer", borderRadius: 2,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.18s, border-color 0.18s",
          }}
            onMouseOver={e => { e.currentTarget.style.background = "rgba(232,93,4,0.18)"; e.currentTarget.style.borderColor = "rgba(232,93,4,0.5)"; }}
            onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; }}
          >+</button>
        </div>
      </div>
    </div>
  );
}

function HudCorner({ pos }) {
  const tl = pos === "tl";
  return (
    <div style={{ position: "absolute", [tl ? "top" : "bottom"]: 11, [tl ? "left" : "right"]: 11, width: 16, height: 16 }}>
      <div style={{ position: "absolute", [tl ? "top" : "bottom"]: 0, [tl ? "left" : "right"]: 0, width: "100%", height: 1, background: "var(--accent)" }} />
      <div style={{ position: "absolute", [tl ? "top" : "bottom"]: 0, [tl ? "left" : "right"]: 0, width: 1, height: "100%", background: "var(--accent)" }} />
    </div>
  );
}

function StarIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="#ffb703">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>
  );
}

/* ─── NAVBAR ─────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("Home");
  const [search,   setSearch]   = useState(false);
  const [query,    setQuery]    = useState("");
  const inputRef                = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const openSearch = () => {
    setSearch(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 5%",
      background: scrolled ? "rgba(4,4,10,0.92)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      backdropFilter: scrolled ? "blur(18px)" : "none",
      transition: "background 0.4s ease, border-color 0.4s, backdrop-filter 0.4s",
    }}>

      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 13, cursor: "pointer" }}>
        <div style={{ width: 32, height: 32, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M4 3.5A1.5 1.5 0 015.5 2h7.379a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0118.5 7.622V20.5A1.5 1.5 0 0117 22H5.5A1.5 1.5 0 014 20.5v-17z"/></svg>
        </div>
        <span style={{ fontFamily: T.font, fontWeight: 800, fontSize: 17, letterSpacing: "0.28em", color: "#fff", textTransform: "uppercase" }}>CineSphere</span>
      </div>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        {["Home", "Discover", "Tickets", "My List"].map(label => {
          const path =
            label === "Discover" ? "./pages/Discover" :
            label === "Tickets" ? "./pages/Tickets" :
            label === "My List" ? "./pages/MyList" :
            "./pages/App";


          return (
            <a
              key={label}
              href={path}
              onClick={() => setActive(label)}
              style={{
                position: "relative",
                background: "transparent",
                border: "none",
                color: active === label ? "#fff" : "rgba(255,255,255,0.38)",
                padding: "8px 14px",
                fontSize: 13,
                fontFamily: T.font,
                fontWeight: active === label ? 700 : 500,
                letterSpacing: "0.1em",
                cursor: "pointer",
                textTransform: "uppercase",
                transition: "color 0.2s",
                textDecoration: "none",
              }}
            >
              {label}
              {active === label && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 2,
                    left: 14,
                    right: 14,
                    height: 1,
                    background: "var(--accent)",
                    boxShadow: "0 0 7px var(--accent)",
                  }}
                />
              )}
            </a>
          );
        })}
      </div>

      {/* Right actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Search */}
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <button
            onClick={search ? () => { setSearch(false); setQuery(""); } : openSearch}
            style={{ position: "absolute", left: 10, zIndex: 1, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.48)", display: "flex", alignItems: "center", padding: 0, transition: "color 0.2s" }}
          >
            {search
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            }
          </button>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search…"
            className={`search-input${search ? " open" : ""}`}
          />
        </div>

        {/* Sign In */}
        <button
          style={{
            background: "var(--accent)", border: "none", color: "#fff",
            padding: "8px 18px", fontSize: 12,
            fontFamily: T.font, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
            cursor: "pointer", borderRadius: 2,
            clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))",
            transition: "filter 0.2s",
          }}
          onMouseOver={e => e.currentTarget.style.filter = "brightness(1.15)"}
          onMouseOut={e => e.currentTarget.style.filter = "brightness(1)"}
        >Sign In</button>
      </div>
    </nav>
  );
}

/* ─── SECTION HEADER ─────────────────────────────────────────── */
function SectionHeader({ eyebrow, title, activeGenre, onGenre }) {
  return (
    <div style={{ padding: "72px 5% 0" }}>
      {/* eyebrow */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{ width: 4, height: 4, background: "var(--accent)", borderRadius: "50%", boxShadow: "0 0 10px var(--accent)", animation: "pulseGlow 2.5s ease-in-out infinite" }} />
        <span style={{ fontSize: 11, letterSpacing: "0.28em", color: "var(--accent)", textTransform: "uppercase", fontFamily: T.font, fontWeight: 600 }}>{eyebrow}</span>
      </div>

      {/* title + view all */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 28 }}>
        <h2 style={{ fontFamily: T.font, fontWeight: 800, fontSize: "clamp(1.9rem,3.8vw,2.9rem)", letterSpacing: "-0.03em", color: "#fff", lineHeight: 1 }}>{title}</h2>
        <button style={{
          display: "flex", alignItems: "center", gap: 8, background: "transparent",
          border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.42)",
          padding: "8px 18px", fontSize: 12, fontFamily: T.font, fontWeight: 600,
          letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer",
          borderRadius: 2, transition: "all 0.2s", flexShrink: 0,
        }}
          onMouseOver={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
          onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.42)"; }}
        >
          View all
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>

      {/* genre filter chips */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        {ALL_GENRES.map((g, i) => (
          <button
            key={g}
            onClick={() => onGenre(g)}
            className={`genre-chip${activeGenre === g ? " active" : ""}`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >{g}</button>
        ))}
      </div>

      {/* accent separator */}
      <div style={{ height: 1, background: "linear-gradient(to right,rgba(232,93,4,0.55),rgba(232,93,4,0.12),transparent)", marginBottom: 24 }} />
    </div>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: T.bgFooter, borderTop: "1px solid rgba(255,255,255,0.04)", padding: "60px 5% 38px" }}>
      <div style={{ display: "flex", gap: 56, flexWrap: "wrap", justifyContent: "space-between", marginBottom: 44 }}>

        {/* brand col */}
        <div style={{ maxWidth: 290 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div style={{ width: 28, height: 28, background: "var(--accent)", clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M4 3.5A1.5 1.5 0 015.5 2h7.379a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0118.5 7.622V20.5A1.5 1.5 0 0117 22H5.5A1.5 1.5 0 014 20.5v-17z"/></svg>
            </div>
            <span style={{ fontFamily: T.font, fontWeight: 800, fontSize: 15, letterSpacing: "0.28em", color: "#fff", textTransform: "uppercase" }}>CineSphere Beta</span>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "rgba(232,224,216,0.32)", fontStyle: "italic", fontWeight: 300 }}>
            A curated film universe dedicated to the art, culture, and immersive experience of cinema — past, present, and future.
          </p>
          <div style={{ display: "flex", gap: 9, marginTop: 22 }}>
            {[{ l: "X", icon: "✕" }, { l: "Ig", icon: "◎" }, { l: "Fb", icon: "f" }, { l: "Yt", icon: "▶" }].map(({ l, icon }) => (
              <button key={l} title={l} style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.32)", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.background = "rgba(232,93,4,0.09)"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.32)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
              >{icon}</button>
            ))}
          </div>
        </div>

        {/* link columns */}
        {[
          { heading: "Navigate", links: ["Home", "Discover", "Tickets", "My List", "Settings"] },
          { heading: "Genre",    links: ["Action", "Drama", "Animation", "Sci-Fi", "Horror"] },
          { heading: "Company",  links: ["About", "Press", "Careers", "Privacy", "Terms"] },
        ].map(({ heading, links }) => (
          <div key={heading}>
            <p style={{ fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--accent)", fontFamily: T.font, fontWeight: 700, marginBottom: 18 }}>{heading}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {links.map(l => (
                <a key={l} href="#" style={{ fontSize: 14, color: "rgba(232,224,216,0.28)", textDecoration: "none", fontFamily: T.body, transition: "color 0.2s" }}
                  onMouseOver={e => e.currentTarget.style.color = "rgba(232,224,216,0.78)"}
                  onMouseOut={e => e.currentTarget.style.color = "rgba(232,224,216,0.28)"}
                >{l}</a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* bottom bar */}
      <div style={{ paddingTop: 26, borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <span style={{ fontSize: 11, letterSpacing: "0.18em", color: "rgba(255,255,255,0.14)", fontFamily: T.font, textTransform: "uppercase" }}>© 2025 CineSphere. All rights reserved.</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 7px #22c55e" }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", letterSpacing: "0.12em", fontFamily: T.font }}>All systems operational</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── ROOT ───────────────────────────────────────────────────── */
export default function CineSphere() {
  const [activeGenre, setActiveGenre] = useState("All");

  const filtered = activeGenre === "All"
    ? movies
    : movies.filter(m => m.genre === activeGenre);

  return (
    <>
      <GlobalStyles />
      <div style={{ background: T.bg, minHeight: "100vh" }}>
        <Navbar />
        <Carousel />

        <div style={{ height: 1, background: "linear-gradient(to right,transparent,rgba(232,93,4,0.28),rgba(232,93,4,0.08),transparent)" }} />

        <SectionHeader
          eyebrow="Curated for you"
          title="Recommendations"
          activeGenre={activeGenre}
          onGenre={setActiveGenre}
        />

        <div style={{
          padding: "0 5% 88px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(175px,1fr))",
          gap: 18,
        }}>
          {filtered.map((m, i) => (
            <MovieCard key={m.title} index={i} {...m} />
          ))}
        </div>

        <Footer />
      </div>
    </>
  );
}