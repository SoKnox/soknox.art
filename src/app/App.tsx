import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight, ArrowLeft } from "lucide-react";
import { OptimizedImage } from "@/app/components/OptimizedImage";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import DriftingImg from "@/imports/Drifting.jpg";
import ArtistPortrait from "@/imports/IMG_2890-2-Edit.jpg";
import { SWCNew1, MidwayImg1, Validated1, Validated2, Validated3, Validated4, Validated5, Validated6, Validated7, SWC_107A6992, SWC_107A7023, SWC_107A7028, SWC_107A7046, SWC_107A7137, EditBefore, EditAfter, Taylor1c, Taylor2c, Aron1, Aron2, WhiteFlowerEyes, FlowerMelt, FlowerFacePart1, FlowerFacePart2, FlowerFaceEphemeral, FlowerFaceOvergrown, FlowerFaceBloom, FlowerFaceTethered, FlowerFaceUmbra, MidwayRoad1, MidwayRoad3, MidwayRoad4, MidwayRoad5, MidwayRoad6, MidwayRoad7, MidwayRoad8, MidwayRoad9, MidwayRoad11, Supreme1, Supreme1Hero, Supreme2, Supreme3, Supreme4, Supreme5, Supreme6, Supreme7, Scan1, Scan3, Scan7, Scan9, Scan11, Scan14, Scan16, Scan17, Scan18, Scan20, Nature1, Nature2, Nature3, Nature4, Nature5, Nature6, Nature7, Nature8, Nature9, Nature10, Nature11, Nature12, Nature13, Nature14, Nature15, Nature16, OvergrownSection1, OvergrownSection2, OvergrownSection3, OvergrownSection4, OvergrownSection5, OvergrownSection6, OvergrownSection7, OvergrownSection8, Documentary1a, Documentary1b, Documentary2a, Documentary2b, Documentary3a, Documentary3b, Documentary4, Documentary5, Documentary6, AboutPortrait } from "@/app/imageData";

type Page = "landing" | "art" | "client";

// ── Photo data ───────────────────────────────────────────────────────────────

