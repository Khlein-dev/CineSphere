import { useState, useEffect, useRef, useCallback } from "react";

/* ─── DATA ─────────────────────────────────────────────────── */
const slides = [
  {
    studio: "Warner Bros. Pictures",
    title: "The Dark Knight",
    year: "2008", genre: "ACTION · CRIME · THRILLER",
    rating: "9.0", votes: "2.9M",
    desc: "When Gotham's criminal underworld is unleashed by the Joker, Batman must confront chaos — and the limits of his own moral code.",
    img: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    accent: "#e85d04", accentRgb: "232,93,4",
  },
  {
    studio: "Pixar Animation Studios",
    title: "Coco",
    year: "2017", genre: "ANIMATION · FAMILY · MUSIC",
    rating: "8.4", votes: "780K",
    desc: "Beneath a sky of marigold petals, Miguel crosses into the Land of the Dead to unravel the secret his family has buried for generations.",
    img: "https://image.tmdb.org/t/p/original/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
    accent: "#f77f00", accentRgb: "247,127,0",
  },
  {
    studio: "Marvel Entertainment",
    title: "The Amazing Spider-Man",
    year: "2012", genre: "ACTION · ADVENTURE · SCI-FI",
    rating: "6.9", votes: "540K",
    desc: "A radioactive bite and a hidden legacy collide. Peter Parker's transformation into Spider-Man begins — and so does his greatest reckoning.",
    img: "https://image.tmdb.org/t/p/original/jexoNYnPd6vVrmygwF6QZmWPFdu.jpg",
    accent: "#0077b6", accentRgb: "0,119,182",
  },
  {
    studio: "Pixar Animation Studios",
    title: "WALL·E",
    year: "2008", genre: "ANIMATION · SCI-FI · ROMANCE",
    rating: "8.4", votes: "1.1M",
    desc: "Centuries after humanity fled to the stars, a small robot still tends an abandoned Earth — until one visitor changes everything.",
    img: "https://image.tmdb.org/t/p/original/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg",
    accent: "#4cc9f0", accentRgb: "76,201,240",
  },
];

