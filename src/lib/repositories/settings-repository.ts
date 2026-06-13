import { getAdminFirestore } from "@/lib/firebase/admin";
import { mockSettings } from "@/lib/mock/settings";
import type { AgencySettings } from "@/types/settings";

let inMemorySettings: AgencySettings = { ...mockSettings };

export async function getAgencySettings(): Promise<AgencySettings> {
  const db = getAdminFirestore();
  if (!db) {
    return inMemorySettings;
  }

  const doc = await db.collection("settings").doc("agency").get();
  if (!doc.exists) {
    await db.collection("settings").doc("agency").set(inMemorySettings);
    return inMemorySettings;
  }

  return doc.data() as AgencySettings;
}

export async function updateAgencySettings(
  input: Partial<AgencySettings>,
): Promise<AgencySettings> {
  const db = getAdminFirestore();
  const updatedAt = new Date().toISOString();

  if (!db) {
    inMemorySettings = {
      ...inMemorySettings,
      ...input,
      updatedAt,
    };
    return inMemorySettings;
  }

  const ref = db.collection("settings").doc("agency");
  await ref.set({ ...input, updatedAt }, { merge: true });
  const doc = await ref.get();
  return doc.data() as AgencySettings;
}
