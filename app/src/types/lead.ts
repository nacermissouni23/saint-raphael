export type LeadStatus = "new" | "contacted" | "converted" | "closed";

export type LeadSource = "listing_page" | "contact_page" | "whatsapp";

export type Lead = {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  message: string;
  listingId?: string;
  listingTitle?: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
  updatedAt: string;
};
