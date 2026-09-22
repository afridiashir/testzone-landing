// Contact details for Test Zone Diagnostic Centre, taken from the Contact
// Information page of the TZDC Company Profile 2025.
//
// Single source of truth — import from here rather than hard-coding a number
// or address into a component, so these never drift apart again.

export const contact = {
  organisation: "Test Zone Diagnostic Centre",
  shortName: "TZDC",
  tagline: "Precision in Health",

  headOffice: {
    label: "Head Office",
    address: "133-A, Faisal Town, Lahore, Pakistan",
  },

  phone: {
    display: "+92 42 35163747",
    href: "tel:+924235163747",
  },

  whatsapp: {
    display: "+92 336 4820296",
    /** Digits only, country code first, no "+" — the format wa.me expects. */
    number: "923364820296",
    href: "https://wa.me/923364820296",
  },

  email: {
    display: "testzonelab@gmail.com",
    href: "mailto:testzonelab@gmail.com",
  },

  website: {
    display: "www.testzone.com.pk",
    href: "https://www.testzone.com.pk",
  },
} as const;
