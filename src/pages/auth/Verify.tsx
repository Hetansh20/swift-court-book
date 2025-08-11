import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

function useQuery(){ const { search } = useLocation(); return new URLSearchParams(search); }

const Verify = () => {
  const q = useQuery();
  const email = q.get("email") ?? "";
  const [code, setCode] = useState("");
  const { verifyOtp } = useAuth();
  const navigate = useNavigate();

  const onVerify = async () => {
    const { error } = await verifyOtp(email, code);
    if (error) return toast({ title: "Invalid OTP", description: error });
    toast({ title: "Welcome", description: "You're logged in!"});
    navigate("/");
  };

  return (
    <>
      <SEO title="Verify OTP — QuickCourt" description="Enter the OTP sent to your email to continue." canonical="/verify" />
      <Header />
      <main className="container py-10">
        <div className="max-w-md mx-auto rounded-lg border p-6 text-center">
          <h1 className="text-xl font-semibold">Verify your email</h1>
          <p className="text-sm text-muted-foreground mt-2">We've sent a 6-digit code to {email}</p>
          <div className="mt-6 flex justify-center">
            <InputOTP maxLength={6} value={code} onChange={setCode}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button className="mt-6 w-full hover-glow" onClick={onVerify} disabled={code.length!==6}>Verify & Continue</Button>
        </div>
      </main>
    </>
  );
};

export default Verify;
