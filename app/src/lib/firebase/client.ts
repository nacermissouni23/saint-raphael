import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { getPublicEnv, getOptionalPublicEnv } from "@/lib/env";

function isPublicFirebaseConfigured(): boolean {
  const env = getOptionalPublicEnv();
  return Boolean(
    env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
      env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
      env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET &&
      env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID &&
      env.NEXT_PUBLIC_FIREBASE_APP_ID,
  );
}

export function getFirebaseClientApp() {
  if (!isPublicFirebaseConfigured()) {
    return null;
  }

  const env = getPublicEnv();
  const firebaseConfig = {
    apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}

export function getFirebaseAuthClient() {
  const app = getFirebaseClientApp();
  return app ? getAuth(app) : null;
}

export function getFirestoreClient() {
  const app = getFirebaseClientApp();
  return app ? getFirestore(app) : null;
}

export function getStorageClient() {
  const app = getFirebaseClientApp();
  return app ? getStorage(app) : null;
}
