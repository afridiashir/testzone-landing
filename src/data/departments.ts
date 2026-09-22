// Department content transcribed from the Test Zone Diagnostic Centre
// Company Profile 2025 (TZDC). Clinical claims, instrument names and quality
// programmes here are quoted from that profile — do not invent additions.

export type DeptItem = {
  /** Bolded lead-in, e.g. an instrument or test name. */
  label?: string;
  text?: string;
};

export type DeptBlock =
  | { type: "prose"; title?: string; paragraphs: string[] }
  | { type: "list"; title: string; items: DeptItem[]; note?: string };

export type Department = {
  slug: string;
  name: string;
  /** Short label for cards and nav. */
  shortName: string;
  /** One line used on the departments index and in meta descriptions. */
  summary: string;
  image: string;
  /** Biosafety level per the profile's Biosafety & Biosecurity page. */
  biosafety?: string;
  supervision?: string;
  blocks: DeptBlock[];
};

export const departments: Department[] = [
  {
    slug: "special-clinical-chemistry-immunology",
    name: "Special Clinical Chemistry & Immunology",
    shortName: "Special Chemistry & Immunology",
    summary:
      "Tumor markers, hormone profiling, autoimmune serology and infectious disease testing on fully automated chemiluminescence platforms.",
    image: "/assets/dept-clinical.jpg",
    biosafety: "Biosafety Level 1 (BSL-1)",
    supervision: "Highly qualified and experienced professionals",
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "The Special Clinical Chemistry & Immunology Department at Test Zone Diagnostic Centre provides an extensive range of advanced testing services to all associated centers. The section is equipped with fully automated, state-of-the-art instruments, and testing is carried out by highly qualified and experienced professionals.",
          "Our services include tumor marker analysis, hormone profiling, protein electrophoresis, heavy metal analysis, autoimmune serology, infectious disease testing (including Hepatitis B & C), TORCH profile, and antibody testing.",
        ],
      },
      {
        type: "list",
        title: "Instruments & Technologies",
        items: [
          { label: "Abbott Architect i1000sr & i2000sr" },
          { label: "Siemens Atellica IM" },
          { label: "Roche Cobas E411" },
          { label: "Maglumi X8" },
          { label: "Maglumi 800", text: "CLIA" },
          { label: "IFlash 1200", text: "Autoimmune Profile" },
          { label: "Chorus Trio by Diesse" },
          { label: "I-Chroma III" },
          { label: "HEALS ELISA Reader" },
        ],
        note: "For hormones, infectious profiles, and tumor markers — Chemiluminescence Methodology.",
      },
      {
        type: "prose",
        title: "Quality Assurance",
        paragraphs: [
          "To ensure accuracy and reliability, the department strictly adheres to internal quality controls and runs retained sample evaluations alongside daily operations. For external quality control, the RIQAS program is implemented regularly, verifying the precision and consistency of test results according to international standards.",
        ],
      },
    ],
  },
  {
    slug: "hematology",
    name: "Hematology Department",
    shortName: "Hematology",
    summary:
      "Routine and specialised hematology on five-part differential analysers, with HPLC electrophoresis, coagulation studies and bone marrow reporting.",
    image: "/assets/dept-hematology.jpg",
    biosafety: "Biosafety Level 1 (BSL-1)",
    supervision: "Qualified FCPS Hematologists",
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "The Hematology Department at Test Zone Diagnostic Centre performs a wide range of routine and specialized hematology tests using the latest technologies to ensure highly accurate results.",
        ],
      },
      {
        type: "list",
        title: "Services Offered",
        items: [
          {
            label: "Complete Blood Count (CBC)",
            text: "Conducted on five-part differential analyzers (Mindray BC-6200, Medonic M32, Sysmex XS-1000i).",
          },
          {
            label: "Hemoglobin Electrophoresis & HbA1c Testing",
            text: "Performed on HPLC-based systems (Tosoh G8, Japan) and Sebia Capillary 3 Octa for HbA, HbA2, HbF, and HbA1c analysis.",
          },
          {
            label: "Coagulation Studies",
            text: "Conducted using Helena-C2 semi-automated instruments.",
          },
          {
            label: "Peripheral Smear Examination",
            text: "Evaluation of both normal and abnormal smears carried out by an FCPS Hematologist.",
          },
          {
            label: "Bone Marrow Biopsy & Reporting",
            text: "Conducted by a Senior Consultant Hematologist in a safe and sterile environment, with reporting to international standards.",
          },
        ],
        note: "The department is supervised by qualified FCPS Hematologists and ensures high-quality reporting through internal and external quality control programs.",
      },
      {
        type: "list",
        title: "Quality Assurance",
        items: [
          {
            label: "Internal Controls",
            text: "Three-level controls for hematology analyzers are run daily.",
          },
          {
            label: "HbA1c & Hemoglobin Electrophoresis",
            text: "Internal quality controls are performed daily to verify accuracy.",
          },
          {
            label: "Retained Samples",
            text: "Regularly analyzed for CBC to ensure consistency and reliability.",
          },
          {
            label: "External Quality Control",
            text: "The department participates in the ESFEQA program on a monthly basis for international benchmarking.",
          },
        ],
      },
      {
        type: "list",
        title: "Instruments & Technologies",
        items: [
          {
            label: "Mindray BC-6200, Medonic M32, Sysmex XS-1000i",
            text: "Complete Blood Count (CBC)",
          },
          { label: "Helena-C2", text: "Coagulation Tests" },
          { label: "Sebia Capillary 3 Octa", text: "Hemoglobin & Protein Electrophoresis" },
          {
            label: "Tosoh G8 (Japan)",
            text: "Hb Electrophoresis and HbA1c Testing (HPLC Methodology)",
          },
        ],
      },
      {
        type: "list",
        title: "Test Parameters",
        items: [
          { label: "Complete Blood Count (CBC)" },
          { label: "Reticulocyte Count" },
          { label: "Erythrocyte Sedimentation Rate (ESR)" },
          { label: "Peripheral Smear Examination" },
          { label: "Hb Electrophoresis" },
          { label: "PT & APTT" },
          { label: "Blood Group (ABO & Rh)" },
        ],
      },
    ],
  },
  {
    slug: "molecular-biology",
    name: "Molecular Biology Department",
    shortName: "Molecular Biology",
    summary:
      "PCR-based diagnostics on QIAGEN (Germany) instrumentation endorsed by the CDC (USA), supervised by PhD and M. Phil Molecular Biologists.",
    image: "/assets/dept-molecular.jpg",
    biosafety: "Biosafety Level 2 (BSL-2)",
    supervision: "PhD and M. Phil Molecular Biologists",
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "Our Molecular Biology Department is one of the most advanced in Pakistan, equipped with cutting-edge instrumentation from QIAGEN, Germany, endorsed by the CDC (USA). It offers a broad range of PCR-based diagnostic services under the supervision of PhD and M. Phil Molecular Biologists.",
        ],
      },
      {
        type: "list",
        title: "Services Offered",
        items: [
          { label: "HCV-RNA PCR, HBV-DNA PCR" },
          { label: "MTB PCR", text: "Tuberculosis" },
          { label: "HCV Genotyping" },
          { label: "HDV-RNA PCR" },
          { label: "HLA-B27" },
          { label: "Quantiferon TB-Gold" },
          { label: "HIV-PCR, Dengue-PCR, HPV-PCR" },
        ],
        note: "Each PCR run is validated with positive and negative controls to ensure internationally benchmarked accuracy.",
      },
    ],
  },
  {
    slug: "microbiology",
    name: "Microbiology Department",
    shortName: "Microbiology",
    summary:
      "Diagnosis and management of infectious disease — culture and sensitivity, staining and antimicrobial susceptibility under microbiologist supervision.",
    image: "/assets/dept-microbiology.jpg",
    biosafety: "Biosafety Level 2 (BSL-2)",
    supervision: "Qualified and experienced microbiologists",
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "The Microbiology Department at Test Zone Diagnostic Centre specializes in the diagnosis and management of infectious diseases. The section is dedicated to identifying bacterial, viral, fungal, and parasitic pathogens, determining their antimicrobial susceptibility, and providing accurate reports to healthcare providers for effective clinical management.",
          "All routine and specialized microbiology tests are performed under the supervision of qualified and experienced microbiologists, ensuring accuracy, reliability, and patient safety.",
        ],
      },
      {
        type: "list",
        title: "Instruments & Technologies",
        items: [
          {
            label: "Biosafety Cabinet Class II, Type A2",
            text: "For safe handling of infectious materials",
          },
          { label: "Bactec-9050", text: "Automated Blood Culture System (FDA approved)" },
          {
            label: "Microbial Identification System",
            text: "For rapid and reliable organism detection",
          },
          { label: "Hirayama Autoclave", text: "Fully automated sterilization system" },
        ],
      },
      {
        type: "list",
        title: "Services Offered",
        items: [
          { label: "Blood Culture & Sensitivity" },
          { label: "Urine Culture & Sensitivity" },
          { label: "Pus Culture & Sensitivity" },
          { label: "CSF Culture & Sensitivity" },
          { label: "Body Fluids Examination" },
          { label: "ZN (Ziehl-Neelsen) Staining" },
          { label: "Gram Staining" },
        ],
      },
    ],
  },
  {
    slug: "histopathology-cytopathology",
    name: "Histopathology & Cytopathology Department",
    shortName: "Histopathology & Cytopathology",
    summary:
      "Microscopic examination of diseased tissue and cells, including IHC and ICC, reported by FCPS Histopathologists.",
    image: "/assets/dept-histopathology.jpg",
    supervision: "Highly qualified and experienced FCPS Histopathologists",
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "The Histopathology & Cytopathology Department at Test Zone Diagnostic Centre is dedicated to the microscopic examination of diseased tissues and cells, enabling accurate diagnosis and supporting effective patient management. All reporting is performed by highly qualified and experienced FCPS Histopathologists, ensuring precision and clinical relevance.",
          "The department performs a wide range of routine and specialized tests, including Immunohistochemistry (IHC) and Immunocytochemistry (ICC), offered at affordable prices without compromising quality.",
        ],
      },
      {
        type: "list",
        title: "Instruments & Technologies",
        items: [
          {
            label: "Automated Tissue Processing Unit",
            text: "Ensuring high-quality tissue preparation",
          },
          {
            label: "Auto-Stainer LEICA BOND-3 (USA)",
            text: "Capable of processing more than 150 antibodies for IHC",
          },
          {
            label: "Advanced Immunohistochemistry Systems",
            text: "For detection and evaluation of disease-specific proteins",
          },
        ],
      },
    ],
  },
  {
    slug: "quality-management",
    name: "Quality Management Department",
    shortName: "Quality Management",
    summary:
      "Internal and external quality control across all disciplines under ISO 15189:2022 accreditation and ISO 9001:2015 certification.",
    image: "/assets/accreditations.jpg",
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "At TZDC, quality is not an option, it is our foundation. Our Quality Assurance Department implements rigorous internal and external quality control measures across all disciplines. Proficiency testing is conducted regularly through international schemes such as ESFEQA, EQAS, RIQAS, and NEQAPP, alongside robust internal controls and comparative analyses.",
          "We operate under ISO 15189:2022 accreditation and ISO 9001:2015 certification, registered with the Punjab Healthcare Commission (PHC) and approved by PBTA. This ensures our patients and physicians receive results that are precise, reliable, and consistent.",
        ],
      },
      {
        type: "list",
        title: "Our Principles",
        items: [
          { label: "Deliver cost-effective and timely services." },
          { label: "Provide equal-quality diagnostics to all patients without discrimination." },
          { label: "Continuously train staff to enhance skills and performance." },
          { label: "Enforce compliance with quality manuals, policies, and SOPs." },
          {
            label:
              "Take corrective and preventive actions promptly following audits and monitoring.",
          },
        ],
      },
      {
        type: "list",
        title: "Accreditations & Compliance",
        items: [
          {
            label: "Punjab Healthcare Commission (PHC)",
            text: "Registered & licensed (R-16565), MSDS-compliant.",
          },
          { label: "Punjab Blood Transfusion Authority (PBTA)", text: "Approved (1429)." },
          { label: "ISO 9001:2015 Certified", text: "Quality Management System." },
          {
            label: "ISO 15189:2022 Accredited",
            text: "International medical laboratory standard.",
          },
          { label: "External Quality Assurance Programs", text: "ESFEQA, EQAS, RIQAS, NEQAPP." },
        ],
      },
      {
        type: "list",
        title: "Biosafety, Biosecurity & Waste Management",
        items: [
          {
            label: "Biosafety Level 1 (BSL-1)",
            text: "For Sample Management, Biochemistry, and Hematology.",
          },
          {
            label: "Biosafety Level 2 (BSL-2)",
            text: "For Microbiology and Molecular Biology labs handling infectious materials.",
          },
          { label: "Segregation at source", text: "Using colour-coded bins." },
          {
            label: "Safe handling, storage and disposal",
            text: "Of all laboratory waste, with special microbiology protocols for cultures and specimens.",
          },
          { label: "Partnership with AT-Waste Company", text: "For treatment and disposal." },
        ],
        note: "Aligned with WHO Biosafety Guidelines and Pakistan Biosafety Rules (2005), we maintain safe laboratory environments, protect staff and patients, and ensure data confidentiality.",
      },
    ],
  },
];

/**
 * Departments listed in the company profile that carry no published detail in it.
 * They appear on the index but have no page until TZDC supplies copy.
 */
export const supportDepartments: { name: string; biosafety?: string }[] = [
  { name: "Sample Management & Reception", biosafety: "Biosafety Level 1 (BSL-1)" },
  { name: "Routine Clinical Chemistry", biosafety: "Biosafety Level 1 (BSL-1)" },
  { name: "Finance & Marketing" },
  { name: "Central Store" },
  { name: "Branding & Sales" },
];

export function getDepartment(slug: string): Department | undefined {
  return departments.find((d) => d.slug === slug);
}
