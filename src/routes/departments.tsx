import { createFileRoute } from "@tanstack/react-router";
import { Departments, PageHero, QuickFeatures } from "@/components/site/Sections";

const title = "Pathology & Diagnostic Departments — Meridian Diagnostics";
const description =
  "Hematology, clinical pathology, microbiology, histopathology and molecular diagnostics under one accredited roof.";

export const Route = createFileRoute("/departments")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: DepartmentsPage,
});

function DepartmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Departments"
        title="Specialised Diagnostic Units"
        text="Each department is led by a consultant and supported by fully automated, calibrated instrumentation."
      />
      <QuickFeatures />
      <Departments />
    </>
  );
}
