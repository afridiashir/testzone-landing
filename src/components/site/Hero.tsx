import Image from "next/image";
import { Button } from "@/components/ui/button";
// Agar aapne lab workers ki tasveer download kar li hai toh "hero-doctor.png" ko change karke us tasveer ka naam likh lein

export default function Hero() {
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
