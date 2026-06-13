export type AgentProfile = {
  id: string;
  name: string;
  specialisation: string;
  phone: string;
  photoUrl?: string;
};

export type AgencySettings = {
  agencyName: string;
  address: string;
  email: string;
  officeHours: string;
  phones: string[];
  featuredListingIds: string[];
  agents: AgentProfile[];
  updatedAt: string;
};
