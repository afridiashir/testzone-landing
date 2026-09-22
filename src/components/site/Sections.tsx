import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Home, Droplet, FileText, Target, Zap, Microscope } from "lucide-react";
import { departments } from "@/data/departments";

// Images Import from your assets

// 1. HERO SECTION
export function Hero() {
  return (
    <section className="bg-gradient-to-br from-[#111c3a] via-[#1a2b56] to-[#121f40] pt-16 pb-36 text-white relative overflow-hidden">
      {/* Subtle background overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
        {/* Left Side: Content */}
        <div className="md:w-3/5 space-y-6">
          <div className="inline-flex items-center gap-2 border border-green-500/40 bg-green-500/10 rounded-full px-4 py-1.5 mb-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <p className="text-xs font-bold text-green-400 tracking-widest uppercase">
              ISO 15189:2022 - Accredited by PNAC
            </p>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Diagnostic Accuracy, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3bdf86] to-[#28a745]">
              Delivered on Time
            </span>
          </h1>

          <p className="text-blue-100/80 text-lg max-w-xl font-light">
            Quality-assured pathology across 100+ cities, with results you and your physician can
            act on with confidence.
          </p>

          {/* Buttons Area */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button className="bg-[#5bc55e] hover:bg-[#4caf50] text-white shadow-[0_0_20px_rgba(91,197,94,0.4)] transition-all duration-300 hover:scale-105 px-8 py-6 text-sm font-semibold rounded-md">
              Book Home Sampling
            </Button>
            <Button className="bg-transparent border-2 border-white/50 text-white hover:bg-white hover:text-[#1a2b56] hover:border-white shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-105 px-8 py-6 text-sm font-semibold rounded-md backdrop-blur-sm">
              View Reports Online
            </Button>
          </div>

          {/* Stats with hover effect */}
          <div className="flex flex-wrap items-center gap-8 pt-10 mt-6 border-t border-blue-800/50">
            {[
              { num: "150+", label: "Branches" },
              { num: "100+", label: "Cities" },
              { num: "350K+", label: "Patients / Year" },
              { num: "24/7", label: "Availability" },
            ].map((stat, i) => (
              <div key={i} className="group cursor-default flex items-center gap-8">
                <div>
                  <h4 className="text-3xl font-bold group-hover:text-green-400 transition-colors">
                    {stat.num}
                  </h4>
                  <p className="text-[10px] text-blue-200/60 uppercase tracking-widest mt-1 group-hover:text-blue-200 transition-colors">
                    {stat.label}
                  </p>
                </div>
                {/* Vertical Divider line, except for the last item */}
                {i !== 3 && <div className="h-10 w-px bg-blue-800/50"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Image with Glow */}
        <div className="md:w-2/5 mt-16 md:mt-0 relative flex justify-end">
          {/* Blue glow effect behind the image */}
          <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>

          <Image
            width={1024}
            height={1200}
            src="/assets/hero-doctor.png"
            alt="Medical Professional"
            className="max-w-full h-auto object-cover rounded-2xl shadow-2xl z-10 border border-white/10 relative"
          />
        </div>
      </div>
    </section>
  );
}

// 2. QUICK FEATURES
export function QuickFeatures() {
  const features = [
    {
      icon: MapPin,
      title: "Find a Lab",
      desc: "Locate your nearest collection center among 83 nationwide.",
      link: "Find Centers →",
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
    {
      icon: Home,
      title: "Free Home Sampling",
      desc: "Book doorstep collection - free, nationwide, at your convenience.",
      link: "Book Now →",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: Droplet,
      title: "Blood Bank Services",
      desc: "PBTA-approved blood transfusion services (Reg. 1429).",
      link: "Learn More →",
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      icon: FileText,
      title: "Lab Test Directory",
      desc: "Browse our full menu of routine and specialized diagnostic tests.",
      link: "View Directory →",
      color: "text-indigo-500",
      bg: "bg-indigo-50",
    },
  ];

  return (
    <section className="container mx-auto px-4 -mt-24 relative z-20 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="group bg-white p-8 rounded-2xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] hover:-translate-y-2 transition-all duration-300 ease-in-out flex flex-col items-center text-center h-full border border-slate-50 hover:border-green-100"
          >
            <div
              className={`mb-6 p-4 rounded-2xl ${feature.bg} ${feature.color} group-hover:scale-110 transition-transform duration-300`}
            >
              <feature.icon size={32} strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-[#1a2b56] text-xl mb-3">{feature.title}</h3>
            <p className="text-sm text-slate-500 mb-8 flex-grow leading-relaxed px-2">
              {feature.desc}
            </p>
            <a
              href="#"
              className="mt-auto inline-flex items-center gap-1 text-[#5bc55e] text-sm font-semibold hover:text-green-700 transition-colors group-hover:gap-2"
            >
              {feature.link.replace("→", "")} <span className="text-lg leading-none">&rarr;</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

// 3. ABOUT FEATURES
export function AboutFeatures() {
  const cards = [
    {
      icon: Target,
      iconColor: "text-red-500",
      title: "Accredited Accuracy",
      desc: "ISO 15189:2022 accredited by PNAC — the first laboratory in Pakistan to achieve this standard.",
    },
    {
      icon: Zap,
      iconColor: "text-amber-500",
      title: "Rapid Turnaround",
      desc: "12 STAT laboratories nationwide deliver urgent results without compromising on quality.",
    },
    {
      icon: Microscope,
      iconColor: "text-slate-700",
      title: "Expert Verification",
      desc: "Every report is reviewed and signed off by qualified consultant pathologists.",
    },
    {
      icon: Home,
      iconColor: "text-emerald-600",
      title: "Free Home Sampling",
      desc: "Doorstep sample collection at no extra cost, available right across the country.",
    },
  ];

  const stats = [
    { num: "12", label: "STAT LABORATORIES" },
    { num: "250+", label: "PROFESSIONALS" },
    { num: "700K+", label: "TESTS / YEAR" },
    { num: "350K+", label: "PATIENTS / YEAR" },
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        {/* Heading Section (Size Reduced) */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-bold text-[#5bc55e] tracking-[0.2em] uppercase mb-3">
            Precision in Health Since 2012
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b56] mb-4 leading-tight">
            A Diagnostic Partner Built on Accuracy & Care
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Test Zone Diagnostic Centre delivers quality-assured pathology across 100+ cities. Our
            fully automated laboratories, staffed by 250+ trained professionals, combine
            international-standard technology with fast, dependable reporting.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-[#f8fafc] p-6 rounded-xl border border-slate-100 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out group"
            >
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm mb-5 border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                <card.icon className={card.iconColor} size={20} strokeWidth={2} />
              </div>
              <h3 className="font-bold text-[#1a2b56] text-lg mb-2">{card.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Stats (Size Reduced) */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 border-t border-slate-100 pt-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center flex gap-8 md:gap-16 items-center">
              <div>
                <h4 className="text-3xl md:text-4xl font-extrabold text-[#1a2b56] mb-1">
                  {stat.num}
                </h4>
                <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                  {stat.label}
                </p>
              </div>
              {/* Divider */}
              {i !== stats.length - 1 && (
                <div className="hidden md:block h-12 w-px bg-slate-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 4. DEPARTMENTS
export function Departments() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Pathology & Diagnostic Departments</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {departments.map((dept) => (
            <Link
              key={dept.slug}
              href={`/departments/${dept.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:border-green-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <Image
                width={1024}
                height={768}
                src={dept.image}
                alt={dept.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-slate-900 mb-2">{dept.shortName}</h3>
                <p className="text-sm text-slate-600 mb-4 flex-1">{dept.summary}</p>
                <span className="mt-auto text-[#5bc55e] text-sm font-medium group-hover:underline">
                  Read more &rarr;
                </span>
              </div>
            </Link>
          ))}

          <div className="bg-[#1a2b56] rounded-xl p-8 flex flex-col items-center justify-center text-center text-white">
            <h3 className="text-2xl font-bold mb-4">All Departments</h3>
            <p className="text-blue-200 mb-6">
              Browse every clinical and support department at Test Zone Diagnostic Centre.
            </p>
            <Button
              variant="outline"
              className="border-white bg-transparent hover:bg-white hover:text-[#1a2b56]"
              asChild
            >
              <Link href="/departments">View Departments</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// 5. SPECIALISTS
export function Specialists() {
  const roles = [
    "Consultant Pathologists & Hematologists",
    "Medical Doctors",
    "Consultant Microbiologists",
    "Certified Laboratory Technologists",
    "Skilled Phlebotomists",
    "Support & Reception Team",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">
            Certified Technologists & Specialists
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map((role, i) => (
            <div
              key={i}
              className="p-6 border border-slate-200 rounded-lg hover:shadow-md transition cursor-default"
            >
              <h4 className="font-semibold text-[#1a2b56]">{role}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 6. ACCREDITATIONS
export function Accreditations() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <div className="md:w-1/2">
            <Image
              width={1024}
              height={912}
              src="/assets/accreditations.jpg"
              alt="Accreditation Certificates"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Accredited, Audited & Trusted
            </h2>
            <p className="text-slate-600 mb-6">
              Our facilities are fully certified by national health boards and international quality
              control organizations, ensuring 100% precision in every test.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm">
                ISO 9001:2015
              </span>
              <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm">
                Punjab Healthcare Commission
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// 7. PAGE HERO (inner pages)
export function PageHero({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="bg-gradient-to-br from-[#111c3a] via-[#1a2b56] to-[#121f40] pt-16 pb-36 text-white relative overflow-hidden">
      {/* Subtle background overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 border border-green-500/40 bg-green-500/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <p className="text-xs font-bold text-green-400 tracking-widest uppercase">{eyebrow}</p>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            {title}
          </h1>

          <p className="text-blue-100/80 text-lg font-light">{text}</p>
        </div>
      </div>
    </section>
  );
}
