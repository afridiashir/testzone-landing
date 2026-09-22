import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { departments, getDepartment, type DeptBlock } from "@/data/departments";

export const Route = createFileRoute("/departments/$slug")({
  loader: ({ params }) => {
    const department = getDepartment(params.slug);
    if (!department) throw notFound();
    return department;
  },
  head: ({ params }) => {
    const department = getDepartment(params.slug);
    if (!department) return {};

    const title = `${department.name} — Test Zone Diagnostic Centre`;
    return {
      meta: [
        { title },
        { name: "description", content: department.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: department.summary },
      ],
    };
  },
  component: DepartmentDetailPage,
});

function BlockContent({ block }: { block: DeptBlock }) {
  if (block.type === "prose") {
    return (
      <div className="mb-10">
        {block.title && <h2 className="mb-4 text-2xl font-bold text-[#1a2b56]">{block.title}</h2>}
        {block.paragraphs.map((paragraph, i) => (
          <p key={i} className="mb-4 leading-relaxed text-slate-600 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="mb-10">
      <h2 className="mb-5 text-2xl font-bold text-[#1a2b56]">{block.title}</h2>
      <ul className="space-y-3">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-green-50 text-[#5bc55e]">
              <Check className="size-3" strokeWidth={3} />
            </span>
            <span className="leading-relaxed text-slate-600">
              {item.label && <strong className="font-semibold text-[#1a2b56]">{item.label}</strong>}
              {item.label && item.text && " — "}
              {item.text}
            </span>
          </li>
        ))}
      </ul>
      {block.note && (
        <p className="mt-5 border-l-2 border-[#5bc55e] bg-slate-50 py-3 pl-4 text-sm italic leading-relaxed text-slate-600">
          {block.note}
        </p>
      )}
    </div>
  );
}

function DepartmentDetailPage() {
  const department = Route.useLoaderData();
  const others = departments.filter((d) => d.slug !== department.slug);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#111c3a] via-[#1a2b56] to-[#121f40] pb-20 pt-16 text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

        <div className="container relative z-10 mx-auto px-4">
          <Link
            to="/departments"
            className="mb-6 inline-flex items-center gap-2 text-sm text-blue-200/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" /> All departments
          </Link>

          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              {department.name}
            </h1>
            <p className="text-lg font-light text-blue-100/80">{department.summary}</p>

            <div className="flex flex-wrap gap-3 pt-2">
              {department.biosafety && (
                <span className="inline-flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-green-400 backdrop-blur-sm">
                  <ShieldCheck className="size-3.5" /> {department.biosafety}
                </span>
              )}
              {department.supervision && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium text-blue-100/90 backdrop-blur-sm">
                  <UserCheck className="size-3.5" /> {department.supervision}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {department.blocks.map((block, i) => (
                <BlockContent key={i} block={block} />
              ))}
            </div>

            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-28">
                <img
                  src={department.image}
                  alt={department.name}
                  className="mb-6 w-full rounded-xl border border-slate-100 object-cover shadow-sm"
                />

                <div className="rounded-xl bg-[#1a2b56] p-6 text-white">
                  <h3 className="mb-2 text-lg font-bold">Need this test?</h3>
                  <p className="mb-5 text-sm leading-relaxed text-blue-200">
                    Book free home sampling or find your nearest collection centre among 83
                    nationwide.
                  </p>
                  <Button variant="cta" size="lg" className="w-full" asChild>
                    <Link to="/contact">Book Home Sampling</Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-2xl font-bold text-[#1a2b56]">Other Departments</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <Link
                key={other.slug}
                to="/departments/$slug"
                params={{ slug: other.slug }}
                className="group flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-5 transition hover:border-green-100 hover:shadow-md"
              >
                <span className="font-semibold text-[#1a2b56]">{other.shortName}</span>
                <ArrowRight className="size-4 shrink-0 text-[#5bc55e] transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
