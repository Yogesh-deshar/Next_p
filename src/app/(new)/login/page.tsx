"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const handleNavigate = () => {
    setLoading(true);
    // 2-second delay
  };
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/Login", user);
      toast.success("Login successful");
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <div className="border border-white w-80 m-auto mt-10 p-3">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
            className="border border-white"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
            className="border border-white"
          />

          {buttonDisabled ? (
            <button type="submit" disabled>
              not login
            </button>
          ) : (
            <button type="submit">Login</button>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPage;
