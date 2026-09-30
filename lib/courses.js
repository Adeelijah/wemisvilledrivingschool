export const courses = [
  {
    code: "WDS-101",
    slug: "basic",
    name: "Basic Driving Course",
    audience: "New drivers, first-time license applicants",
    duration: "4 weeks",
    price: "₦130,000",
    includes: [
      "Highway code & road signs theory",
      "Supervised practical driving sessions",
      "Vehicle control & parking practice",
      "FRSC test preparation",
    ],
  },
  {
    code: "WDS-201",
    slug: "intense",
    name: "Intense Driving Course",
    audience: "For learners who want focused training in a shorter timeframe",
    duration: "3 weeks",
    price: "₦105,000",
    includes: [
      "Focused practical driving sessions",
      "Defensive driving techniques",
      "Road signs & highway code review",
      "One-on-one instructor coaching",
    ],
    featured: true,
  },
  {
    code: "WDS-301",
    slug: "advanced",
    name: "Advanced Course",
    audience: "For experienced or returning drivers",
    duration: "2 weeks",
    price: "₦80,000",
    includes: [
      "Advanced vehicle control",
      "Defensive driving techniques",
      "Highway & road practice",
      "One-on-one coaching",
    ],
  },
];

export const corporateFleetTraining = {
  audience: "Companies & organisations",
  duration: "Custom, group-based",
  includes: [
    "Group / bulk staff enrolment",
    "On-site training option",
    "Fleet safety & defensive driving",
    "Certification for HR records",
  ],
};

export const otherServices = [
  {
    name: "Driver's Licence — New / Reissue",
    description: "Assistance with the process for a new or reissued driver's licence.",
  },
  {
    name: "International Driver's Licence",
    description: "Enquire about assistance with an international driver's licence.",
  },
  {
    name: "Learner's Sticker",
    description: "Enquire about learner's sticker processing.",
  },
  {
    name: "Plate Number Processing — Any State",
    description: "Enquire about plate number processing assistance for any state.",
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
