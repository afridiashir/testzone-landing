import type { Metadata } from "next";
import { PageHero, Specialists } from "@/components/site/Sections";

const title = "Certified Technologists & Specialists — Test Zone Diagnostic Centre";
const description =
  "Consultant pathologists, medical doctors, phlebotomists and laboratory technologists behind every Test Zone report.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default function SpecialistsPage() {
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