const ART_SERIES = [
  {
    name: "Flower Face",
    category: "Double Exposure · Floral Portraiture",
    photos: [
      { src: FlowerFaceBloom, alt: "Flower Face — Bloom" },
      { src: FlowerFaceEphemeral, alt: "Flower Face — Ephemeral" },
      { src: WhiteFlowerEyes, alt: "Flower Face — white flower eyes" },
      { src: FlowerMelt, alt: "Flower Face — flower melt" },
      { src: FlowerFaceOvergrown, alt: "Flower Face — Overgrown" },
      { src: FlowerFacePart1, alt: "Flower Face — Part 1" },
      { src: FlowerFacePart2, alt: "Flower Face — Part 2" },
      { src: FlowerFaceTethered, alt: "Flower Face — Tethered" },
      { src: FlowerFaceUmbra, alt: "Flower Face — Umbra" },
    ],
  },
  {
    name: "Botanical Photograms + 35mm",
    category: "Alternative Process · Film Photography",
    photos: [
      { src: Scan1, alt: "Botanical Photograms + 35mm — Scan 1" },
      { src: Scan3, alt: "Botanical Photograms + 35mm — Scan 3" },
      { src: Scan7, alt: "Botanical Photograms + 35mm — Scan 7" },
      { src: Scan9, alt: "Botanical Photograms + 35mm — Scan 9" },
      { src: Scan11, alt: "Botanical Photograms + 35mm — Scan 11" },
      { src: Scan14, alt: "Botanical Photograms + 35mm — Scan 14" },
      { src: Scan16, alt: "Botanical Photograms + 35mm — Scan 16" },
      { src: Scan17, alt: "Botanical Photograms + 35mm — Scan 17" },
      { src: Scan18, alt: "Botanical Photograms + 35mm — Scan 18" },
      { src: Scan20, alt: "Botanical Photograms + 35mm — Scan 20" },
    ],
  },
  {
    name: "Nature",
    category: "Landscape · Botanical · Organic Forms",
    photos: [
      { src: Nature1, alt: "Nature — botanical study" },
      { src: Nature2, alt: "Nature — botanical study" },
      { src: Nature3, alt: "Nature — botanical study" },
      { src: Nature4, alt: "Nature — botanical study" },
      { src: Nature5, alt: "Nature — botanical study" },
      { src: Nature6, alt: "Nature — botanical study" },
      { src: Nature7, alt: "Nature — botanical study" },
      { src: Nature8, alt: "Nature — botanical study" },
      { src: Nature9, alt: "Nature — botanical study" },
      { src: Nature10, alt: "Nature — botanical study" },
      { src: Nature11, alt: "Nature — botanical study" },
      { src: Nature12, alt: "Nature — botanical study" },
      { src: Nature13, alt: "Nature — botanical study" },
      { src: Nature14, alt: "Nature — botanical study" },
      { src: Nature15, alt: "Nature — botanical study" },
      { src: Nature16, alt: "Nature — botanical study" },
    ],
  },
  {
    name: "Overgrown",
    category: "Botanical · Macro · Organic Forms",
    photos: [
      { src: OvergrownSection1, alt: "Overgrown — botanical study" },
      { src: OvergrownSection2, alt: "Overgrown — botanical study" },
      { src: OvergrownSection3, alt: "Overgrown — botanical study" },
      { src: OvergrownSection4, alt: "Overgrown — botanical study" },
      { src: OvergrownSection5, alt: "Overgrown — botanical study" },
      { src: OvergrownSection6, alt: "Overgrown — botanical study" },
      { src: OvergrownSection7, alt: "Overgrown — botanical study" },
      { src: OvergrownSection8, alt: "Overgrown — botanical study" },
    ],
  },
  {
    name: "Documentary",
    category: "Long-Form Visual Storytelling",
    photos: [
      { src: Documentary1a, alt: "Documentary — Documentary 1a" },
      { src: Documentary1b, alt: "Documentary — Documentary 1b" },
      { src: Documentary2a, alt: "Documentary — Documentary 2a" },
      { src: Documentary2b, alt: "Documentary — Documentary 2b" },
      { src: Documentary3a, alt: "Documentary — Documentary 3a" },
      { src: Documentary3b, alt: "Documentary — Documentary 3b" },
      { src: Documentary4, alt: "Documentary — Documentary 4" },
      { src: Documentary5, alt: "Documentary — Documentary 5" },
      { src: Documentary6, alt: "Documentary — Documentary 6" },
    ],
  },
];

const SUPREME_REELS = [
  {
    src: "/videos/Video1.mp4",
    bullets: ["60-minute interview format", "6 team members featured", "5 guiding questions"],
  },
];

const SUPREME_INSTAGRAM_EMBEDS = [
  {
    permalink: "https://www.instagram.com/reel/DaLFWe6NBIO/",
    bullets: ["Brand announcement video", "Custom graphic design", "Motion design built in Canva"],
  },
  {
    permalink: "https://www.instagram.com/reel/DaBbGTQN7kv/",
    bullets: ["Part of the \"YES\" campaign"],
  },
  {
    permalink: "https://www.instagram.com/reel/Da6Icf6JmWv/",
    bullets: ["Built around a trending social reel format"],
  },
];

