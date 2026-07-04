// Placeholder course content. Replace with real durations/pricing/copy from
// the school, or wire this file up to the headless CMS query once content
// is migrated there (see README "Connecting a CMS").
export const courses = [
  {
    code: "WDS-101",
    slug: "basic",
    name: "Basic Driving Course",
    audience: "New drivers, first-time license applicants",
    duration: "4 weeks (flexible scheduling)",
    price: "Contact for pricing",
    includes: [
      "Highway code & road signs theory",
      "Supervised practical driving sessions",
      "Vehicle control & parking practice",
      "FRSC test preparation",
    ],
  },
  {
    code: "WDS-201",
    slug: "advanced-simulator",
    name: "Advanced / Simulator Course",
    audience: "Licensed drivers refining skills, nervous drivers",
    duration: "2–3 weeks",
    price: "Contact for pricing",
    includes: [
      "Driving-simulation technology sessions",
      "Defensive driving techniques",
      "Night & highway driving practice",
      "One-on-one coaching",
    ],
  },
  {
    code: "WDS-301",
    slug: "corporate-fleet",
    name: "Corporate / Fleet Training",
    audience: "Companies & organisations",
    duration: "Custom, group-based",
    price: "Contact for a quote",
    includes: [
      "Group / bulk staff enrolment",
      "On-site training option",
      "Fleet safety & defensive driving",
      "Certification for HR records",
    ],
  },
];

export const enrollSteps = [
  { n: "01", title: "Inquire", desc: "Send a message via the form, call, or WhatsApp — tell us the course you're interested in." },
  { n: "02", title: "Assess", desc: "We confirm your schedule, experience level, and recommend the right course." },
  { n: "03", title: "Train", desc: "Attend theory and practical sessions, including simulator time where applicable." },
  { n: "04", title: "Test & License", desc: "Sit the FRSC test with our support and get road-ready with your license." },
];

export const testimonials = [
  { name: "Adaeze O.", text: "Patient instructors and the simulator sessions made me confident before I ever touched a real road." },
  { name: "Tunde A.", text: "Passed my FRSC test on the first attempt. The practical training here is thorough." },
  { name: "Grace I.", text: "Enrolled our staff for fleet training — professional, well organised, and on schedule." },
];
