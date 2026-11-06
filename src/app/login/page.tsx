
"use client";

import Link from "next/link";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Mode = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("signup");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedMode = params.get("mode");

    if (requestedMode === "login" || requestedMode === "signup") {
      setMode(requestedMode);
    }
  }, []);

  function changeMode(nextMode: Mode) {
    setMode(nextMode);
    setMessage("");
    setError("");
    setPassword("");
    window.history.replaceState(
      null,
      "",
      `/login?mode=${nextMode}`
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (mode === "login") {
        // Sign in using either email or username.
        const response = await fetch("/api/auth/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: email,
            password,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Unable to sign in.");
        }

        router.push("/");
        router.refresh();
        return;
      }

      // Registration validation.
      const cleanUsername = username.trim().toLowerCase();
      const cleanDisplayName = displayName.trim();
      const cleanEmail = email.trim().toLowerCase();

      if (!/^[a-z0-9_]{3,24}$/.test(cleanUsername)) {
        throw new Error(
          "Your username must be 3–24 characters and contain only letters, numbers or underscores."
        );
      }

      if (!cleanDisplayName) {
        throw new Error("Please enter your display name.");
      }

      if (password.length < 8) {
        throw new Error("Your password must be at least 8 characters.");
      }

      const { data, error: signupError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            username: cleanUsername,
            display_name: cleanDisplayName,
          },
        },
      });

      if (signupError) {
        throw signupError;
      }

      if (data.session) {
        router.push("/");
        router.refresh();
        return;
      }

      setMessage(
        "Your account has been created! Please check your email for a confirmation link before signing in."
      );

      setMode("login");
      setPassword("");
      window.history.replaceState(null, "", "/login?mode=login");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-5 py-12 bg-[#17121b] text-[#e9dfd0]">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-block mb-8 text-sm text-[#c3a36c] hover:text-[#e4c58e] transition"
        >
          ← Return to the Library
        </Link>

        <section className="rounded-2xl border border-[#554057] bg-[#211a25]/95 p-7 shadow-2xl">
          <div className="text-center mb-7">
            <div className="text-4xl mb-3">✧</div>

            <p className="text-xs tracking-[0.35em] uppercase text-[#c3a36c] mb-3">
              The Hollow Library
            </p>

            <h1 className="text-3xl font-serif text-[#f0e5d5]">
              {mode === "login" ? "Welcome back." : "Find your place."}
            </h1>

            <p className="text-sm text-[#b9a9b7] mt-3">
              {mode === "login"
                ? "Return to the stories waiting for you."
                : "Create an account and join our independent archive."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-[#17121b] mb-6">
            <button
              type="button"
              onClick={() => changeMode("signup")}
              className={`rounded-md py-3 text-sm transition ${
                mode === "signup"
                  ? "bg-[#554057] text-[#f4e8d7]"
                  : "text-[#b9a9b7] hover:text-white"
              }`}
            >
              Join the Archive
            </button>

            <button
              type="button"
              onClick={() => changeMode("login")}
              className={`rounded-md py-3 text-sm transition ${
                mode === "login"
                  ? "bg-[#554057] text-[#f4e8d7]"
                  : "text-[#b9a9b7] hover:text-white"
              }`}
            >
              Sign in
            </button>
          </div>

          {message && (
            <div className="mb-5 rounded-lg border border-green-800 bg-green-950/40 p-3 text-sm text-green-200">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-5 rounded-lg border border-red-900 bg-red-950/40 p-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <div>
                  <label className="block text-sm mb-2 text-[#d7c5b5]">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Choose a username"
                    required
                    minLength={3}
                    maxLength={24}
                    autoComplete="username"
                    className="w-full rounded-lg border border-[#554057] bg-[#17121b] px-4 py-3 text-[#f0e5d5] outline-none focus:border-[#c3a36c]"
                  />
                  <p className="text-xs text-[#a997a8] mt-1">
                    3–24 characters. Letters, numbers and underscores only.
                  </p>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-[#d7c5b5]">
                    Display name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                    placeholder="The name readers will see"
                    required
                    maxLength={50}
                    autoComplete="nickname"
                    className="w-full rounded-lg border border-[#554057] bg-[#17121b] px-4 py-3 text-[#f0e5d5] outline-none focus:border-[#c3a36c]"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm mb-2 text-[#d7c5b5]">
                {mode === "login" ? "Email or username" : "Email address"}
              </label>
              <input
                type={mode === "login" ? "text" : "email"}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={
                  mode === "login"
                    ? "Enter your email or username"
                    : "you@example.com"
                }
                required
                autoComplete={mode === "login" ? "username" : "email"}
                className="w-full rounded-lg border border-[#554057] bg-[#17121b] px-4 py-3 text-[#f0e5d5] outline-none focus:border-[#c3a36c]"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-[#d7c5b5]">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                  minLength={mode === "signup" ? 8 : undefined}
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  className="w-full rounded-lg border border-[#554057] bg-[#17121b] px-4 py-3 pr-20 text-[#f0e5d5] outline-none focus:border-[#c3a36c]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#c3a36c] hover:text-[#e4c58e]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {mode === "signup" && (
                <p className="text-xs text-[#a997a8] mt-1">
                  Password must be at least 8 characters.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#a98754] hover:bg-[#c3a36c] disabled:opacity-50 disabled:cursor-not-allowed text-[#17121b] font-semibold py-3 mt-3 transition"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Sign in"
                  : "Create my account"}
            </button>
          </form>

          <p className="text-center text-xs text-[#a997a8] mt-7 leading-relaxed">
            An independent archive by The Collective Designs.
            <br />
            A place for stories, readers and creators.
          </p>
        </section>
      </div>
    </main>
  );
}
