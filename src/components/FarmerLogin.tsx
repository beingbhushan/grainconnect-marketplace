import React, { useState } from "react";
import { auth } from "../firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const FarmerLogin = ({ onLogin }: any) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmResult, setConfirmResult] = useState<any>(null);

  // 🔹 Send OTP
  const sendOtp = async () => {
  try {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );

      await (window as any).recaptchaVerifier.render(); // 🔥 IMPORTANT
    }

    const appVerifier = (window as any).recaptchaVerifier;

    const result = await signInWithPhoneNumber(
      auth,
      `+91${phone}`,
      appVerifier
    );

    setConfirmResult(result);
    alert("OTP sent");
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
};


  // 🔹 Verify OTP
  const verifyOtp = async () => {
    try {
      const res = await confirmResult.confirm(otp);

      const user = {
        id: res.user.uid,
        phone: res.user.phoneNumber,
      };

      onLogin(user);
    } catch (error) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">Farmer Login</h2>

      {!confirmResult ? (
        <>
          <input
            type="text"
            placeholder="Enter mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <button
            onClick={sendOtp}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Send OTP
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <button
            onClick={verifyOtp}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Verify OTP
          </button>
        </>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default FarmerLogin;
