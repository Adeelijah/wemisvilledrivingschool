export const courses = [
  {
    code: "WDS-101",
    slug: "basic",
    name: "Basic Driving Course",
    audience: "New drivers, first-time license applicants",
    duration: "2 weeks",
    price: "₦80,000",
    includes: [
      "Advanced vehicle control",
      "Defensive driving techniques",
      "Highway & road practice",
      "One-on-one coaching",
      "Simulator training sessions",
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
      "Simulator training sessions",
    ],
    featured: true,
  },
  {
    code: "WDS-301",
    slug: "advanced",
    name: "Advanced Course",
    audience: "For experienced or returning drivers",
    duration: "4 weeks",
    price: "₦130,000",
    includes: [
      "Highway code & road signs theory",
      "Supervised practical driving sessions",
      "Vehicle control & parking practice",
      "FRSC test preparation",
      "Simulator training sessions",
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
    code: "WDS-401",
    name: "Licence & Document Assistance",
    description: "Enquiries and assistance with licence, permit, certificate, and vehicle document processes.",
    services: [
      "Driver's Licence — New / Reissue",
      "International Driver's Licence",
      "Learner's Sticker",
      "Plate Number Processing — Any State",
      "Tint Permit",
      "ECMR",
      "FRSC GCDE Certificate",
      "Vehicle Papers Renewal",
    ],
  },
  {
    code: "WDS-402",
    name: "Vehicle Services",
    description: "Assistance with vehicle purchase enquiries and vehicle inspection.",
    services: ["Vehicle Purchase", "Vehicle Inspection"],
  },
  {
    code: "WDS-403",
    name: "Travel Services",
    description: "Travel services for journeys within and between states.",
    services: ["Car Hire", "Inter-State Travels", "Intra-State Travels"],
  },
];

export const enrollSteps = [
  { n: "01", title: "Inquire", desc: "Send a message via the form, call, or WhatsApp — tell us the course you're interested in." },
  { n: "02", title: "Assess", desc: "We confirm your schedule, experience level, and recommend the right course." },
  { n: "03", title: "Train", desc: "Attend theory and practical sessions, including simulator training sessions." },
  { n: "04", title: "Test & License", desc: "Sit the FRSC test with our support and get road-ready with your license." },
];

export const testimonials = [
  { name: "Adaeze O.", text: "Patient instructors and the simulator sessions made me confident before I ever touched a real road." },
  { name: "Tunde A.", text: "Passed my FRSC test on the first attempt. The practical training here is thorough." },
  { name: "Grace I.", text: "Enrolled our staff for fleet training — professional, well organised, and on schedule." },
];
