import { useEffect, useRef, useState } from "react";

const slides = [
  {
    studio: "Warner Bros. Pictures",
    title: "The Dark Knight",
    rating: "4.5",
    desc: "When Gotham is terrorized by the Joker, Batman faces his greatest moral challenge.",
    img: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    studio: "Pixar Animation Studios",
    title: "Coco",
    rating: "4.2",
    desc: "Miguel journeys into the Land of the Dead to uncover his family's past.",
    img: "https://image.tmdb.org/t/p/original/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
  },
  {
    studio: "Marvel Entertainment",
    title: "Spider-Man",
    rating: "3.5",
    desc: "Peter Parker discovers his destiny as Spider-Man.",
    img: "https://image.tmdb.org/t/p/original/jexoNYnPd6vVrmygwF6QZmWPFdu.jpg",
  },
];

const movies = [
  {
    title: "The Dark Knight",
    rating: "4.5",
    img: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    title: "Infinity War",
    rating: "4.4",
    img: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  },
  {
    title: "RIO",
    rating: "4.1",
    img: "https://image.tmdb.org/t/p/w500/5zqSpBtfsXmO9jcKxR5y0b9Pn6.jpg",
  },
  {
    title: "Jurassic World",
    rating: "4.0",
    img: "https://image.tmdb.org/t/p/w500/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg",
  },
];

function Carousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const next = () => setCurrent((p) => (p + 1) % slides.length);
  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="relative overflow-hidden h-[70vh]">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div key={i} className="min-w-full h-[70vh] relative">
            <img
              src={s.img}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

            <div className="absolute left-10 top-1/2 -translate-y-1/2 max-w-xl text-white">
              <p className="text-red-400 tracking-[4px] text-xs uppercase">
                {s.studio}
              </p>

              <h1 className="text-5xl font-bold mt-2">
                {s.title}
              </h1>

              <p className="text-yellow-400 mt-2">
                ⭐ {s.rating}
              </p>

              <p className="mt-4 text-white/70 italic">
                {s.desc}
              </p>

              <button className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-2 uppercase tracking-widest">
                Purchase
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-red-600/30 hover:bg-red-600 text-white w-10 h-10 rounded-full"
      >
        ‹
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-600/30 hover:bg-red-600 text-white w-10 h-10 rounded-full"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i === current ? "bg-red-500 scale-125" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function MovieCard({ title, rating, img }) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-zinc-900">
      <img
        src={img}
        className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-lg">{title}</h3>
        <p className="text-yellow-400 text-sm">⭐ {rating}</p>

        <button className="mt-3 bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 w-fit">
          Purchase
        </button>
      </div>
    </div>
  );
}

export default function CineSphere() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* NAV */}
      <nav className="flex justify-between items-center px-6 py-4 bg-black/80 backdrop-blur border-b border-red-500/20 sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold tracking-[4px] text-red-500 text-xl">
          <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
          CINE SPHERE
        </div>

        <div className="hidden md:flex gap-3">
          {["Home", "Tickets", "Settings", "Logout"].map((l) => (
            <button
              key={l}
              className="px-3 py-1 border border-red-500/30 hover:border-red-500 hover:text-red-400 transition"
            >
              {l}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <Carousel />

      {/* SECTION */}
      <div className="px-6 mt-10">
        <h2 className="text-4xl font-bold tracking-widest bg-gradient-to-r from-white to-red-500 text-transparent bg-clip-text">
          Recommendations
        </h2>
        <div className="w-20 h-1 bg-red-500 mt-2" />
      </div>

      {/* GRID */}
      <div className="px-6 mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pb-16">
        {movies.map((m, i) => (
          <MovieCard key={i} {...m} />
        ))}
      </div>

      {/* FOOTER */}
      <footer className="border-t border-red-500/20 px-6 py-10 flex flex-col md:flex-row justify-between gap-10 bg-zinc-950">
        <div>
          <h3 className="text-red-500 font-bold tracking-[4px]">
            CINE SPHERE
          </h3>
          <p className="text-white/50 mt-3 max-w-xs text-sm italic">
            A cinematic experience platform inspired by immersive film culture.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {["Home", "Tickets", "Settings"].map((l) => (
            <a key={l} className="text-white/60 hover:text-red-400">
              {l}
            </a>
          ))}
        </div>

        <div className="flex gap-3">
          {["FB", "IG", "X"].map((s) => (
            <div
              key={s}
              className="w-9 h-9 flex items-center justify-center border border-red-500/30 rounded-full hover:border-red-500"
            >
              {s}
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}