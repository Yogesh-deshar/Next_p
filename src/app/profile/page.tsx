"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/Logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <h2>profile</h2>
      <button className="border border-white rounded-2xl" onClick={logout}>
        Logout
      </button>
    </>
  );
};

export default Profile;
