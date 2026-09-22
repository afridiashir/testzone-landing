import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { PageHero, QuickFeatures } from "@/components/site/Sections";
import { departments, supportDepartments } from "@/data/departments";

const title = "Pathology & Diagnostic Departments — Test Zone Diagnostic Centre";
const description =
  "Hematology, special clinical chemistry & immunology, molecular biology, microbiology and histopathology under one ISO 15189:2022 accredited roof.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default function DepartmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Departments"
        title="Specialised Diagnostic Units"
        text="Each department is led by a consultant and supported by fully automated, calibrated instrumentation, operating under ISO 15189:2022 accreditation."
      />
      <QuickFeatures />

      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#5bc55e]">
              Departments at TZDC
            </p>
            <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1a2b56] md:text-4xl">
              Clinical Departments
            </h2>
            <p className="text-base leading-relaxed text-slate-600">
              Test Zone Diagnostic Centre provides testing across multiple disciplines, from routine
              chemistry and hematology to molecular biology, microbiology and histopathology.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept) => (
              <Link
                key={dept.slug}
                href={`/departments/${dept.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-100 hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    width={1024}
                    height={768}
                    src={dept.image}
                    alt={dept.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {dept.biosafety && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1a2b56] backdrop-blur-sm">
                      <ShieldCheck className="size-3 text-[#5bc55e]" />
                      {dept.biosafety.replace("Biosafety Level ", "BSL-").replace(/\s*\(.*\)/, "")}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-lg font-bold text-[#1a2b56]">{dept.shortName}</h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">
                    {dept.summary}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#5bc55e] transition-all group-hover:gap-2">
                    View department <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="mb-3 text-2xl font-bold text-[#1a2b56] md:text-3xl">
              Operations & Support Departments
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Supporting every clinical result, from sample reception through to reporting and
              dispatch.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supportDepartments.map((dept) => (
              <div
                key={dept.name}
                className="rounded-lg border border-slate-200 p-6 transition hover:shadow-md"
              >
                <h4 className="font-semibold text-[#1a2b56]">{dept.name}</h4>
                {dept.biosafety && (
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-400">
                    {dept.biosafety}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