const movies = [
  { title: "The Dark Knight",        rating: "9.0", year: "2008", genre: "Crime",      img: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { title: "Avengers: Infinity War", rating: "8.4", year: "2018", genre: "Action",     img: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg" },
  { title: "Rio",                    rating: "7.3", year: "2011", genre: "Animation",  img: "https://image.tmdb.org/t/p/w500/5zqSpBtfsXmO9jcKxR5y0b9Pn6.jpg" },
  { title: "Jurassic World",         rating: "7.0", year: "2015", genre: "Adventure",  img: "https://image.tmdb.org/t/p/w500/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg" },
  { title: "Cars",                   rating: "7.1", year: "2006", genre: "Animation",  img: "https://image.tmdb.org/t/p/w500/abW5AzHDaIK1n9C36VdAeOwORRA.jpg" },
  { title: "The Amazing Spider-Man", rating: "6.9", year: "2012", genre: "Action",     img: "https://image.tmdb.org/t/p/w500/jexoNYnPd6vVrmygwF6QZmWPFdu.jpg" },
  { title: "WALL·E",                 rating: "8.4", year: "2008", genre: "Sci-Fi",     img: "https://image.tmdb.org/t/p/w500/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg" },
  { title: "The Incredibles",        rating: "8.0", year: "2004", genre: "Animation",  img: "https://image.tmdb.org/t/p/w500/2LqaLgk4Z226KkgPJuiOQ58wvrm.jpg" },
];

/* ─── GLOBAL STYLES ─────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --accent: #e85d04;
      --accent-rgb: 232,93,4;
    }

    html { scroll-behavior: smooth; }

    body, #root {
      background: #04040a;
      color: #e8e0d8;
      font-family: 'DM Sans', sans-serif;
      overflow-x: hidden;
    }

    /* Scanline texture */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(255,255,255,0.012) 2px,
        rgba(255,255,255,0.012) 4px
      );
      pointer-events: none;
      z-index: 9999;
    }

    /* Custom scrollbar */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #04040a; }
    ::-webkit-scrollbar-thumb { background: rgba(var(--accent-rgb), 0.5); border-radius: 2px; }

    /* Syne headings */
    .font-syne { font-family: 'Syne', sans-serif; }

    /* Clip paths */
    .clip-hex { clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }

    /* HUD corner */
    .hud-corner {
      position: relative;
    }
    .hud-corner::before,
    .hud-corner::after {
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
    }
    .hud-corner::before {
      top: 0; left: 0;
      border-top: 1px solid rgba(var(--accent-rgb), 0.7);
      border-left: 1px solid rgba(var(--accent-rgb), 0.7);
    }
    .hud-corner::after {
      bottom: 0; right: 0;
      border-bottom: 1px solid rgba(var(--accent-rgb), 0.7);
      border-right: 1px solid rgba(var(--accent-rgb), 0.7);
    }

    /* Glitch text */
    @keyframes glitch {
      0%   { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 0); }
      20%  { clip-path: inset(92% 0 1% 0);  transform: translate(2px, 0); }
      40%  { clip-path: inset(43% 0 50% 0); transform: translate(-2px, 0); }
      60%  { clip-path: inset(25% 0 58% 0); transform: translate(2px, 0); }
      80%  { clip-path: inset(54% 0 7% 0);  transform: translate(-2px, 0); }
      100% { clip-path: inset(58% 0 43% 0); transform: translate(2px, 0); }
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-32px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    @keyframes pulseRing {
      0%   { transform: scale(0.9); opacity: 0.8; }
      50%  { transform: scale(1.05); opacity: 0.4; }
      100% { transform: scale(0.9); opacity: 0.8; }
    }

    @keyframes scanX {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(400%); }
    }

    @keyframes dash {
      to { stroke-dashoffset: 0; }
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0; }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-6px); }
    }

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

    .animate-fadeUp { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
    .animate-slideInLeft { animation: slideInLeft 0.6s cubic-bezier(0.22,1,0.36,1) both; }
    .animate-pulseRing { animation: pulseRing 2.5s ease-in-out infinite; }
    .animate-float { animation: float 4s ease-in-out infinite; }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-400 { animation-delay: 0.4s; }
    .delay-500 { animation-delay: 0.5s; }

    /* Card magnetic hover */
    .movie-card {
      transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease;
      transform-style: preserve-3d;
    }
    .movie-card:hover {
      transform: translateY(-10px) scale(1.02);
    }

    /* Nav glow */
    .nav-link-active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0; right: 0;
      height: 1px;
      background: var(--accent);
      box-shadow: 0 0 8px var(--accent);
    }

    /* Noise overlay */
    .noise::after {
      content: '';
      position: absolute;
      inset: -50%;
      width: 200%; height: 200%;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.035;
      pointer-events: none;
      animation: grain 8s steps(10) infinite;
    }

    /* Progress bar */
    @keyframes progressFill {
      from { width: 0%; }
      to   { width: 100%; }
    }
    .progress-active {
      animation: progressFill 6s linear forwards;
    }

    /* Typing cursor */
    .cursor-blink::after {
      content: '|';
      animation: blink 1s step-end infinite;
      color: var(--accent);
    }
  `}</style>
);

/* ─── COMPONENTS ─────────────────────────────────────────── */

function RatingBar({ score }) {
  const pct = (parseFloat(score) / 10) * 100;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 80, height: 3,
        background: "rgba(255,255,255,0.1)",
        borderRadius: 2,
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          background: "linear-gradient(90deg, var(--accent), #ffb703)",
          borderRadius: 2,
        }} />
      </div>
      <span style={{ fontSize: 13, color: "#ffb703", fontWeight: 600, fontFamily: "'Syne', sans-serif" }}>
        {score}
      </span>
    </div>
  );
}

function HexBadge({ children, color = "var(--accent)" }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 10px",
      fontSize: 10,
      fontFamily: "'Syne', sans-serif",
      fontWeight: 700,
      letterSpacing: "0.18em",
      color,
      border: `1px solid ${color}`,
      textTransform: "uppercase",
      opacity: 0.9,
    }}>
      {children}
    </span>
  );
}

/* ─── CAROUSEL ──────────────────────────────────────────────── */
function Carousel() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [key, setKey] = useState(0);
  const timerRef = useRef(null);

  const go = useCallback((n) => {
    if (transitioning) return;
    const next = (n + slides.length) % slides.length;
    setTransitioning(true);
    setPrev(current);
    setTimeout(() => {
      setCurrent(next);
      setPrev(null);
      setTransitioning(false);
      setKey(k => k + 1);
    }, 600);
  }, [current, transitioning]);

  useEffect(() => {
    timerRef.current = setInterval(() => go(current + 1), 7000);
    return () => clearInterval(timerRef.current);
  }, [current, go]);

  const s = slides[current];

  return (
    <div style={{
      position: "relative",
      height: "100vh",
      minHeight: 600,
      overflow: "hidden",
    }}>
      {/* BG layers */}
      {prev !== null && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          opacity: transitioning ? 0 : 1,
          transition: "opacity 0.6s ease",
        }}>
          <img
            src={slides[prev].img}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.3) saturate(0.5)" }}
          />
        </div>
      )}

      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        opacity: transitioning ? 0 : 1,
        transition: "opacity 0.6s ease",
        transitionDelay: transitioning ? "0s" : "0.1s",
      }}>
        <img
          src={s.img}
          alt={s.title}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center 20%",
            filter: "brightness(0.38) saturate(0.8)",
            transform: "scale(1.04)",
            transition: "transform 8s ease",
          }}
        />

        {/* Gradient overlays */}
        <div style={{
          position: "absolute", inset: 0,
          background: `
            linear-gradient(105deg, rgba(4,4,10,0.97) 30%, rgba(4,4,10,0.5) 65%, transparent 100%),
            linear-gradient(to top, rgba(4,4,10,0.9) 0%, transparent 50%)
          `,
        }} />

        {/* Accent color wash */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse 60% 80% at 75% 40%, rgba(${s.accentRgb},0.12) 0%, transparent 70%)`,
          transition: "background 0.8s ease",
        }} />
      </div>

      {/* Scan line sweep */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 4,
        overflow: "hidden", pointerEvents: "none",
      }}>
        <div style={{
          position: "absolute", top: 0, bottom: 0, width: "25%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.015), transparent)",
          animation: "scanX 4s ease-in-out infinite",
        }} />
      </div>

      {/* Progress bars */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        display: "flex", gap: 3, zIndex: 10, padding: "0 5%",
      }}>
        {slides.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.12)", overflow: "hidden" }}>
            <div
              className={i === current ? "progress-active" : ""}
              style={{
                height: "100%",
                background: i < current ? "rgba(255,255,255,0.5)" : i === current ? s.accent : "transparent",
                width: i < current ? "100%" : undefined,
              }}
            />
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 5,
        display: "flex", alignItems: "center",
        padding: "0 5% 60px",
      }}>
        <div style={{ maxWidth: 640 }}>
          {/* Studio + genre */}
          <div
            key={`meta-${key}`}
            className="animate-slideInLeft"
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
          >
            <HexBadge color={s.accent}>{s.genre}</HexBadge>
            <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.15)" }} />
            <span style={{
              fontSize: 11, letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.4)", textTransform: "uppercase",
              fontFamily: "'Syne', sans-serif",
            }}>
              {s.studio}
            </span>
          </div>

          {/* TITLE */}
          <h1
            key={`title-${key}`}
            className="font-syne animate-fadeUp"
            style={{
              fontSize: "clamp(3.2rem,7vw,6rem)",
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              marginBottom: 28,
              textShadow: `0 0 60px rgba(${s.accentRgb},0.25)`,
            }}
          >
            {s.title}
          </h1>

          {/* Stats row */}
          <div
            key={`stats-${key}`}
            className="animate-fadeUp delay-100"
            style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}
          >
            <RatingBar score={s.rating} />
            <span style={{ width: 1, height: 16, background: "rgba(255,255,255,0.12)" }} />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>{s.year}</span>
            <span style={{ width: 1, height: 16, background: "rgba(255,255,255,0.12)" }} />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>{s.votes} ratings</span>
          </div>

          {/* Description */}
          <p
            key={`desc-${key}`}
            className="animate-fadeUp delay-200"
            style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: "rgba(232,224,216,0.65)",
              marginBottom: 36,
              maxWidth: 520,
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            {s.desc}
          </p>

          {/* CTA */}
          <div
            key={`cta-${key}`}
            className="animate-fadeUp delay-300"
            style={{ display: "flex", gap: 14 }}
          >
            <button
              style={{
                display: "flex", alignItems: "center", gap: 10,
                background: s.accent,
                color: "#fff",
                border: "none",
                padding: "14px 28px",
                fontSize: 13,
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s ease",
                clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
              }}
              onMouseOver={e => { e.currentTarget.style.filter = "brightness(1.15)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseOut={e => { e.currentTarget.style.filter = "brightness(1)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Watch Now
            </button>

            <button
              style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "transparent",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "14px 24px",
                fontSize: 13,
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                backdropFilter: "blur(8px)",
                transition: "all 0.2s ease",
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = `rgba(${s.accentRgb},0.6)`; e.currentTarget.style.color = "#fff"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
              My List
            </button>
          </div>
        </div>
      </div>

      {/* Right thumbnail strip */}
      <div style={{
        position: "absolute", right: "4%", top: "50%",
        transform: "translateY(-50%)",
        zIndex: 8,
        display: "flex", flexDirection: "column", gap: 12,
      }}>
        {slides.map((sl, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            style={{
              width: i === current ? 56 : 48,
              height: i === current ? 78 : 68,
              borderRadius: 4,
              overflow: "hidden",
              border: i === current ? `2px solid ${s.accent}` : "1px solid rgba(255,255,255,0.1)",
              opacity: i === current ? 1 : 0.45,
              cursor: "pointer",
              transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
              padding: 0,
              background: "none",
              boxShadow: i === current ? `0 0 16px rgba(${s.accentRgb},0.5)` : "none",
            }}
            onMouseOver={e => { if (i !== current) e.currentTarget.style.opacity = "0.75"; }}
            onMouseOut={e => { if (i !== current) e.currentTarget.style.opacity = "0.45"; }}
          >
            <img src={sl.img} alt={sl.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </button>
        ))}
      </div>

      {/* Arrows */}
      {[{ dir: -1, sym: "‹", pos: "left: 20px" }, { dir: 1, sym: "›", pos: "right: 80px" }].map(({ dir, sym, pos }) => (
        <button
          key={dir}
          onClick={() => go(current + dir)}
          style={{
            position: "absolute", top: "50%",
            [dir === -1 ? "left" : "right"]: dir === -1 ? 20 : 80,
            transform: "translateY(-50%)",
            zIndex: 10,
            width: 44, height: 44,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(4,4,10,0.5)",
            backdropFilter: "blur(8px)",
            color: "rgba(255,255,255,0.6)",
            fontSize: 24,
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s ease",
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = `rgba(${s.accentRgb},0.25)`;
            e.currentTarget.style.borderColor = `rgba(${s.accentRgb},0.6)`;
            e.currentTarget.style.color = "#fff";
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = "rgba(4,4,10,0.5)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            e.currentTarget.style.color = "rgba(255,255,255,0.6)";
          }}
        >
          {sym}
        </button>
      ))}

      {/* Bottom HUD */}
      <div style={{
        position: "absolute", bottom: 32, left: "5%",
        zIndex: 8,
        display: "flex", alignItems: "center", gap: 20,
      }}>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 11, letterSpacing: "0.25em",
          color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
        }}>
          Featured
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              style={{
                width: i === current ? 24 : 6,
                height: 6,
                borderRadius: 3,
                background: i === current ? s.accent : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                boxShadow: i === current ? `0 0 8px rgba(${s.accentRgb},0.7)` : "none",
              }}
            />
          ))}
        </div>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 11, letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.2)",
        }}>
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

