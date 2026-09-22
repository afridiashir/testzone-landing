import { MapPin, Home, Droplet, FileText } from "lucide-react";

export default function QuickFeatures() {
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
