import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/features/userSlice";
import Image from "next/image";

interface AvatarMenuProps {
  user: { name: string; avatarUrl?: string };
}

const AvatarMenu: React.FC<AvatarMenuProps> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 rounded-full bg-gray-100 p-2 hover:bg-gray-200"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="relative h-8 w-8">
          <Image
            src={user.avatarUrl || "/default-avatar.png"}
            alt={user.name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-full"
          />
        </div>
        <span className="hidden sm:block text-sm font-medium">{user.name}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <button
            onClick={() => dispatch(logout())}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;
