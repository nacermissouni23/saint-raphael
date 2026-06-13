import { z } from "zod";

import { createLeadRecord } from "@/lib/repositories/leads-repository";

export const leadInputSchema = z.object({
  fullName: z.string().min(2).max(150),
  phone: z.string().min(8).max(20),
  email: z.string().email().optional(),
  message: z.string().min(10).max(2000),
  listingId: z.string().optional(),
  source: z.enum(["listing_page", "contact_page", "whatsapp"]).default("listing_page"),
});

export type LeadInput = z.infer<typeof leadInputSchema>;

export async function createLead(input: LeadInput) {
  return createLeadRecord(input);
}
