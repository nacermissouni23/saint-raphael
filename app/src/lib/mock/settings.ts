import type { AgencySettings } from "@/types/settings";

export const mockSettings: AgencySettings = {
  agencyName: "Agence Immobiliere Saint Raphael",
  address: "25, rue Dziri Abdelkader, ex Rue Viviani, El Biar 16010",
  email: "",
  officeHours: "Dimanche - Jeudi: 08:00 - 17:00",
  phones: ["+213 770 53 87 30"],
  featuredListingIds: ["1", "2"],
  agents: [],
  updatedAt: new Date().toISOString(),
};
