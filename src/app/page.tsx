import type { Metadata } from "next";
import {
  Hero,
  QuickFeatures,
  AboutFeatures,
  Departments,
  Specialists,
  Accreditations,
} from "@/components/site/Sections";

const title = "Test Zone Diagnostic Centre — Accurate Lab Tests, Delivered on Time";
const description =
  "Accredited pathology and diagnostic laboratory offering 150+ tests, free home sampling and same-day online reports.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default function Index() {
  return (
    <>
      <Hero />
      <QuickFeatures />
      <AboutFeatures />
      <Departments />
      <Specialists />
      <Accreditations />
    </>
  );
}
