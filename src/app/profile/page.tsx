"use client";

import axios from "axios";
import { get } from "http";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const [data, setData] = useState("");
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

  const getuserData = async () => {
    try {
      const response = await axios.get("/api/users/userData");
      setData(response.data.data._id);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <h2>profile</h2>
      <h2>{data}</h2>
      <button className="border border-white rounded-2xl" onClick={getuserData}>
        Show user ID
      </button>
      <button className="border border-white rounded-2xl" onClick={logout}>
        Logout
      </button>
    </>
  );
};

export default Profile;
