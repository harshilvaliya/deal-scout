"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For navigation

type NavbarProps = {
  username?: string;
};

const Navbar = ({ username }: NavbarProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Clear user session (e.g., remove token or user data from local storage or cookies)
    localStorage.removeItem("userToken"); // Example for token removal
    router.push("/login"); // Redirect to login page
  };

  return (
    <header
      onMouseLeave={() => setIsHovered(false)}
      className="w-full flex sticky top-0 bg-white z-10 justify-between py-4 px-20"
    >
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-1">
        <Image src="/assets/icons/logo.svg" width={40} height={40} alt="logo" />
        <p className="nav-logo">
          Deal<span className="text-primary"> Scout</span>
        </p>
      </Link>

      {/* Icons and Login Section */}
      <div className="flex items-center gap-5">
        {username ? (
          // Display username when the user is logged in
          <div className="relative" onMouseEnter={() => setIsHovered(true)}>
            <span className="text-primary flex items-center gap-1 cursor-pointer">
              <Image
                src="/assets/icons/user.svg"
                alt="user"
                width={28}
                height={28}
                className="object-contain"
              />
              <span>{username}</span>
            </span>

            {/* Show Logout button when hovered */}
            {isHovered && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2">
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // Display Login link when the user is not logged in
          <Link href="/login" className="text-primary flex items-center gap-1">
            <Image
              src="/assets/icons/user.svg"
              alt="login"
              width={28}
              height={28}
              className="object-contain"
            />
            <span>Login</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
