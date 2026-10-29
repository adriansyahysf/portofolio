import { useEffect, useRef, useState } from "react";
import sentimentImg from "./assets/sentimentapp.png";
import laptimeImg from "./assets/Laptime.png";
import genshinImg from "./assets/Genshin.png";
import videoAddImg from "./assets/Videoadd.png";
import rentalImg from "./assets/rental.jpg";

// ---------- Edit your content here ----------
const PROFILE = {
  name: "Adriansyahysf",
  role: "Programmer",
  tagline: "Welcome to my Profile",
  email: "bimogamerz8856@gmail.com",
  github: "https://github.com/adriansyahysf",
  linkedin: "https://linkedin.com/in/adriansyah-busuf-bimantara",
  instagram : "https://www.instagram.com/adriansyahysf?mdxt=aWE4eXN4YjV5ZmJx",
  about: [
    "Hi there, i'am Adriansyah Yusuf Bimantara",
    "I'm a beginner developer who still learning and developing skills to improve my creation, i like to create modern, minimalist, responsive, and interactive website",
    "Outside of coding/programming I like to do some little projects with adobe tools creating a magazine, poster, or a video.",
  ],
  skills: ["React", "JavaScript", "Python", "MySQL", "Figma"],
  services : ["Web Development", "Data Analyst", "Multimedia", "Graphic Design"]

};

const HERO_WORDS = [
  "Hi !!! ",
  "My name is Adriansyah Yusuf Bimantara ",
  "Tech and Design Enthusiast :) ",
];

// Put your video in the project's public/ folder (e.g. public/hero.mp4)
const HERO_VIDEO = "/assets/HeroBackround.mp4";
const HERO_POSTER = "/hero-poster.jpg"; // optional still image shown while the video loads

const PROJECTS = [
  {
    title: "Sentiment App",
    image: sentimentImg,
    description: "an app that predict your game review sentiment",
    tags: ["Python", "BERT"],
    demo: "https://huggingface.co/spaces/Bimbim67/SteamReviewSentimen",
    code: "https://huggingface.co/Bimbim67/SteamReviewSentimen/tree/main",
  },
  {
    title: "Laptime Prediction",
    image: laptimeImg,
    description: "a project for laptime prediction based on each sector in formula 1",
    tags: ["LTSM", "Python"],
    code: "https://github.com/adriansyahysf/F1_QualificationPrediction",
  },
  {
    title: "Genshin Impact Magazine",
    image: genshinImg,
    description: "a magazine that tells about genshin 3.8 update news",
    tags: ["Indesign", "Photoshop"],
    demo: "https://drive.google.com/file/d/1UY7tApkla_vNL2-c2FIyY8hZtzieh435/view?usp=sharing",
  },
  {
    title: "Video Add",
    image: videoAddImg,
    description: "a short add project for a energy drink ",
    tags: ["After Effects", "Premiere Pro"],
    demo: "https://drive.google.com/file/d/1hWZsK9ObfnmrDub9mcu-vOdz18e8asWq/view?usp=sharing",
  },
  {
    title: "Rental Game",
    image: rentalImg,
    description: "a database about game renting, only for code",
    tags: ["MySQL", "XAMPP"],
    code: "https://github.com/adriansyahysf/rental_game",
  },
];

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Me" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact Me" },
];
// ---------------------------------------------

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

// Fades and slides content up the first time it scrolls into view
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        shown
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Thin bar under the navbar that fills as you scroll
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-0 h-0.5 bg-blue-600"
      style={{ width: `${progress}%` }}
    />
  );
}

