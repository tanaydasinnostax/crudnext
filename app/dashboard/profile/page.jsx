"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import Navbar from "@/components/Navbar";
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchProfilePicture = () => {
        api.get("/auth/profile-picture", { responseType: "blob" })
        .then((response)=>{
          const imageUrl = URL.createObjectURL(response.data);
          setProfilePicture(imageUrl);
        })
        .catch((error) =>{
          console.error("Error fetching profile picture",error);
        });
      };
    fetchProfilePicture();
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    
     api.post("/auth/profile-picture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(()=>{
        toast.success("Profile picture updated");
        window.location.reload();
      })
      .catch((error)=>{
        toast.error("Error uploading profile picture",error);
        console.error("Error uploading profile picture",error);
      })
  };

  return (
    <div>
      <Navbar/>
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-2xl font-bold mb-5">Profile</h1>
        {profilePicture && <img src={profilePicture} alt="Profile" className="w-32 h-32 rounded-full mb-4" width="100" />}
        <label htmlFor="Upload Picture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Picture</label>
        <input type="file" onChange={handleUpload} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="uploadPicture" />
      </div>
    </div>
  );
}
