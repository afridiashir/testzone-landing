import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, Mail, MapPin, MessageCircle, Phone, Syringe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Sections";
import { vaccines, vaccinesByCategory } from "@/data/vaccines";
import { contact } from "@/data/contact";

const title = "Vaccination Services — Test Zone Diagnostic Centre";
const description =
  "Vaccination and immunization services at Test Zone Diagnostic Centre. Contact our Lahore head office to confirm availability and schedule an appointment.";

export const Route = createFileRoute("/vaccination")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: VaccinationPage,
});

const contactMethods = [
  { icon: Phone, label: "Phone", ...contact.phone },
  { icon: MessageCircle, label: "WhatsApp", ...contact.whatsapp },
  { icon: Mail, label: "Email", ...contact.email },
];

function VaccinationPage() {
  const categories = vaccinesByCategory();

  return (
    <>
      <PageHero
        eyebrow="Vaccination"
        title="Vaccination Services"
        text="Immunization delivered under the same quality systems as our diagnostic testing, at our Lahore head office and across our nationwide branch network."
      />

      {vaccines.length > 0 ? (
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            {categories.map(({ category, items }) => (
              <div key={category} className="mb-14 last:mb-0">
                <h2 className="mb-6 text-2xl font-bold text-[#1a2b56]">{category} Vaccines</h2>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((vaccine) => (
                    <div
                      key={vaccine.name}
                      className="rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-green-100 hover:shadow-lg"
                    >
                      <div className="mb-4 grid size-11 place-items-center rounded-xl bg-green-50 text-[#5bc55e]">
                        <Syringe size={20} strokeWidth={1.75} />
                      </div>
                      <h3 className="font-bold text-[#1a2b56]">{vaccine.name}</h3>
                      {vaccine.alsoKnownAs && (
                        <p className="mt-0.5 text-xs text-slate-400">{vaccine.alsoKnownAs}</p>
                      )}

                      <dl className="mt-4 space-y-2 text-sm">
                        {vaccine.forWhom && (
                          <div>
                            <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">
                              For
                            </dt>
                            <dd className="text-slate-600">{vaccine.forWhom}</dd>
                          </div>
                        )}
                        {vaccine.schedule && (
                          <div>
                            <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">
                              Schedule
                            </dt>
                            <dd className="text-slate-600">{vaccine.schedule}</dd>
                          </div>
                        )}
                      </dl>

                      {vaccine.notes && (
                        <p className="mt-4 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-500">
                          {vaccine.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="bg-white py-20">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <div className="mx-auto mb-6 grid size-14 place-items-center rounded-2xl bg-green-50 text-[#5bc55e]">
              <CalendarCheck size={26} strokeWidth={1.75} />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-[#1a2b56]">Enquire About Vaccination</h2>
            <p className="mb-10 leading-relaxed text-slate-600">
              Our full vaccination schedule and pricing are being finalised. To confirm which
              vaccines are currently available, or to book an appointment, contact our head office
              directly — our team will confirm availability and arrange a time.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  className="group rounded-xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-green-100 hover:shadow-lg"
                >
                  <div className="mx-auto mb-4 grid size-11 place-items-center rounded-xl bg-slate-50 text-[#1a2b56] transition group-hover:bg-green-50 group-hover:text-[#5bc55e]">
                    <method.icon size={19} strokeWidth={1.75} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {method.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#1a2b56]">{method.display}</p>
                </a>
              ))}
            </div>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-50 px-5 py-2.5 text-sm text-slate-500">
              <MapPin className="size-4 text-[#5bc55e]" />
              {contact.headOffice.address}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-2xl bg-[#1a2b56] p-10 text-center text-white md:flex-row md:text-left">
            <div className="flex-1">
              <h2 className="mb-2 text-2xl font-bold">Need a test alongside your vaccination?</h2>
              <p className="text-blue-200">
                Book free home sampling or browse our diagnostic departments — over 150 branches
                across 100+ cities.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap justify-center gap-3">
              <Button variant="cta" size="lg" asChild>
                <Link to="/contact">Book Appointment</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white bg-transparent text-white hover:bg-white hover:text-[#1a2b56]"
                asChild
              >
                <Link to="/departments">View Departments</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
