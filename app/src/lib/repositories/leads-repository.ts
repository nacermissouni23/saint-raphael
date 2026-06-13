import { getAdminFirestore } from "@/lib/firebase/admin";
import { mockLeads } from "@/lib/mock/leads";
import type { LeadInput } from "@/lib/services/leads";
import type { Lead, LeadStatus } from "@/types/lead";

type StoredLead = Lead & {
  listingId?: string;
  listingTitle?: string;
};

const inMemoryLeadStore: StoredLead[] = [...mockLeads];

export async function createLeadRecord(input: LeadInput): Promise<StoredLead> {
  const db = getAdminFirestore();
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  if (!db) {
    const localLead = {
      ...input,
      id: crypto.randomUUID(),
      createdAt,
      updatedAt,
      status: "new" as const,
    };

    inMemoryLeadStore.push(localLead);
    return localLead;
  }

  const docRef = db.collection("leads").doc();
  const lead = {
    ...input,
    id: docRef.id,
    createdAt,
    updatedAt,
    status: "new" as const,
  };

  await docRef.set(lead);
  return lead;
}

export async function listLeads(): Promise<StoredLead[]> {
  const db = getAdminFirestore();
  if (!db) {
    return [...inMemoryLeadStore].sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1,
    );
  }

  const snapshot = await db.collection("leads").orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc) => doc.data() as StoredLead);
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<StoredLead | null> {
  const db = getAdminFirestore();
  const updatedAt = new Date().toISOString();

  if (!db) {
    const index = inMemoryLeadStore.findIndex((lead) => lead.id === id);
    if (index === -1) {
      return null;
    }

    inMemoryLeadStore[index] = {
      ...inMemoryLeadStore[index],
      status,
      updatedAt,
    };

    return inMemoryLeadStore[index];
  }

  const docRef = db.collection("leads").doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    return null;
  }

  await docRef.set({ status, updatedAt }, { merge: true });
  const next = await docRef.get();
  return next.data() as StoredLead;
}

export async function exportLeadsCsv(): Promise<string> {
  const leads = await listLeads();
  const headers = ["id", "name", "phone", "email", "status", "source", "createdAt"];
  const rows = leads.map((lead) => [
    lead.id,
    lead.fullName,
    lead.phone,
    lead.email ?? "",
    lead.status,
    lead.source,
    lead.createdAt,
  ]);

  return [headers, ...rows]
    .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
    .join("\n");
}
