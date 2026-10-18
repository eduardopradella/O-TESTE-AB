import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "ab_variant";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

function isHttpsUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const urlA = process.env.AB_URL_A;
  const urlB = process.env.AB_URL_B;

  if (!isHttpsUrl(urlA) || !isHttpsUrl(urlB)) {
    return new NextResponse(
      "Configure AB_URL_A e AB_URL_B nas variáveis de ambiente da Vercel. Ambas devem ser URLs https:// válidas.",
      { status: 500, headers: { "content-type": "text/plain; charset=utf-8" } }
    );
  }

  let variant = request.cookies.get(COOKIE_NAME)?.value;
  if (variant !== "A" && variant !== "B") {
    variant = Math.random() < 0.5 ? "A" : "B";
  }

  const origin = variant === "A" ? urlA : urlB;
  const normalizedOrigin = origin.endsWith("/") ? origin : `${origin}/`;
  const destination = new URL(
    request.nextUrl.pathname + request.nextUrl.search,
    normalizedOrigin
  );

  const response = NextResponse.rewrite(destination);
  response.cookies.set({
    name: COOKIE_NAME,
    value: variant,
    httpOnly: true,
    secure: request.nextUrl.protocol === "https:",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE
  });
  response.headers.set("x-ab-variant", variant);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
