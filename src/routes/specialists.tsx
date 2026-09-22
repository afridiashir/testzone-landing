import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Specialists } from "@/components/site/Sections";

const title = "Certified Technologists & Specialists — Test Zone Diagnostic Centre";
const description =
  "Consultant pathologists, medical doctors, phlebotomists and laboratory technologists behind every Test Zone report.";

export const Route = createFileRoute("/specialists")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SpecialistsPage,
});

function SpecialistsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our people"
        title="Certified Technologists & Specialists"
        text="Every sample passes through the hands of qualified, continuously trained professionals."
      />
      <Specialists />
    </>
  );
}
