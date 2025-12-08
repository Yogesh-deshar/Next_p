"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/Signup", user);
      if (response.status === 201) {
        toast.success("User created successfully");
        router.push("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-white max-w-80 m-auto mt-10">
      <h1 className="p-3">Signup</h1>
      <form className="flex flex-col gap-3  p-3" onSubmit={handleSubmit}>
        <input
          className="border border-white"
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          className="border border-white"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <input
          type="text"
          className="border border-white"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <button type="submit">Signup</button>
      </form>
      <Link href="/login">Already have an account? Login</Link>
    </div>
  );
};

export default SignupPage;
