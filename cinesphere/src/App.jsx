import { useState, useEffect, useRef } from "react";

const slides = [
  {
    studio: "Warner Bros. Pictures",
    title: "The Dark Knight",
    year: "2008",
    genre: "ACTION · CRIME",
    rating: "9.0",
    desc: "When Gotham City is terrorized by the Joker, Batman faces his greatest psychological and moral challenge yet.",
    img: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    color: "from-zinc-950 via-zinc-900/60",
  },
  {
    studio: "Pixar Animation Studios",
    title: "Coco",
    year: "2017",
    genre: "ANIMATION · FAMILY",
    rating: "8.4",
    desc: "Miguel journeys into the Land of the Dead to uncover his family's hidden past and follow his musical dreams.",
    img: "https://image.tmdb.org/t/p/original/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
    color: "from-orange-950 via-orange-900/50",
  },
  {
    studio: "Marvel Entertainment",
    title: "The Amazing Spider-Man",
    year: "2012",
    genre: "ACTION · ADVENTURE",
    rating: "6.9",
    desc: "Peter Parker uncovers the truth about his father and embraces his destiny as the web-slinging hero.",
    img: "https://image.tmdb.org/t/p/original/jexoNYnPd6vVrmygwF6QZmWPFdu.jpg",
    color: "from-blue-950 via-blue-900/50",
  },
  {
    studio: "Pixar Animation Studios",
    title: "WALL·E",
    year: "2008",
    genre: "ANIMATION · SCI-FI",
    rating: "8.4",
    desc: "A lonely robot discovers love and hope in a future Earth long abandoned by humanity.",
    img: "https://image.tmdb.org/t/p/original/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg",
    color: "from-sky-950 via-sky-900/50",
  },
];

