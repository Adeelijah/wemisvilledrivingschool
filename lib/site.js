// Central place for details that change rarely but appear across many pages.
// Update phone/WhatsApp/address here once real details are confirmed with the client.
export const site = {
  name: "Wemisville Driving School",
  shortName: "Wemisville",
  tagline: "FRSC Accredited Driving School in Akure",
  phoneDisplay: "0810 843 1863",
  phoneHref: "tel:+2348108431863",
  whatsappNumber: "2348108431863", // country code + number, no leading zero, no plus
  email: "info@wemisvilledrivingschool.com", // placeholder — confirm with client
  address: "Opposite OFN Oil and Gas Station, First Gate, Oba-Ile Housing Estate, Akure 100001, Ondo State",
  mapsQuery: "Wemisville Driving School Oba-Ile Akure",
  hours: "Open 24 hours (office hours vary — confirm with staff)",
  rating: 4.9,
  reviewCount: 402,
};

export function whatsappLink(message) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
