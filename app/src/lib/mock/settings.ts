import type { AgencySettings } from "@/types/settings";

export const mockSettings: AgencySettings = {
  agencyName: "Diar Dzair",
  address: "12 Rue Hassiba Ben Bouali, Alger Centre, Algerie",
  email: "contact@diardzair.dz",
  officeHours: "Dimanche - Jeudi: 08:30 - 17:30",
  phones: ["+213 661 23 45 67", "+213 770 34 56 78", "+213 555 45 67 89"],
  featuredListingIds: ["1", "2"],
  agents: [
    {
      id: "agent-1",
      name: "Nour El Houda Amrani",
      specialisation: "Residentiel Alger",
      phone: "+213 661 23 45 67",
    },
    {
      id: "agent-2",
      name: "Yacine Boudiaf",
      specialisation: "Commercial & Bureaux",
      phone: "+213 770 34 56 78",
    },
    {
      id: "agent-3",
      name: "Meriem Saadi",
      specialisation: "Villas & Luxe",
      phone: "+213 555 45 67 89",
    },
  ],
  updatedAt: new Date().toISOString(),
};