function Navbar({ active }) {
  const [open, setOpen] = useState(false);

  const linkClass = (id) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 ${
      active === id
        ? "bg-blue-600 text-white"
        : "text-slate-700 hover:bg-slate-200"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-slate-50/90 backdrop-blur">
      <nav
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5"
        aria-label="Main"
      >
        <a href="#home" className="bg-gradient-to-r from-blue-600 via-violet-500 to-blue-600 bg-[length:200%_auto] bg-clip-text text-lg font-bold tracking-tight text-transparent animate-[gradient-shift_4s_linear_infinite] motion-reduce:animate-none">
          {PROFILE.name}
        </a>

        {/* Desktop menu */}
        <ul className="hidden gap-1 md:flex">
          {NAV.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={linkClass(item.id)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-slate-800 hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu (slides open and closed) */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div
          className={`overflow-hidden transition-[visibility] duration-300 ${
            open ? "visible" : "invisible"
          }`}
        >
          <ul className="border-t border-slate-200 bg-slate-50 px-5 py-3">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`block ${linkClass(item.id)}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}

function Typewriter({ words, typeSpeed = 30, deleteSpeed = 30, pause = 1200 }) {
  const [index, setIndex] = useState(0); // kata ke berapa
  const [count, setCount] = useState(0); // jumlah huruf yang tampil
  const [deleting, setDeleting] = useState(false);

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduce) return;
    const word = words[index];
    const typedAll = !deleting && count === word.length;
    const deletedAll = deleting && count === 0;

    let delay = deleting ? deleteSpeed : typeSpeed;
    if (typedAll) delay = pause; // berhenti sebentar setelah selesai mengetik
    if (deletedAll) delay = 300; // jeda singkat sebelum kata berikutnya

    const timer = setTimeout(() => {
      if (typedAll) setDeleting(true);
      else if (deletedAll) {
        setDeleting(false);
        setIndex((index + 1) % words.length);
      } else setCount(count + (deleting ? -1 : 1));
    }, delay);

    return () => clearTimeout(timer);
  }, [count, deleting, index, words, typeSpeed, deleteSpeed, pause, reduce]);

  const shown = reduce ? words[0] : words[index].slice(0, count);

  return (
    <span aria-label={words.join(", ")}>
      <span aria-hidden="true">{shown}</span>
      <span aria-hidden="true" className="ml-0.5 inline-block animate-pulse motion-reduce:animate-none">|</span>
    </span>
  );
}

function Home() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-slate-900 px-5 pt-16">
      {/* Background video (hidden for visitors who prefer reduced motion) */}
      <video
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        src={HERO_VIDEO}
        poster={HERO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      {/* Dark overlay keeps the text readable. Change 60 to make it lighter or darker */}
      <div aria-hidden="true" className="absolute inset-0 bg-slate-950/60" />
      <div className="relative mx-auto w-full max-w-5xl">
        <Reveal>
        <p className="mb-4 text-xl font-medium text-blue-300">
        <Typewriter words={HERO_WORDS} />
        </p>
        </Reveal>
        <Reveal delay={120}>
        <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-7xl">
          {PROFILE.tagline}
        </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-6 max-w-xl text-lg text-slate-200">
            I'm a {PROFILE.role.toLowerCase()} who still learning and expoloring about web development especially front-end development. i like inovative and interactive website.
          </p>
        </Reveal>
        <Reveal delay={360} className="mt-10 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 motion-reduce:hover:translate-y-0 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            View my projects
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-white/50 px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 motion-reduce:hover:translate-y-0 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Contact me
          </a>
        </Reveal>
        <Reveal delay={150}>
          <h3 className="mb-4 text-xl font-semibold text-slate-900"></h3>
          <ul className="flex flex-wrap gap-2">
            {PROFILE.skills.map((s) => (
              <li
                key={s}
                className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-100 hover:text-blue-700"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="scroll-mt-16 bg-white px-5 py-24">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-900">About me</h2>
          <div className="space-y-4 text-lg leading-relaxed text-slate-600">
            {PROFILE.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={150}>
          <h3 className="mb-4 text-3xl font-bold text-slate-900">What I do</h3>
          <ul className="flex flex-wrap gap-2">
            {PROFILE.services.map((s) => (
              <li
                key={s}
                className="rounded-md bg-slate-800 px-3 py-1.5 text-xl font-medium text-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-100 hover:text-blue-700"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="scroll-mt-16 px-5 py-24 bg-slate-900">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="mb-10 text-3xl font-bold tracking-tight text-blue-100">Projects</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 120} className="h-full">
            <article
              className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-600/10 motion-reduce:hover:translate-y-0"
            >
              <h3 className="text-xl font-semibold text-slate-900">{p.title}</h3>

              {p.image && (
                <img
                  src={p.image}
                  alt={`Screenshot of ${p.title}`}
                  loading="lazy"
                  className="mt-4 aspect-video w-full rounded-lg border border-slate-200 object-cover object-top"
                />
              )}

              <p className="mt-3 flex-1 text-slate-600">{p.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li key={t} className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex gap-4 text-sm font-semibold">
                <a href={p.demo} className="text-blue-600 hover:underline">Live demo</a>
                <a href={p.code} className="text-slate-700 hover:underline">Source code</a>
              </div>
            </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [data, setData] = useState({ name: "", email: "", message: "" });

  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  // Opens the visitor's email app. Swap this for EmailJS, Formspree, or your own API later.
  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${data.name}`);
    const body = encodeURIComponent(`${data.message}\n\nFrom: ${data.name} (${data.email})`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 transition-all duration-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30";

  return (
    <section id="contact" className="scroll-mt-16 bg-white px-5 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-slate-900">Contact me</h2>
        <p className="mb-10 max-w-lg text-slate-600">
          Have a project or an opportunity in mind? Send a message and I'll reply as soon as I can.
        </p>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr]">
          <Reveal delay={100}>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">Name</label>
              <input id="name" name="name" required value={data.name} onChange={onChange} className={field} placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">Email</label>
              <input id="email" name="email" type="email" required value={data.email} onChange={onChange} className={field} placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">Message</label>
              <textarea id="message" name="message" rows={5} required value={data.message} onChange={onChange} className={field} placeholder="How can I help?" />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 motion-reduce:hover:translate-y-0 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Send message
            </button>
          </form>
          </Reveal>

          <Reveal delay={200}>
            
          <ul className="space-y-4 text-slate-700">
            <li>
              <span className="block text-sm text-slate-500">Email</span>
              <a href={`mailto:${PROFILE.email}`} className="font-medium text-blue-600 hover:underline">{PROFILE.email}</a>
            </li>
            <li>
              <span className="block text-sm text-slate-500">GitHub</span>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:underline">github.com/adriansyahysf</a>
            </li>
            <li>
              <span className="block text-sm text-slate-500">LinkedIn</span>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:underline">linkedin.com/in/adriansyah-yusuf-bimantara</a>
            </li>
            <li>
              <span className="block text-sm text-slate-500">Instagram</span>
              <a href={PROFILE.instagram} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:underline">Instagram.com/adriansyahysf</a>
            </li>
          </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const active = useActiveSection(NAV.map((n) => n.id));

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => (document.documentElement.style.scrollBehavior = "");
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <Navbar active={active} />
      <main>
        <Home />
        <About />
        <Projects />
        <Contact />
      </main>
      <footer className="border-t border-slate-900 py-8 text-center text-sm text-slate-900">
        © {new Date().getFullYear()} {PROFILE.name}. All Rights Reserved.
      </footer>
    </div>
  );
}