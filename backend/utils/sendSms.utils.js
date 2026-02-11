import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendOTP = async (phone, otp) => {
  if (!process.env.TWILIO_SID || process.env.TWILIO_SID.includes('PLACEHOLDER')) {
    console.log("========================================");
    console.log(`[MOCK OTP] Sending to ${phone}: ${otp}`);
    console.log("========================================");
    return;
  }

  await client.messages.create({
    body: `Your E-Swastya OTP is ${otp}. Valid for 5 minutes.`,
    from: process.env.TWILIO_PHONE,
    to: `+91${phone}`   // India
  });
};