
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { identifier, password } = await request.json();

    if (
      typeof identifier !== "string" ||
      typeof password !== "string" ||
      !identifier.trim() ||
      !password
    ) {
      return NextResponse.json(
        { error: "Please enter your email or username and password." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const publishableKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
    const secretKey = process.env.SUPABASE_SECRET_KEY!;

    if (!supabaseUrl || !publishableKey || !secretKey) {
      throw new Error("Supabase environment variables are missing.");
    }

    let email = identifier.trim();

    // If the member entered a username, find their account email privately.
    if (!email.includes("@")) {
      const admin = createClient(supabaseUrl, secretKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });

      const { data: profile, error: profileError } = await admin
        .from("profiles")
        .select("id")
        .eq("username", email.toLowerCase())
        .maybeSingle();

      if (profileError || !profile) {
        return NextResponse.json(
          { error: "Invalid username/email or password." },
          { status: 401 }
        );
      }

      const { data: userData, error: userError } =
        await admin.auth.admin.getUserById(profile.id);

      if (userError || !userData.user?.email) {
        return NextResponse.json(
          { error: "Invalid username/email or password." },
          { status: 401 }
        );
      }

      email = userData.user.email;
    }

    // Sign in and store the session securely in cookies.
    const cookieStore = await cookies();

    const supabase = createServerClient(
      supabaseUrl,
      publishableKey,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      }
    );

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: "Invalid username/email or password." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sign-in error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
