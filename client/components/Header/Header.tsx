import React, { ReactNode } from "react";
import Logo from "../Logo/Logo";
import Navbar from "../Navbar/Navbar";

interface Header {
  children: ReactNode;
}

const Header = () => {
  return (
    <header
      className={`z-[9999] fixed px-5 top-0 left-0 right-0 h-14 shadow-sm bg-white/20 backdrop-[2px] flex items-center justify-between w-full`}
    >
      <Logo />
      <Navbar />
    </header>
  );
};

export default Header;
