import { NextResponse } from "next/server";

import { wilayas } from "@/lib/mock/wilayas";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, context: Context) {
  const { id } = await context.params;
  const numericId = Number(id);
  const wilaya = wilayas.find((entry) => entry.id === numericId);

  if (!wilaya) {
    return NextResponse.json({ message: "Wilaya not found" }, { status: 404 });
  }

  return NextResponse.json({ items: wilaya.communes });
}
