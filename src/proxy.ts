export function proxy() {
  return new Response(null, { status: 404 });
}

export const config = {
  matcher: ["/admin/:path*"],
};
