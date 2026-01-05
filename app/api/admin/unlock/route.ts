import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({}));
  const expected = process.env.PROJECT_ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json(
      { error: "Mot de passe administrateur non configuré." },
      { status: 500 },
    );
  }

  if (!password || password !== expected) {
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("project_admin", "true", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 6, // 6h
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.json({ success: true });
}
