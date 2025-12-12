"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const VerifiedEmail = () => {
  const [token, setToken] = useState(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams(window.location.search);
    return params.get("token") || "";
  });
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      if (!token) return;
      try {
        await axios.post("/api/users/verifiedEmail", { token });
        setVerified(true);
      } catch (err) {
        setError(true);
        if (err instanceof Error) console.log(err.message);
        else console.log(err);
      }
    };
    verify();
  }, [token]);

  // token is initialized from URL on first render

  return (
    <>
      <h2>{token ? `${token}` : " no token"}</h2>

      {verified && (
        <div>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && <p>Verification failed or token expired.</p>}
    </>
  );
};

export default VerifiedEmail;
