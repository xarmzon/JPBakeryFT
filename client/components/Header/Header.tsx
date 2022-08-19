import React, { ReactNode } from "react";
import Logo from "../Logo/Logo";

interface Header {
  children: ReactNode;
}

const Header = () => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 h-14 shadow-sm bg-white/60 backdrop-[2px] flex items-center w-full`}
    >
      <Logo />
    </header>
  );
};

export default Header;
