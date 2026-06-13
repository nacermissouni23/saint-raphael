const requiredPublicKeys = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
] as const;

const requiredServerKeys = [
  "FIREBASE_PROJECT_ID",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
] as const;

type PublicEnv = {
  [K in (typeof requiredPublicKeys)[number]]: string;
};

type ServerEnv = {
  [K in (typeof requiredServerKeys)[number]]: string;
};

function getRequired<K extends readonly string[]>(keys: K): { [P in K[number]]: string } {
  return keys.reduce((acc, key) => {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    acc[key as K[number]] = value;
    return acc;
  }, {} as { [P in K[number]]: string });
}

function getOptional<K extends readonly string[]>(
  keys: K,
): Partial<{ [P in K[number]]: string }> {
  return keys.reduce((acc, key) => {
    const value = process.env[key];
    if (value) {
      acc[key as K[number]] = value;
    }
    return acc;
  }, {} as Partial<{ [P in K[number]]: string }>);
}

export function getPublicEnv(): PublicEnv {
  return getRequired(requiredPublicKeys);
}

export function getOptionalPublicEnv(): Partial<PublicEnv> {
  return getOptional(requiredPublicKeys) as Partial<PublicEnv>;
}

export function getServerEnv(): ServerEnv {
  return getRequired(requiredServerKeys);
}

export function hasServerEnv(): boolean {
  const values = getOptional(requiredServerKeys);
  return requiredServerKeys.every((key) => Boolean(values[key]));
}
