import { supabase } from "@/lib/supabaseClient";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface AuthContextType {
  user: any | null;
  loading: boolean;
  sendOtp: (email: string) => Promise<{ error?: string }>;
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
      // No Supabase configured; run in mock mode
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

  const sendOtp = async (email: string) => {
    if (!supabase) {
      // Mock mode: accept any email
      localStorage.setItem("qc_mock_email", email);
      return { };
    }
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true, emailRedirectTo: window.location.origin },
    });
    return { error: (error as any)?.message };
  };

  const verifyOtp = async (email: string, token: string) => {
    if (!supabase) {
      // Mock mode: accept any 6-digit token
      if (token.length === 6) {
        setUser({ id: "dev-user", email });
        return {};
      }
      return { error: "Enter 6 digits" };
    }
    const { data, error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
    if (!error && (data as any)?.user) setUser((data as any).user);
    return { error: (error as any)?.message };
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
