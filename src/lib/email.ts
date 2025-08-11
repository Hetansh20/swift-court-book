import emailjs from "@emailjs/browser";

const EMAILJS_PUBLIC_KEY = "k8_wdCAkbbJ6aWlb4"; // publishable
const EMAILJS_SERVICE_ID = "otp_service"; // replace if different
const EMAILJS_TEMPLATE_ID = "otp_email_template"; // replace if different

let initialized = false;
export function initEmail() {
  if (!initialized) {
    try { emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); initialized = true; } catch {}
  }
}

export async function sendEmailOtp(email: string, otp: string) {
  initEmail();
  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { user_email: email, otp });
}
