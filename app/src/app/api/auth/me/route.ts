import { NextResponse } from "next/server";

import { getCurrentAdminUser } from "@/lib/auth/session";

export async function GET() {
  const user = await getCurrentAdminUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    uid: user.uid,
    email: user.email,
  });
}
