import { useState } from "react";
import { SEO } from "@/components/SEO";
import Header from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const { sendOtp } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await sendOtp(email);
    if (error) return toast({ title: "Error", description: error });
    navigate(`/verify?email=${encodeURIComponent(email)}`);
  };

  return (
    <>
      <SEO title="Login — QuickCourt" description="Login or sign up with email OTP to QuickCourt." canonical="/login" />
      <Header />
      <main className="container py-10">
        <div className="max-w-md mx-auto rounded-lg border p-6">
          <h1 className="text-2xl font-bold">Login with OTP</h1>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <Input type="email" required placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <Button type="submit" className="w-full hover-glow">Send OTP</Button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
