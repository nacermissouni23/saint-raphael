import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE } from "@/lib/auth/constants";
import { getAdminAuth } from "@/lib/firebase/admin";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export async function POST(request: Request) {
  const adminAuth = getAdminAuth();
  const payload = (await request.json().catch(() => null)) as { idToken?: string } | null;
  if (!payload?.idToken) {
    return NextResponse.json({ message: "Missing idToken" }, { status: 400 });
  }

  if (!adminAuth) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { message: "Firebase admin is not configured on the server." },
        { status: 503 },
      );
    }

    const response = NextResponse.json({ message: "Session created (local mode)" });
    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: "local-dev-session",
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });
    return response;
  }

  const decoded = await adminAuth.verifyIdToken(payload.idToken);
  const allowedEmails = (process.env.ADMIN_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

  if (allowedEmails.length > 0) {
    const email = decoded.email?.toLowerCase();
    if (!email || !allowedEmails.includes(email)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  }

  const expiresIn = SESSION_MAX_AGE_SECONDS * 1000;
  const sessionCookie = await adminAuth.createSessionCookie(payload.idToken, { expiresIn });

  const response = NextResponse.json({ message: "Session created" });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: sessionCookie,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ message: "Session cleared" });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
