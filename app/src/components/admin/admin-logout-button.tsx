"use client";

import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();

  async function onLogout() {
    await fetch("/api/auth/session", {
      method: "DELETE",
    });

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={onLogout}
      className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text-primary)]"
      type="button"
    >
      Logout
    </button>
  );
}
