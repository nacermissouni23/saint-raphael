import type { Lead } from "@/types/lead";

const now = new Date();

function daysAgo(days: number): string {
  const date = new Date(now);
  date.setDate(now.getDate() - days);
  return date.toISOString();
}

export const mockLeads: Lead[] = [
  {
    id: "lead-1",
    fullName: "Rania Bouziane",
    phone: "+213 550 12 34 56",
    email: "rania@example.com",
    message: "Je souhaite visiter ce bien cette semaine.",
    listingId: "1",
    listingTitle: "Appt F4 Kouba vue panoramique",
    status: "contacted",
    source: "listing_page",
    createdAt: daysAgo(3),
    updatedAt: daysAgo(2),
  },
  {
    id: "lead-2",
    fullName: "Karim Mebarki",
    phone: "+213 661 98 76 54",
    email: "karim@example.com",
    message: "Je veux plus de details sur la villa et un rendez-vous.",
    listingId: "2",
    listingTitle: "Villa R+1 avec piscine Staoueli",
    status: "new",
    source: "listing_page",
    createdAt: daysAgo(2),
    updatedAt: daysAgo(2),
  },
  {
    id: "lead-3",
    fullName: "Fatima Rahmani",
    phone: "+213 770 55 43 21",
    email: "fatima@example.com",
    message: "Le bien est-il toujours disponible ?",
    listingId: "3",
    listingTitle: "Local commercial centre Oran",
    status: "converted",
    source: "contact_page",
    createdAt: daysAgo(8),
    updatedAt: daysAgo(6),
  },
  {
    id: "lead-4",
    fullName: "Hamid Cherif",
    phone: "+213 699 11 22 33",
    message: "Merci, je ne suis plus interesse.",
    status: "closed",
    source: "whatsapp",
    createdAt: daysAgo(12),
    updatedAt: daysAgo(11),
  },
];
