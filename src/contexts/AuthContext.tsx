import { supabase } from "@/lib/supabaseClient";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { sendEmailOtp } from "@/lib/email";

interface AuthContextType {
  user: any | null;
  loading: boolean;
  sendOtp: (email: string, extra?: Record<string, any>) => Promise<{ error?: string }>;
  verifyOtp: (email: string, token: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }: any) => {
      if (!mounted) return;
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null);
    });
    return () => { sub?.subscription?.unsubscribe?.(); mounted = false; };
  }, []);

  const sendOtp = async (email: string, extra?: Record<string, any>) => {
    // Try Supabase OTP first
    if (supabase) {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true, emailRedirectTo: window.location.origin },
      });
      if (!error) return {};
    }
    // Fallback: EmailJS (demo-only) with in-memory OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem("qc_pending_email", email);
    sessionStorage.setItem("qc_pending_otp", otp);
    if (extra) sessionStorage.setItem("qc_pending_profile", JSON.stringify(extra));
    try {
      await sendEmailOtp(email, otp);
      return {};
    } catch (e: any) {
      return { error: e?.message ?? "Failed to send OTP" };
    }
  };

  const verifyOtp = async (email: string, token: string) => {
    if (supabase) {
      const { data, error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
      if (!error && (data as any)?.user) { setUser((data as any).user); return {}; }
    }
    // Fallback verify for EmailJS demo
    const storedEmail = sessionStorage.getItem("qc_pending_email");
    const storedOtp = sessionStorage.getItem("qc_pending_otp");
    if (storedEmail === email && storedOtp === token) {
      setUser({ id: "dev-user", email });
      return {};
    }
    return { error: "Invalid OTP" };
  };

  const signOut = async () => {
    if (!supabase) { setUser(null); return; }
    await supabase.auth.signOut();
  };

  const value = useMemo(() => ({ user, loading, sendOtp, verifyOtp, signOut }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
