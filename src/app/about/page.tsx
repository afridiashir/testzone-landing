import type { Metadata } from "next";
import { AboutFeatures, Accreditations, PageHero } from "@/components/site/Sections";

const title = "About Test Zone Diagnostic Centre — Accuracy & Care";
const description =
  "Two decades of accredited pathology: quality systems, rapid turnaround and patient-first diagnostic care.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Built on Accuracy & Care"
        text="Test Zone Diagnostic Centre supports clinicians and families with evidence-backed testing, transparent quality control and a patient experience designed around trust."
      />
      <AboutFeatures />
      <Accreditations />
    </>
  );
}
