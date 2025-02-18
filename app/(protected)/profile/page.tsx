"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const username = "Raymond Palang";

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  return (
    <div className="flex justify-center min-h-[50vh] p-3  ">
      <div className="p-5 border w-[90vw] sm:w-[50vw] md:w-[40vw] rounded-lg shadow-lg bg-white text-center">
        <h1 className="text-2xl font-semibold mb-4">My Profile</h1>

        <div className="flex flex-col items-center gap-3">
          {avatar ? (
            <Image
              src={avatar}
              alt="User Avatar"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover border"
            />
          ) : (
            <label className="w-24 h-24 flex flex-col items-center justify-center rounded-full bg-gray-300 text-gray-600 cursor-pointer">
              <span className="text-xs">No Avatar</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </label>
          )}

          <p className="text-lg font-medium">{username}</p>

          {!avatar && (
            <label className="text-sm text-blue-600 cursor-pointer">
              Upload Avatar
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </label>
          )}

          <button className="bg-blue-600 text-white px-4 py-2 rounded-md mt-3 hover:bg-blue-700">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