const CLIENTS = [
  {
    name: "Supreme Lending",
    category: "Financial Services · Brand & Team Portraits",
    photos: [
      { src: Supreme1, alt: "Supreme Lending — brand photography" },
      { src: Supreme2, alt: "Supreme Lending — brand photography" },
      { src: Supreme3, alt: "Supreme Lending — brand photography" },
      { src: Supreme4, alt: "Supreme Lending — brand photography" },
      { src: Supreme5, alt: "Supreme Lending — brand photography" },
      { src: Supreme6, alt: "Supreme Lending — brand photography" },
      { src: Supreme7, alt: "Supreme Lending — brand photography" },
    ],
  },
  {
    name: "Southlake Wound Care & Hyperbarics",
    category: "Medical Practice · Clinical & Team Photography",
    photos: [
      { src: SWCNew1, alt: "Southlake Wound Care — clinical photography" },
      { src: SWC_107A6992, alt: "Southlake Wound Care — clinic environment" },
      { src: SWC_107A7023, alt: "Southlake Wound Care — patient care" },
      { src: SWC_107A7028, alt: "Southlake Wound Care — treatment room" },
      { src: SWC_107A7046, alt: "Southlake Wound Care — patient consultation" },
      { src: SWC_107A7137, alt: "Southlake Wound Care — team photography" },
    ],
  },
  {
    name: "Validated: Add Value. Build Trust. Be Seen.",
    category: "Book & Author Brand · Editorial Photography",
    photos: [
      { src: Validated1, alt: "Validated — author brand photography" },
      { src: Validated2, alt: "Validated book — editorial photography" },
      { src: Validated3, alt: "Validated — brand content photography" },
      { src: Validated4, alt: "Validated — author portrait" },
      { src: Validated5, alt: "Validated — brand session" },
      { src: Validated6, alt: "Validated — editorial detail" },
      { src: Validated7, alt: "Validated — brand identity photography" },
    ],
  },
  {
    name: "Midway Road Animal Clinic",
    category: "Veterinary Practice · Team & Environment",
    photos: [
      { src: MidwayImg1, alt: "Midway Road Animal Clinic — clinic photography" },
      { src: MidwayRoad1, alt: "Midway Road Animal Clinic — veterinarian with puppy" },
      { src: MidwayRoad3, alt: "Midway Road Animal Clinic — team member with dog" },
      { src: MidwayRoad4, alt: "Midway Road Animal Clinic — comforting a patient" },
      { src: MidwayRoad5, alt: "Midway Road Animal Clinic — ear exam" },
      { src: MidwayRoad6, alt: "Midway Road Animal Clinic — clinic photography" },
      { src: MidwayRoad7, alt: "Midway Road Animal Clinic — clinic photography" },
      { src: MidwayRoad8, alt: "Midway Road Animal Clinic — clinic photography" },
      { src: MidwayRoad9, alt: "Midway Road Animal Clinic — clinic photography" },
      { src: MidwayRoad11, alt: "Midway Road Animal Clinic — clinic photography" },
    ],
  },
];

const SERVICES_CLIENT = [
  {
    number: "01",
    title: "Commercial & Brand",
    desc: "Photography that makes brands look exactly how they want to feel — elevated, authentic, and impossible to scroll past.",
    details: ["Campaign photography", "Product & lifestyle", "Brand identity shoots"],
  },
  {
    number: "02",
    title: "Social Media Content",
    desc: "Batched content created for real feeds. Strategy-aware, platform-optimized, and always genuinely on-brand.",
    details: ["Monthly content packages", "Reels & story assets", "Content strategy consulting"],
  },
  {
    number: "03",
    title: "Events & Launches",
    desc: "Coverage for product launches, brand events, and activations. Fast delivery, no compromises on quality.",
    details: ["Product launches", "Brand activations", "Same-day delivery available"],
  },
];

// ── Shared components ────────────────────────────────────────────────────────