const movies = [
  { title: "The Dark Knight", rating: "9.0", year: "2008", img: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { title: "Avengers: Infinity War", rating: "8.4", year: "2018", img: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg" },
  { title: "RIO", rating: "7.3", year: "2011", img: "https://image.tmdb.org/t/p/w500/5zqSpBtfsXmO9jcKxR5y0b9Pn6.jpg" },
  { title: "Jurassic World", rating: "7.0", year: "2015", img: "https://image.tmdb.org/t/p/w500/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg" },
  { title: "Cars", rating: "7.1", year: "2006", img: "https://image.tmdb.org/t/p/w500/abW5AzHDaIK1n9C36VdAeOwORRA.jpg" },
  { title: "The Amazing Spider-Man", rating: "6.9", year: "2012", img: "https://image.tmdb.org/t/p/w500/jexoNYnPd6vVrmygwF6QZmWPFdu.jpg" },
  { title: "WALL·E", rating: "8.4", year: "2008", img: "https://image.tmdb.org/t/p/w500/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg" },
  { title: "The Incredibles", rating: "8.0", year: "2004", img: "https://image.tmdb.org/t/p/w500/2LqaLgk4Z226KkgPJuiOQ58wvrm.jpg" },
];

function StarRating({ score }) {
  const stars = Math.round(parseFloat(score) / 2);
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-3.5 h-3.5 ${i <= stars ? "text-amber-400" : "text-zinc-700"}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

function Carousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  const go = (n, dir = 1) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent((n + slides.length) % slides.length);
      setAnimating(false);
    }, 400);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => go((current + 1 + slides.length) % slides.length, 1), 6000);
    return () => clearInterval(timerRef.current);
  }, [current]);

  const s = slides[current];

  return (
    <div className="relative overflow-hidden h-[88vh] min-h-[560px] group">
      {/* Background */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${animating ? "opacity-0" : "opacity-100"}`}
        style={{ willChange: "opacity" }}
      >
        <img
          src={s.img}
          alt={s.title}
          className="w-full h-full object-cover object-center scale-105"
          style={{ filter: "brightness(0.55)" }}
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${s.color} to-transparent`} />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-70" />
        {/* Film grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      {/* Slide strip indicator (top) */}
      <div className="absolute top-0 left-0 right-0 flex z-20 h-0.5">
        {slides.map((_, i) => (
          <div key={i} className="flex-1 mx-0.5">
            <div className={`h-full transition-all duration-500 ${i === current ? "bg-red-500" : "bg-white/20"}`} />
          </div>
        ))}
      </div>

      {/* Content */}
      <div
        className={`absolute inset-0 z-10 flex items-end pb-20 px-10 md:px-16 transition-all duration-400 ${
          animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
        style={{ willChange: "opacity, transform" }}
      >
        <div className="max-w-lg">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs tracking-[4px] text-red-400 uppercase font-medium">{s.studio}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span className="text-xs tracking-[3px] text-zinc-500 uppercase">{s.genre}</span>
          </div>

          <h1
            className="font-black text-white leading-none mb-3"
            style={{
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              fontFamily: "'Georgia', serif",
              letterSpacing: "-0.02em",
              textShadow: "0 2px 40px rgba(0,0,0,0.5)",
            }}
          >
            {s.title}
          </h1>

          <div className="flex items-center gap-4 mb-5">
            <StarRating score={s.rating} />
            <span className="text-amber-400 font-semibold text-sm">{s.rating}</span>
            <span className="text-zinc-600 text-sm">·</span>
            <span className="text-zinc-400 text-sm">{s.year}</span>
          </div>

          <p className="text-zinc-300 text-base leading-relaxed mb-8 max-w-sm" style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}>
            {s.desc}
          </p>

          <div className="flex gap-3">
            <button className="bg-red-600 hover:bg-red-500 active:scale-95 text-white px-7 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-200 rounded-sm">
              ▶ Watch Now
            </button>
            <button className="border border-white/20 hover:border-white/50 text-white/70 hover:text-white px-6 py-3 text-sm font-semibold tracking-wider transition-all duration-200 rounded-sm backdrop-blur-sm">
              + Watchlist
            </button>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => go(current - 1, -1)}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/30 backdrop-blur-md text-white hover:bg-red-600/30 hover:border-red-500/50 transition-all duration-200 opacity-0 group-hover:opacity-100 flex items-center justify-center"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button
        onClick={() => go(current + 1, 1)}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/30 backdrop-blur-md text-white hover:bg-red-600/30 hover:border-red-500/50 transition-all duration-200 opacity-0 group-hover:opacity-100 flex items-center justify-center"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-7 right-16 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? "w-6 h-2 bg-red-500" : "w-2 h-2 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-9 left-16 z-20 text-zinc-500 text-xs tracking-widest font-mono">
        <span className="text-white/60">{String(current + 1).padStart(2, "0")}</span>
        <span className="mx-1">/</span>
        {String(slides.length).padStart(2, "0")}
      </div>
    </div>
  );
}

function MovieCard({ title, rating, year, img }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer bg-zinc-900 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ boxShadow: hovered ? "0 24px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(239,68,68,0.2)" : "0 4px 20px rgba(0,0,0,0.4)" }}
    >
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700"
        style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
        loading="lazy"
      />
      {/* Always-visible bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />

      {/* Rating badge */}
      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm border border-amber-400/30 rounded px-2 py-0.5 flex items-center gap-1.5">
        <svg className="w-3 h-3 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <span className="text-amber-400 text-xs font-semibold">{rating}</span>
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <div className="text-xs text-zinc-400 tracking-widest uppercase mb-1">{year}</div>
        <div className="text-white font-bold text-base leading-snug mb-3" style={{ fontFamily: "'Georgia', serif" }}>
          {title}
        </div>
        <button className="self-start bg-red-600 hover:bg-red-500 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-sm transition-colors duration-200">
          ▶ Watch
        </button>
      </div>

      {/* Bottom title (always visible) */}
      <div
        className="absolute bottom-0 left-0 right-0 p-3 transition-opacity duration-300"
        style={{ opacity: hovered ? 0 : 1 }}
      >
        <p className="text-white text-sm font-semibold truncate" style={{ fontFamily: "'Georgia', serif" }}>{title}</p>
      </div>
    </div>
  );
}

export default function CineSphere() {
  const [activeNav, setActiveNav] = useState("Home");
  const navLinks = ["Home", "Tickets", "My List", "Log Out"];

  return (
    <div className="min-h-screen bg-zinc-950 text-white" style={{ fontFamily: "'Helvetica Neue', sans-serif" }}>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 h-16"
        style={{ background: "linear-gradient(to bottom, rgba(9,9,11,0.95), transparent)", backdropFilter: "blur(12px)" }}>

        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-sm bg-red-600 flex items-center justify-center text-white font-black text-xs">C</div>
          <span
            className="text-white font-black tracking-[5px] text-lg"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "0.3em" }}
          >
            CINESPHERE
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((label) => (
            <button
              key={label}
              onClick={() => setActiveNav(label)}
              className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 rounded-sm ${
                activeNav === label
                  ? "text-white bg-white/10"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              } ${label === "Log Out" ? "text-red-400 hover:text-red-300 hover:bg-red-900/20 !important" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Mobile menu icon */}
        <button className="md:hidden text-zinc-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </nav>

      {/* ── HERO CAROUSEL ── */}
      <Carousel />

      {/* ── SECTION HEADER ── */}
      <div className="px-8 md:px-16 pt-16 pb-6 flex items-end justify-between">
        <div>
          <p className="text-red-500 text-xs tracking-[4px] uppercase font-medium mb-2">Curated for you</p>
          <h2
            className="text-white leading-none"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontFamily: "'Georgia', serif", fontWeight: 700 }}
          >
            Recommendations
          </h2>
          <div className="mt-3 h-px w-16 bg-red-600" />
        </div>
        <button className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium transition-colors group">
          See all
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      {/* ── MOVIE GRID ── */}
      <div className="px-8 md:px-16 pb-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {movies.map((m, i) => (
          <MovieCard key={i} {...m} />
        ))}
      </div>

      {/* ── DIVIDER ── */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, rgba(239,68,68,0.4), rgba(239,68,68,0.15), transparent)" }} />

      {/* ── FOOTER ── */}
      <footer className="bg-zinc-950 px-8 md:px-16 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-sm bg-red-600 flex items-center justify-center text-white font-black text-xs">C</div>
              <span className="text-white font-black tracking-[5px] text-lg" style={{ fontFamily: "'Georgia', serif", letterSpacing: "0.3em" }}>
                CINESPHERE
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed italic" style={{ fontFamily: "'Georgia', serif" }}>
              A curated film universe dedicated to the art, culture, and experience of cinema.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                ["f", "Facebook"],
                ["in", "Instagram"],
                ["✕", "Twitter"],
              ].map(([icon, label]) => (
                <button
                  key={label}
                  title={label}
                  className="w-9 h-9 rounded-full border border-zinc-800 hover:border-red-500/60 text-zinc-500 hover:text-red-400 transition-all duration-200 flex items-center justify-center text-xs font-bold"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="text-zinc-400 text-xs tracking-[3px] uppercase font-semibold mb-5">Navigate</p>
              <div className="flex flex-col gap-3">
                {["Home", "Tickets", "Settings", "About"].map((l) => (
                  <a key={l} href="#" className="text-zinc-500 hover:text-red-400 text-sm transition-colors duration-200">
                    {l}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-zinc-400 text-xs tracking-[3px] uppercase font-semibold mb-5">Genre</p>
              <div className="flex flex-col gap-3">
                {["Action", "Drama", "Animation", "Sci-Fi"].map((l) => (
                  <a key={l} href="#" className="text-zinc-500 hover:text-red-400 text-sm transition-colors duration-200">
                    {l}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-700 text-xs tracking-widest">© 2025 CINESPHERE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map(l => (
              <a key={l} href="#" className="text-zinc-700 hover:text-zinc-500 text-xs transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}