/* ─── MOVIE CARD ─────────────────────────────────────────────── */
function MovieCard({ title, rating, year, genre, img, index }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="movie-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        aspectRatio: "2/3",
        borderRadius: 6,
        overflow: "hidden",
        cursor: "pointer",
        background: "#0d0d18",
        border: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.07}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.07}s, box-shadow 0.4s ease`,
        boxShadow: hovered ? "0 28px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(232,93,4,0.25)" : "0 4px 20px rgba(0,0,0,0.5)",
      }}
    >
      <img
        src={img}
        alt={title}
        loading="lazy"
        style={{
          width: "100%", height: "100%",
          objectFit: "cover",
          transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.6s ease",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          filter: hovered ? "brightness(0.5) saturate(0.6)" : "brightness(0.85)",
        }}
      />

      {/* Genre tag */}
      <div style={{
        position: "absolute", top: 10, left: 10,
        padding: "3px 8px",
        fontSize: 9,
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.7)",
        background: "rgba(4,4,10,0.7)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(6px)",
        borderRadius: 2,
        transition: "opacity 0.3s",
        opacity: hovered ? 0 : 1,
      }}>
        {genre}
      </div>

      {/* Rating badge */}
      <div style={{
        position: "absolute", top: 10, right: 10,
        display: "flex", alignItems: "center", gap: 5,
        padding: "4px 8px",
        background: "rgba(4,4,10,0.8)",
        border: "1px solid rgba(255,183,3,0.3)",
        borderRadius: 2,
        backdropFilter: "blur(6px)",
        transition: "opacity 0.3s",
        opacity: hovered ? 0 : 1,
      }}>
        <svg width="10" height="10" viewBox="0 0 20 20" fill="#ffb703">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <span style={{ fontSize: 11, color: "#ffb703", fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>{rating}</span>
      </div>

      {/* Bottom always-visible title */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "linear-gradient(to top, rgba(4,4,10,1) 50%, transparent)",
        padding: "32px 14px 14px",
        transition: "opacity 0.3s",
        opacity: hovered ? 0 : 1,
      }}>
        <p style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 14, fontWeight: 700,
          color: "#fff",
          letterSpacing: "0.02em",
          lineHeight: 1.3,
        }}>
          {title}
        </p>
      </div>

      {/* Hover overlay */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "flex-end",
        padding: 18,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.35s ease",
      }}>
        {/* HUD corners */}
        <div style={{ position: "absolute", top: 12, left: 12, width: 16, height: 16 }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 1, background: "var(--accent)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: 1, height: "100%", background: "var(--accent)" }} />
        </div>
        <div style={{ position: "absolute", bottom: 12, right: 12, width: 16, height: 16 }}>
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "100%", height: 1, background: "var(--accent)" }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 1, height: "100%", background: "var(--accent)" }} />
        </div>

        <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)", marginBottom: 8, fontFamily: "'Syne', sans-serif", textTransform: "uppercase" }}>
          {year} · {genre}
        </div>
        <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 800, color: "#fff", marginBottom: 6, lineHeight: 1.2 }}>
          {title}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
          <svg width="12" height="12" viewBox="0 0 20 20" fill="#ffb703">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span style={{ fontSize: 13, color: "#ffb703", fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>{rating}</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{
              flex: 1,
              background: "var(--accent)",
              border: "none",
              color: "#fff",
              padding: "9px 0",
              fontSize: 11,
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: 2,
              clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
            }}
          >
            ▶ Watch
          </button>
          <button
            style={{
              width: 36,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.7)",
              fontSize: 14,
              cursor: "pointer",
              borderRadius: 2,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── NAVBAR ─────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 5%",
      background: scrolled ? "rgba(4,4,10,0.92)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
    }}>
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
        {/* Logo mark */}
        <div style={{
          width: 32, height: 32,
          background: "var(--accent)",
          display: "flex", alignItems: "center", justifyContent: "center",
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M4 3.5A1.5 1.5 0 015.5 2h7.379a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0118.5 7.622V20.5A1.5 1.5 0 0117 22H5.5A1.5 1.5 0 014 20.5v-17z"/>
          </svg>
        </div>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 17,
          letterSpacing: "0.28em",
          color: "#fff",
          textTransform: "uppercase",
        }}>
          CineSphere
        </span>
      </div>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {["Home", "Discover", "Tickets", "My List"].map(label => (
          <button
            key={label}
            onClick={() => setActive(label)}
            style={{
              position: "relative",
              background: "transparent",
              border: "none",
              color: active === label ? "#fff" : "rgba(255,255,255,0.4)",
              padding: "8px 14px",
              fontSize: 13,
              fontFamily: "'Syne', sans-serif",
              fontWeight: active === label ? 700 : 500,
              letterSpacing: "0.1em",
              cursor: "pointer",
              textTransform: "uppercase",
              transition: "color 0.2s ease",
            }}
          >
            {label}
            {active === label && (
              <div style={{
                position: "absolute",
                bottom: 2, left: 14, right: 14,
                height: 1,
                background: "var(--accent)",
                boxShadow: "0 0 6px var(--accent)",
              }} />
            )}
          </button>
        ))}
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button style={{
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.5)",
          width: 36, height: 36,
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s",
        }}
          onMouseOver={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
          onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
        <button style={{
          background: "var(--accent)",
          border: "none",
          color: "#fff",
          padding: "8px 18px",
          fontSize: 12,
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          cursor: "pointer",
          borderRadius: 2,
          clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
          transition: "filter 0.2s",
        }}
          onMouseOver={e => e.currentTarget.style.filter = "brightness(1.15)"}
          onMouseOut={e => e.currentTarget.style.filter = "brightness(1)"}
        >
          Sign In
        </button>
      </div>
    </nav>
  );
}

/* ─── SECTION HEADER ─────────────────────────────────────────── */
function SectionHeader({ eyebrow, title }) {
  return (
    <div style={{ padding: "80px 5% 28px" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 14, marginBottom: 14,
      }}>
        <div style={{ width: 4, height: 4, background: "var(--accent)", borderRadius: "50%", boxShadow: "0 0 8px var(--accent)" }} />
        <span style={{
          fontSize: 11, letterSpacing: "0.28em",
          color: "var(--accent)", textTransform: "uppercase",
          fontFamily: "'Syne', sans-serif", fontWeight: 600,
        }}>
          {eyebrow}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(2rem,4vw,3rem)",
          letterSpacing: "-0.03em",
          color: "#fff",
          lineHeight: 1,
        }}>
          {title}
        </h2>
        <button style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.45)",
          padding: "8px 18px",
          fontSize: 12,
          fontFamily: "'Syne', sans-serif",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          cursor: "pointer",
          borderRadius: 2,
          transition: "all 0.2s ease",
          flexShrink: 0,
        }}
          onMouseOver={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
          onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
        >
          View all
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
      {/* Separator */}
      <div style={{
        marginTop: 20,
        height: 1,
        background: "linear-gradient(to right, rgba(232,93,4,0.6), rgba(232,93,4,0.15), transparent)",
      }} />
    </div>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      background: "#020208",
      borderTop: "1px solid rgba(255,255,255,0.04)",
      padding: "64px 5% 40px",
    }}>
      <div style={{ display: "flex", gap: 60, flexWrap: "wrap", justifyContent: "space-between", marginBottom: 48 }}>
        <div style={{ maxWidth: 300 }}>
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{
              width: 28, height: 28,
              background: "var(--accent)",
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                <path d="M4 3.5A1.5 1.5 0 015.5 2h7.379a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0118.5 7.622V20.5A1.5 1.5 0 0117 22H5.5A1.5 1.5 0 014 20.5v-17z"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "0.28em", color: "#fff", textTransform: "uppercase" }}>
              CineSphere
            </span>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(232,224,216,0.35)", fontStyle: "italic", fontWeight: 300 }}>
            A curated film universe dedicated to the art, culture, and immersive experience of cinema — past, present, and future.
          </p>
          {/* Socials */}
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            {[
              { l: "Tw", icon: "✕" },
              { l: "Ig", icon: "◎" },
              { l: "Fb", icon: "f" },
              { l: "Yt", icon: "▶" },
            ].map(({ l, icon }) => (
              <button
                key={l}
                title={l}
                style={{
                  width: 34, height: 34,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 12,
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.background = "rgba(232,93,4,0.08)"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {[
          { heading: "Navigate", links: ["Home", "Discover", "Tickets", "My List", "Settings"] },
          { heading: "Genre", links: ["Action", "Drama", "Animation", "Sci-Fi", "Horror"] },
          { heading: "Company", links: ["About", "Press", "Careers", "Privacy", "Terms"] },
        ].map(({ heading, links }) => (
          <div key={heading}>
            <p style={{
              fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase",
              color: "var(--accent)", fontFamily: "'Syne', sans-serif", fontWeight: 700,
              marginBottom: 20,
            }}>
              {heading}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {links.map(l => (
                <a
                  key={l}
                  href="#"
                  style={{
                    fontSize: 14, color: "rgba(232,224,216,0.3)",
                    textDecoration: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "color 0.2s ease",
                  }}
                  onMouseOver={e => e.currentTarget.style.color = "rgba(232,224,216,0.8)"}
                  onMouseOut={e => e.currentTarget.style.color = "rgba(232,224,216,0.3)"}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div style={{
        paddingTop: 28,
        borderTop: "1px solid rgba(255,255,255,0.04)",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
      }}>
        <span style={{ fontSize: 11, letterSpacing: "0.18em", color: "rgba(255,255,255,0.15)", fontFamily: "'Syne', sans-serif", textTransform: "uppercase" }}>
          © 2025 CineSphere. All rights reserved.
        </span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.12em", fontFamily: "'Syne', sans-serif" }}>
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ─── ROOT ───────────────────────────────────────────────────── */
export default function CineSphere() {
  return (
    <>
      <GlobalStyles />
      <div style={{ background: "#04040a", minHeight: "100vh" }}>
        <Navbar />
        <Carousel />

        {/* Decorative divider between hero and grid */}
        <div style={{
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(232,93,4,0.3), rgba(232,93,4,0.1), transparent)",
        }} />

        <SectionHeader eyebrow="Curated for you" title="Recommendations" />

        <div style={{
          padding: "0 5% 80px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 16,
        }}>
          {movies.map((m, i) => (
            <MovieCard key={i} index={i} {...m} />
          ))}
        </div>

        <Footer />
      </div>
    </>
  );
}