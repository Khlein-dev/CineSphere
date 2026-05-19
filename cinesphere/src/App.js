import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Crimson+Pro:ital,wght@0,300;0,400;1,300&display=swap');

  :root {
    --red: #e95959;
    --dark-red: #910b0b;
    --deepest: #0a0000;
    --bg: #0f0404;
    --card-bg: #1a0808;
    --text: #f5ebe0;
    --muted: #a08080;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Crimson Pro', serif;
    overflow-x: hidden;
  }

  .cs-navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(10,0,0,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(233,89,89,0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    height: 64px;
  }

  .cs-brand {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 4px;
    color: var(--red);
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }

  .cs-brand-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--red);
    display: inline-block;
  }

  .cs-nav-links {
    display: flex;
    gap: 8px;
  }

  .cs-nav-btn {
    background: transparent;
    border: 1px solid rgba(233,89,89,0.4);
    color: var(--text);
    padding: 6px 14px;
    border-radius: 4px;
    font-family: 'Crimson Pro', serif;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .cs-nav-btn:hover {
    border-color: var(--red);
    color: var(--red);
    background: rgba(233,89,89,0.08);
  }

  .cs-carousel-wrap {
    position: relative;
    overflow: hidden;
  }

  .cs-carousel-track {
    display: flex;
    transition: transform 0.6s cubic-bezier(0.77,0,0.175,1);
  }

  .cs-carousel-slide {
    min-width: 100%;
    height: 500px;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }

  .cs-carousel-slide::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
      to right,
      rgba(10,0,0,0.92) 35%,
      rgba(10,0,0,0.1) 100%
    );
  }

  .cs-slide-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .cs-slide-content {
    position: absolute;
    top: 50%;
    left: 60px;
    transform: translateY(-50%);
    z-index: 2;
    max-width: 520px;
  }

  .cs-slide-studio {
    font-size: 12px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--red);
    margin-bottom: 10px;
  }

  .cs-slide-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 72px;
    line-height: 0.9;
    letter-spacing: 3px;
    color: #fff;
    margin-bottom: 10px;
  }

  .cs-slide-rating {
    color: #f5c518;
    font-size: 14px;
    letter-spacing: 2px;
    margin-bottom: 16px;
  }

  .cs-slide-desc {
    font-size: 16px;
    line-height: 1.6;
    color: rgba(245,235,224,0.75);
    margin-bottom: 24px;
    font-style: italic;
  }

  .cs-btn-purchase {
    background: var(--red);
    color: #fff;
    border: none;
    padding: 10px 28px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    letter-spacing: 2px;
    cursor: pointer;
    border-radius: 2px;
    transition: background 0.2s, transform 0.15s;
  }

  .cs-btn-purchase:hover {
    background: #b01111;
    transform: translateY(-1px);
  }

  .cs-carousel-ctrl {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background: rgba(233,89,89,0.2);
    border: 1px solid rgba(233,89,89,0.4);
    color: var(--red);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cs-carousel-ctrl:hover {
    background: rgba(233,89,89,0.4);
  }

  .cs-carousel-ctrl.prev {
    left: 20px;
  }

  .cs-carousel-ctrl.next {
    right: 20px;
  }

  .cs-carousel-dots {
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
  }

  .cs-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255,255,255,0.3);
    cursor: pointer;
    transition: all 0.3s;
  }

  .cs-dot.active {
    background: var(--red);
    transform: scale(1.3);
  }

  .cs-section-header {
    padding: 50px 40px 20px;
  }

  .cs-section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 64px;
    letter-spacing: 6px;
    color: #fff;
    background: linear-gradient(135deg, #fff 40%, var(--red) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .cs-section-line {
    width: 80px;
    height: 3px;
    background: var(--red);
    margin-top: 8px;
  }

  .cs-movie-grid {
    padding: 10px 40px 60px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .cs-movie-card {
    aspect-ratio: 2/3;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    background: var(--card-bg);
    border: 1px solid rgba(233,89,89,0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .cs-movie-card:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow:
      0 20px 40px rgba(0,0,0,0.6),
      0 0 20px rgba(233,89,89,0.15);
  }

  .cs-movie-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cs-movie-card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(10,0,0,0.98) 40%,
      rgba(10,0,0,0.1) 100%
    );
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .cs-movie-card:hover .cs-movie-card-overlay {
    opacity: 1;
  }

  .cs-movie-card-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 1px;
    color: #fff;
  }

  .cs-movie-card-rating {
    color: #f5c518;
    font-size: 13px;
    margin: 6px 0 12px;
  }

  .cs-btn-sm {
    background: var(--red);
    color: #fff;
    border: none;
    padding: 7px 18px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 15px;
    letter-spacing: 2px;
    cursor: pointer;
    border-radius: 2px;
    transition: background 0.2s;
    align-self: flex-start;
  }

  .cs-btn-sm:hover {
    background: #b01111;
  }

  .cs-divider {
    height: 4px;
    border: none;
    background: linear-gradient(
      to right,
      #e95959,
      #b01111,
      #910b0b,
      #250404
    );
    margin: 0;
  }

  .cs-footer {
    background: #070202;
    padding: 40px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 30px;
  }

  .cs-footer-brand {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px;
    letter-spacing: 4px;
    color: var(--red);
    margin-bottom: 12px;
  }

  .cs-footer-desc {
    font-size: 14px;
    color: var(--muted);
    max-width: 280px;
    line-height: 1.6;
    font-style: italic;
  }

  .cs-footer-copy {
    font-size: 12px;
    color: rgba(160,128,128,0.5);
    margin-top: 20px;
    letter-spacing: 1px;
  }

  .cs-footer-links {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .cs-footer-link {
    color: var(--muted);
    text-decoration: none;
    font-size: 15px;
    transition: color 0.2s;
  }

  .cs-footer-link:hover {
    color: var(--red);
  }

  .cs-footer-socials {
    margin-top: 20px;
    display: flex;
    gap: 12px;
  }

  .cs-social-icon {
    width: 34px;
    height: 34px;
    border: 1px solid rgba(233,89,89,0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--muted);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .cs-social-icon:hover {
    border-color: var(--red);
    color: var(--red);
  }

  @media (max-width: 700px) {
    .cs-movie-grid {
      grid-template-columns: repeat(2, 1fr);
      padding: 10px 16px 40px;
    }

    .cs-slide-content {
      left: 20px;
      max-width: 90%;
    }

    .cs-slide-title {
      font-size: 44px;
    }

    .cs-section-header {
      padding: 30px 16px 10px;
    }

    .cs-navbar {
      padding: 0 16px;
    }

    .cs-nav-links {
      gap: 4px;
    }

    .cs-nav-btn {
      padding: 5px 10px;
      font-size: 13px;
    }

    .cs-section-title {
      font-size: 40px;
    }
  }
`;

const slides = [
  {
    studio: "Warner Bros. Pictures",
    title: "The Dark Knight",
    rating: "★★★★☆ 4.5",
    desc: "When Gotham City is terrorized by the Joker, Batman faces his greatest psychological and moral challenge.",
    img: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    studio: "Pixar Animation Studios",
    title: "Coco",
    rating: "★★★★☆ 4.2",
    desc: "Miguel journeys into the Land of the Dead to uncover his family's hidden past.",
    img: "https://image.tmdb.org/t/p/original/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
  },
  {
    studio: "Marvel Entertainment",
    title: "The Amazing Spider-Man",
    rating: "★★★☆☆ 3.5",
    desc: "Peter Parker uncovers the truth about his father and embraces his destiny as Spider-Man.",
    img: "https://image.tmdb.org/t/p/original/jexoNYnPd6vVrmygwF6QZmWPFdu.jpg",
  },
  {
    studio: "Pixar Animation Studios",
    title: "WALL-E",
    rating: "★★★★☆ 4.2",
    desc: "A lonely robot discovers love and hope in a future Earth abandoned by humanity.",
    img: "https://image.tmdb.org/t/p/original/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg",
  },
];

const movies = [
  {
    title: "The Dark Knight",
    rating: "★★★★☆ 4.5",
    img: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    title: "Avengers: Infinity War",
    rating: "★★★★☆ 4.4",
    img: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  },
  {
    title: "RIO",
    rating: "★★★★☆ 4.1",
    img: "https://image.tmdb.org/t/p/w500/5zqSpBtfsXmO9jcKxR5y0b9Pn6.jpg",
  },
  {
    title: "Jurassic World",
    rating: "★★★★☆ 4.0",
    img: "https://image.tmdb.org/t/p/w500/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg",
  },
  {
    title: "Cars",
    rating: "★★★★☆ 4.1",
    img: "https://image.tmdb.org/t/p/w500/abW5AzHDaIK1n9C36VdAeOwORRA.jpg",
  },
  {
    title: "The Amazing Spider-Man",
    rating: "★★★★☆ 4.2",
    img: "https://image.tmdb.org/t/p/w500/jexoNYnPd6vVrmygwF6QZmWPFdu.jpg",
  },
  {
    title: "WALL-E",
    rating: "★★★★☆ 4.4",
    img: "https://image.tmdb.org/t/p/w500/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg",
  },
  {
    title: "The Incredibles",
    rating: "★★★★☆ 4.2",
    img: "https://image.tmdb.org/t/p/w500/2LqaLgk4Z226KkgPJuiOQ58wvrm.jpg",
  },
];

function Carousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const go = (n) => {
    setCurrent((n + slides.length) % slides.length);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="cs-carousel-wrap">
      <div
        className="cs-carousel-track"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s, i) => (
          <div key={i} className="cs-carousel-slide">
            <img
              src={s.img}
              className="cs-slide-bg"
              alt={s.title}
              loading="lazy"
            />

            <div className="cs-slide-content">
              <div className="cs-slide-studio">{s.studio}</div>

              <div className="cs-slide-title">{s.title}</div>

              <div className="cs-slide-rating">
                IMDb rating {s.rating}
              </div>

              <div className="cs-slide-desc">{s.desc}</div>

              <button className="cs-btn-purchase">
                Purchase
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="cs-carousel-ctrl prev"
        onClick={() => go(current - 1)}
      >
        ‹
      </button>

      <button
        className="cs-carousel-ctrl next"
        onClick={() => go(current + 1)}
      >
        ›
      </button>

      <div className="cs-carousel-dots">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`cs-dot${i === current ? " active" : ""}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}

function MovieCard({ title, rating, img }) {
  return (
    <div className="cs-movie-card">
      <img
        src={img}
        alt={title}
        className="cs-movie-image"
        loading="lazy"
      />

      <div className="cs-movie-card-overlay">
        <div className="cs-movie-card-title">
          {title}
        </div>

        <div className="cs-movie-card-rating">
          IMDb {rating}
        </div>

        <button className="cs-btn-sm">
          Purchase
        </button>
      </div>
    </div>
  );
}

export default function CineSphere() {
  return (
    <>
      <style>{styles}</style>

      {/* NAVBAR */}
      <nav className="cs-navbar">
        <a className="cs-brand" href="#">
          <span className="cs-brand-dot" />
          CINE SPHERE
        </a>

        <div className="cs-nav-links">
          {["Home", "Tickets", "Settings", "Log Out"].map((label) => (
            <button
              key={label}
              className="cs-nav-btn"
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <Carousel />

      {/* SECTION */}
      <div className="cs-section-header">
        <div className="cs-section-title">
          Recommendations
        </div>

        <div className="cs-section-line" />
      </div>

      {/* MOVIES */}
      <div className="cs-movie-grid">
        {movies.map((m, i) => (
          <MovieCard key={i} {...m} />
        ))}
      </div>

      <hr className="cs-divider" />

      {/* FOOTER */}
      <footer className="cs-footer">
        <div>
          <div className="cs-footer-brand">
            ● CINE SPHERE
          </div>

          <p className="cs-footer-desc">
            CineSphere is a film-themed website inspired
            by immersive cinema and dedicated to showcasing
            the art and culture of movies.
          </p>

          <p className="cs-footer-copy">
            © 2025 CineSphere. All rights reserved.
          </p>
        </div>

        <div>
          <div className="cs-footer-links">
            {["Home", "Tickets", "Settings"].map((l) => (
              <a
                key={l}
                className="cs-footer-link"
                href="#"
              >
                {l}
              </a>
            ))}
          </div>

          <div className="cs-footer-socials">
            {[
              ["f", "Facebook"],
              ["◎", "Instagram"],
              ["✕", "Twitter"],
            ].map(([icon, label]) => (
              <div
                key={label}
                className="cs-social-icon"
                title={label}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}