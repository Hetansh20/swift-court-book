import { useState } from "react";
import { SEO } from "@/components/SEO";
import Header from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>("player");
  const { sendOtp } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await sendOtp(email, { full_name: fullName, role });
    if (error) return toast({ title: "Error", description: error });
    sessionStorage.setItem("qc_pending_profile", JSON.stringify({ full_name: fullName, role }));
    navigate(`/verify?email=${encodeURIComponent(email)}`);
  };

  return (
    <>
      <SEO title="Sign Up — QuickCourt" description="Create your QuickCourt account with OTP verification." canonical="/signup" />
      <Header />
      <main className="container py-10">
        <div className="max-w-md mx-auto rounded-lg border p-6">
          <h1 className="text-2xl font-bold">Create account</h1>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <Input placeholder="Full name" value={fullName} onChange={(e)=>setFullName(e.target.value)} required />
            <Input type="email" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <div>
              <label className="text-sm">Role</label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-full mt-1"><SelectValue placeholder="Select role" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="player">Player</SelectItem>
                  <SelectItem value="owner">Facility Owner</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full hover-glow">Sign Up with OTP</Button>
            <p className="text-xs text-muted-foreground">Already have an account? <a href="/login" className="underline">Log in</a></p>
          </form>
        </div>
      </main>
    </>
  );
};

export default Signup;
