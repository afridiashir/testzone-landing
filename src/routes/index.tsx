import { createFileRoute } from "@tanstack/react-router";
import { 
  Hero, 
  QuickFeatures, 
  AboutFeatures, 
  Departments, 
  Specialists, 
  Accreditations 
} from "@/components/site/Sections";

const title = "Meridian Diagnostics — Accurate Lab Tests, Delivered on Time";
const description = "Accredited pathology and diagnostic laboratory offering 150+ tests, free home sampling and same-day online reports.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
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