function Nav({
  onLogoClick,
  crossLabel,
  onCrossClick,
}: {
  onLogoClick: () => void;
  crossLabel: string;
  onCrossClick: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/55 border-b border-white/30 shadow-lg"
          : "backdrop-blur-sm bg-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <button
          onClick={onLogoClick}
          className="font-display text-lg font-medium tracking-tight text-foreground flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={14} className="text-muted-foreground" />
          Sophie Knox
        </button>
        <div className="hidden md:flex items-center gap-8">
          {["Work", "About", "Services"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-base text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link}
            </a>
          ))}
          <button
            onClick={onCrossClick}
            className="text-base text-muted-foreground border border-border px-4 py-2 rounded-full hover:border-foreground/40 hover:text-foreground transition-colors"
          >
            {crossLabel}
          </button>
        </div>
        <button
          className="md:hidden p-1 text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden backdrop-blur-xl bg-background/60 border-b border-white/30">
          <div className="px-6 py-8 flex flex-col gap-6">
            {["Work", "About", "Services"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-display text-xl text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <button
              onClick={() => { setMenuOpen(false); onCrossClick(); }}
              className="text-left text-base text-muted-foreground"
            >
              {crossLabel}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

function ArtWork() {
  return (
    <section id="work" className="pt-32 pb-24 lg:pt-40 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-16">
          <span className="text-base tracking-[0.12em] uppercase text-accent">Portfolio</span>
          <h1 className="font-display text-[clamp(2.8rem,6vw,5rem)] font-medium text-foreground mt-3 leading-[1.05]">
            Fine art work
          </h1>
        </div>

        <div className="space-y-24">
          {ART_SERIES.map((series) => (
            <div key={series.name}>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-8 pb-5 border-b border-border">
                <h2 className="font-display text-2xl lg:text-3xl font-medium text-foreground">{series.name}</h2>
                <span className="text-base tracking-[0.1em] uppercase text-muted-foreground flex-shrink-0">
                  {series.category}
                </span>
              </div>
              <ClientGallery photos={series.photos} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="rounded-2xl overflow-hidden bg-muted h-[480px] lg:h-[560px]">
          <OptimizedImage
            src={AboutPortrait}
            alt="Sophie Knox portrait"
            className="w-full h-full"
            sizes="(max-width: 1024px) 90vw, 45vw"
            objectPosition="center 15%"
            priority
          />
        </div>
        <div>
          <span className="font-display text-[clamp(1.75rem,3vw,2.75rem)] tracking-[0.02em] uppercase text-accent font-medium">About me</span>
          <p className="text-muted-foreground leading-relaxed mt-6 mb-8 text-[18px]">
            {"I'm Sophie Knox, a Dallas-based corporate and commercial photographer with a background in studio art, graphic design, and multimedia production. My experience includes creating photography and video for marketing, social media, internal communications, events, and branded content, including work with Supreme Lending's in-house creative team. I approach each project with a strong eye for composition, light, color, and detail, creating polished imagery that feels natural, intentional, and aligned with each brand's identity."}
          </p>
        </div>
      </div>
    </section>
  );
}

function ArtAbout() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Single portrait image — full uncropped, natural aspect ratio */}
        <div className="rounded-2xl overflow-hidden bg-black w-full">
          <img
            src={ArtistPortrait}
            alt="Knox — double exposure portrait with hydrangea petals"
            className="w-full h-auto block"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Artist statement */}
        <div className="lg:pt-8">
          <span className="text-base tracking-[0.12em] uppercase text-accent">Artist Statement</span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-medium text-foreground mt-4 mb-10 leading-none">
            Knox
          </h2>
          <div className="space-y-6 text-foreground/75 text-[19px] leading-[1.75]">
            <p>
              Knox is a mixed media artist exploring the layers between what is seen and what is hidden through experimental processes in photography and sculpture.
            </p>
            <p>
              She investigates how natural structures can be deconstructed and reassembled to create something simultaneously familiar and otherworldly.
            </p>
            <p>
              Blending lumen prints, digital layering, assemblage, and carving, Knox works across mediums to examine transformation and transparency.
            </p>
            <p>
              Her practice reveals the boundaries between the organic and the imagined—uncovering what lies beneath the surface.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services({ items }: { items: typeof SERVICES_CLIENT }) {
  return (
    <section id="services" className="py-24 lg:py-32 bg-foreground relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #d4785f 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-16">
          <span className="text-base tracking-[0.12em] uppercase text-accent">What I offer</span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-medium text-primary-foreground mt-4">
            How I can help
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((service) => (
            <div
              key={service.number}
              className="backdrop-blur-xl bg-white/[0.08] border border-white/15 rounded-3xl p-8 hover:bg-white/[0.15] hover:border-white/25 transition-all duration-300 shadow-lg shadow-black/20"
            >
              <div className="text-xs font-mono-label text-accent mb-8">{service.number}</div>
              <h3 className="font-display text-[1.4rem] font-medium text-primary-foreground mb-4 leading-snug">
                {service.title}
              </h3>
              <p className="text-primary-foreground/45 text-[16px] leading-relaxed mb-8">{service.desc}</p>
              <ul className="space-y-2.5">
                {service.details.map((d) => (
                  <li key={d} className="flex items-center gap-2.5 text-[15px] text-primary-foreground/55">
                    <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ onLogoClick }: { onLogoClick: () => void }) {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <button onClick={onLogoClick} className="font-display text-foreground font-medium hover:opacity-70 transition-opacity">
          Sophie Knox
        </button>
      </div>
    </footer>
  );
}

// ── Landing Screen ───────────────────────────────────────────────────────────

function LandingScreen({ onChoose }: { onChoose: (page: "art" | "client") => void }) {
  const [hovered, setHovered] = useState<"art" | "client" | null>(null);
  const [leaving, setLeaving] = useState(false);

  const choose = (page: "art" | "client") => {
    setLeaving(true);
    setTimeout(() => onChoose(page), 550);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col lg:flex-row"
      style={{ opacity: leaving ? 0 : 1, transition: "opacity 0.55s ease", pointerEvents: leaving ? "none" : "auto" }}
    >
      {/* Name badge */}
      <div className="absolute top-8 left-0 right-0 flex justify-center z-10 pointer-events-none">
        <span className="font-display text-base font-medium text-white/90 tracking-wide drop-shadow-md">
          Sophie Knox
        </span>
      </div>

      {/* Art side */}
      <button
        className="relative flex-1 flex items-end justify-start p-10 lg:p-14 overflow-hidden cursor-pointer border-0 text-left"
        style={{ minHeight: "50vh" }}
        onMouseEnter={() => setHovered("art")}
        onMouseLeave={() => setHovered(null)}
        onClick={() => choose("art")}
        aria-label="Enter Art Photography"
      >
        {/* Drifting.jpg as the art landing image */}
        <ImageWithFallback
          src={DriftingImg}
          alt="Fine art photography — Drifting"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: hovered === "art" ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.7s ease",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        <div
          className="absolute inset-0 bg-accent/15 pointer-events-none"
          style={{ opacity: hovered === "art" ? 1 : 0, transition: "opacity 0.4s ease" }}
        />
        <div className="relative z-10">
          <span className="text-base tracking-[0.12em] uppercase text-white/50 block mb-3">Fine Art</span>
          <h2 className="font-display text-4xl lg:text-6xl font-medium text-white leading-[1.05] mb-5">
            Art<br />Photography
          </h2>
          <div
            className="flex items-center gap-2 text-base text-white/70"
            style={{ transition: "gap 0.3s, color 0.3s", gap: hovered === "art" ? "0.75rem" : "0.5rem", color: hovered === "art" ? "white" : undefined }}
          >
            Enter <ArrowUpRight size={15} />
          </div>
        </div>
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-white/15" />
      </button>

      {/* Client side */}
      <button
        className="relative flex-1 flex items-end justify-start p-10 lg:p-14 overflow-hidden cursor-pointer border-0 text-left"
        style={{ minHeight: "50vh" }}
        onMouseEnter={() => setHovered("client")}
        onMouseLeave={() => setHovered(null)}
        onClick={() => choose("client")}
        aria-label="Enter Commercial Photography"
      >
        <ImageWithFallback
          src={Supreme1Hero}
          alt="Commercial photography — corporate portrait for Supreme Lending"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: hovered === "client" ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.7s ease",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        <div
          className="absolute inset-0 bg-accent/15 pointer-events-none"
          style={{ opacity: hovered === "client" ? 1 : 0, transition: "opacity 0.4s ease" }}
        />
        <div className="relative z-10">
          <span className="text-base tracking-[0.12em] uppercase text-white/50 block mb-3">Commercial</span>
          <h2 className="font-display text-4xl lg:text-6xl font-medium text-white leading-[1.05] mb-5">
            Client<br />Photography
          </h2>
          <div
            className="flex items-center gap-2 text-base text-white/70"
            style={{ transition: "gap 0.3s, color 0.3s", gap: hovered === "client" ? "0.75rem" : "0.5rem", color: hovered === "client" ? "white" : undefined }}
          >
            Enter <ArrowUpRight size={15} />
          </div>
        </div>
      </button>
    </div>
  );
}

// ── Art Photography Page ─────────────────────────────────────────────────────

function ArtPage({ onBack, onSwitch }: { onBack: () => void; onSwitch: () => void }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav onLogoClick={onBack} crossLabel="View Client Work →" onCrossClick={onSwitch} />

      <ArtWork />
      <ArtAbout />
      <Footer onLogoClick={onBack} />
    </div>
  );
}

// ── Client Photography Page ──────────────────────────────────────────────────

function InstagramEmbed({ permalink }: { permalink: string }) {
  useEffect(() => {
    const w = window as unknown as { instgrm?: { Embeds: { process: () => void } } };
    if (w.instgrm) {
      w.instgrm.Embeds.process();
      return;
    }
    if (document.querySelector('script[data-instagram-embed]')) return;
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.dataset.instagramEmbed = "true";
    document.body.appendChild(script);
  }, [permalink]);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-captioned
      data-instgrm-permalink={permalink}
      data-instgrm-version="14"
      style={{
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 16,
        margin: 0,
        maxWidth: 328,
        minWidth: 326,
        width: "100%",
        padding: "32px 20px",
        textAlign: "center",
      }}
    >
      <a
        href={permalink}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#3897f0", fontSize: 14, textDecoration: "none", fontFamily: "Arial, sans-serif" }}
      >
        View this post on Instagram
      </a>
    </blockquote>
  );
}

function ReelStrip({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <div className="relative group/strip">
      <div
        ref={scrollRef}
        className="flex flex-row gap-8 overflow-x-auto overflow-y-visible scrollbar-none scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {children}
      </div>

      {/* Arrows */}
      <button
        onClick={() => scroll(-1)}
        className="absolute left-0 top-[220px] -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-foreground text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-75 transition-opacity opacity-0 group-hover/strip:opacity-100"
        aria-label="Scroll left"
      >
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={() => scroll(1)}
        className="absolute right-0 top-[220px] -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-foreground text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-75 transition-opacity opacity-0 group-hover/strip:opacity-100"
        aria-label="Scroll right"
      >
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

function ClientGallery({ photos }: { photos: { src: string; alt: string }[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((l) => l !== null ? (l + 1) % photos.length : null);
      if (e.key === "ArrowLeft") setLightbox((l) => l !== null ? (l - 1 + photos.length) % photos.length : null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, photos.length]);

  return (
    <>
      <div className="relative group/strip">
        {/* Scroll strip */}
        <div
          ref={scrollRef}
          className="flex flex-row gap-2 overflow-x-auto scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {photos.map((photo, i) => (
            <img
              key={i}
              src={photo.src}
              alt={photo.alt}
              className="h-72 w-auto flex-shrink-0 cursor-zoom-in block"
              loading="lazy"
              decoding="async"
              onClick={() => setLightbox(i)}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-foreground text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-75 transition-opacity opacity-0 group-hover/strip:opacity-100"
          aria-label="Scroll left"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-foreground text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-75 transition-opacity opacity-0 group-hover/strip:opacity-100"
          aria-label="Scroll right"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {photos.length > 1 && (
            <>
              <button
                className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-foreground flex items-center justify-center shadow-xl hover:opacity-80 transition-opacity"
                onClick={(e) => { e.stopPropagation(); setLightbox((l) => l !== null ? (l - 1 + photos.length) % photos.length : null); }}
                aria-label="Previous"
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-foreground flex items-center justify-center shadow-xl hover:opacity-80 transition-opacity"
                onClick={(e) => { e.stopPropagation(); setLightbox((l) => l !== null ? (l + 1) % photos.length : null); }}
                aria-label="Next"
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}

          <img
            src={photos[lightbox].src}
            alt={photos[lightbox].alt}
            className="max-w-[88vw] max-h-[88vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

function ClientWork() {
  return (
    <section id="work" className="pt-32 pb-24 lg:pt-40 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-16">
          <span className="text-base tracking-[0.12em] uppercase text-accent">Portfolio</span>
          <h1 className="font-display text-[clamp(2.8rem,6vw,5rem)] font-medium text-foreground mt-3 leading-[1.05]">
            Client work
          </h1>
        </div>

        <div className="space-y-24">
          {/* Supreme Lending — Video */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-8 pb-5 border-b border-border">
              <h2 className="font-display text-2xl lg:text-3xl font-medium text-foreground">Supreme Lending Reels</h2>
              <span className="text-base tracking-[0.1em] uppercase text-muted-foreground flex-shrink-0">
                Financial Services · Brand Video
              </span>
            </div>
            <ReelStrip>
              {SUPREME_REELS.map((reel) => (
                <div key={reel.src} className="w-64 flex-shrink-0">
                  <div
                    className="relative w-64 rounded-2xl overflow-hidden bg-black"
                    style={{ aspectRatio: "9 / 16" }}
                  >
                    <video
                      src={reel.src}
                      controls
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                  <ul className="mt-4 space-y-2">
                    {reel.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[15px] text-muted-foreground">
                        <span className="mt-[6px] w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {SUPREME_INSTAGRAM_EMBEDS.map((post) => (
                <div key={post.permalink} className="flex-shrink-0" style={{ width: 328 }}>
                  <InstagramEmbed permalink={post.permalink} />
                  <ul className="mt-4 space-y-2">
                    {post.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[15px] text-muted-foreground">
                        <span className="mt-[6px] w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ReelStrip>
          </div>

          {CLIENTS.map((client) => (
            <div key={client.name}>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-8 pb-5 border-b border-border">
                <h2 className="font-display text-2xl lg:text-3xl font-medium text-foreground">{client.name}</h2>
                <span className="text-base tracking-[0.1em] uppercase text-muted-foreground flex-shrink-0">
                  {client.category}
                </span>
              </div>
              <ClientGallery photos={client.photos} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfter({ before, after, edits }: { before: string; after: string; edits: string[] }) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
    setPosition(pct);
  };

  return (
    <div className="mt-16 w-full">
      {/* Slider */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl cursor-col-resize select-none"
        onMouseMove={(e) => updatePosition(e.clientX)}
        onMouseDown={() => setDragging(true)}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
        onTouchMove={(e) => updatePosition(e.touches[0].clientX)}
      >
        {/* Before (base layer) */}
        <img src={before} alt="Before editing" className="w-full h-80 lg:h-[26rem] object-contain block" draggable={false} />

        {/* After (clipped overlay) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img src={after} alt="After editing" className="w-full h-80 lg:h-[26rem] object-contain block" draggable={false} />
        </div>

        {/* Divider */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)]"
          style={{ left: `${position}%` }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center gap-0.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M4 7H1m0 0 2-2M1 7l2 2M10 7h3m0 0-2-2m2 2-2 2" stroke="#1c1917" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 text-sm font-medium text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full tracking-wide">Before</div>
        <div className="absolute top-3 right-3 text-sm font-medium text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full tracking-wide">After</div>
      </div>

      {/* Edit notes */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2">
        {edits.map((edit) => (
          <div key={edit} className="flex items-start gap-2 text-[16px] text-foreground/70">
            <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
            {edit}
          </div>
        ))}
      </div>
    </div>
  );
}

function PhotoEditing() {
  const services = [
    {
      title: "Retouching & Skin Work",
      desc: "Natural, intentional retouching — removing distractions while keeping the subject real. No over-smoothed, plasticky results.",
    },
    {
      title: "Color Grading",
      desc: "Cohesive tonal treatment across a full shoot. Whether you need a warm editorial feel or a clean clinical look, color is matched to brand.",
    },
    {
      title: "Composite & Layering",
      desc: "Combining exposures, swapping backgrounds, and blending elements to build an image that couldn't exist in a single frame.",
    },
    {
      title: "Batch Editing",
      desc: "Consistent, fast edits across large sets — ideal for events, e-commerce, and social media content drops.",
    },
    {
      title: "File Prep & Delivery",
      desc: "Export optimized for web, print, or social. Includes ICC profile matching, resolution checks, and organized delivery folders.",
    },
    {
      title: "Culling & Selects",
      desc: "First-pass review of a full shoot to flag the strongest frames, so edit time and budget go only toward the images you'll actually use.",
    },
  ];

  return (
    <section id="editing" className="py-24 lg:py-32 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-16">
          <span className="text-base tracking-[0.12em] uppercase text-accent">Editing services</span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-medium text-foreground mt-3">
            Photo editing
          </h2>
          <p className="text-muted-foreground text-[18px] leading-relaxed mt-4 max-w-xl">
            Editing is offered as a standalone service. Send your raws, get back files that are finished, consistent, and ready to use.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <BeforeAfter
            before={EditAfter}
            after={EditBefore}
            edits={[
              "Skin color matching",
              "Frizzy hair removal",
              "Skin retouching",
              "Background cleanup",
              "Exposure & contrast balance",
              "Facial shadow removal",
            ]}
          />
          <BeforeAfter
            before={Taylor1c}
            after={Taylor2c}
            edits={[
              "Skin color matching",
              "Frizzy hair removal",
              "Skin retouching",
              "Background cleanup",
              "Exposure & contrast balance",
              "Facial shadow removal",
            ]}
          />
          <BeforeAfter
            before={Aron1}
            after={Aron2}
            edits={[
              "Skin color matching",
              "Frizzy hair removal",
              "Skin retouching",
              "Background cleanup",
              "Exposure & contrast balance",
              "Facial shadow removal",
            ]}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden mt-16">
          {services.map((s) => (
            <div key={s.title} className="bg-background p-8 hover:bg-muted/50 transition-colors duration-200">
              <h3 className="font-display text-lg font-medium text-foreground mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-[16px] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientPage({ onBack, onSwitch }: { onBack: () => void; onSwitch: () => void }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav onLogoClick={onBack} crossLabel="View Art Work →" onCrossClick={onSwitch} />
      <ClientWork />
      <PhotoEditing />
      <About />
      <Services items={SERVICES_CLIENT} />
      <Footer onLogoClick={onBack} />
    </div>
  );
}

// ── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("landing");

  useEffect(() => {
    if (page !== "landing") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [page]);

  if (page === "art") {
    return (
      <ArtPage
        onBack={() => setPage("landing")}
        onSwitch={() => setPage("client")}
      />
    );
  }

  if (page === "client") {
    return (
      <ClientPage
        onBack={() => setPage("landing")}
        onSwitch={() => setPage("art")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <LandingScreen onChoose={(p) => setPage(p)} />
    </div>
  );
}
