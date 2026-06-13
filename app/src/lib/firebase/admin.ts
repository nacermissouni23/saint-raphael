import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

import { getServerEnv, hasServerEnv } from "@/lib/env";

function getFirebaseAdminApp() {
  if (!hasServerEnv()) {
    return null;
  }

  if (getApps().length > 0) {
    return getApps()[0];
  }

  const env = getServerEnv();
  return initializeApp({
    credential: cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

let adminInitErrorLogged = false;

function safeGetAdminApp() {
  try {
    return getFirebaseAdminApp();
  } catch (error) {
    if (!adminInitErrorLogged) {
      console.warn("Firebase Admin init failed, falling back to mock data.", error);
      adminInitErrorLogged = true;
    }
    return null;
  }
}

export function getAdminAuth() {
  const app = safeGetAdminApp();
  return app ? getAuth(app) : null;
}

export function getAdminFirestore() {
  const app = safeGetAdminApp();
  return app ? getFirestore(app) : null;
}
