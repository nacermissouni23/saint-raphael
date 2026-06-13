import { NextResponse } from "next/server";

import { wilayas } from "@/lib/mock/wilayas";

export async function GET() {
  return NextResponse.json({
    items: wilayas.map((wilaya) => ({ id: wilaya.id, name: wilaya.name })),
  });
}
