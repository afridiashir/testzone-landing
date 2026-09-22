import { createFileRoute } from "@tanstack/react-router";
import { AboutFeatures, Accreditations, PageHero } from "@/components/site/Sections";

const title = "About Meridian Diagnostics — Accuracy & Care";
const description =
  "Two decades of accredited pathology: quality systems, rapid turnaround and patient-first diagnostic care.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Built on Accuracy & Care"
        text="Meridian Diagnostics supports clinicians and families with evidence-backed testing, transparent quality control and a patient experience designed around trust."
      />
      <AboutFeatures />
      <Accreditations />
    </>
  );
}
