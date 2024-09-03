import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="w-full flex items-center justify-between p-4">
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-1">
        <Image src="/assets/icons/logo.svg" width={40} height={40} alt="logo" />
        <p className="nav-logo">
          Deal<span className="text-primary"> Scout</span>
        </p>
      </Link>

      {/* Icons and Login Section */}
      <div className="flex items-center gap-5">
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
      </div>
    </header>
  );
};

export default Navbar;
