import React, { useState } from "react";

const FarmerLogin = ({ onLogin }: any) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // 🔹 Fake Send OTP
  const sendOtp = () => {
    if (phone.length !== 10) {
      alert("Enter valid 10 digit number");
      return;
    }

    console.log("OTP is 123456"); // dev ke liye
    alert("OTP sent successfully");

    setOtpSent(true);
  };

  // 🔹 Fake Verify OTP
  const verifyOtp = () => {
    if (otp === "123456") {
      const user = {
        id: Date.now().toString(),
        phone: phone,
        name: "Farmer " + phone.slice(-4),
      };

      onLogin(user);
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        {!otpSent ? (
          <>
            <h2 className="text-xl font-bold text-center mb-4">
              Farmer Login
            </h2>

            <input
              type="text"
              placeholder="Enter mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-2 rounded mb-4"
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
            <h2 className="text-xl font-bold text-center mb-4">
              Enter OTP
            </h2>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />

            <button
              onClick={verifyOtp}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FarmerLogin;
