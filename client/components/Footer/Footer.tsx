import React from "react";
import { APP_NAME } from "../../utils/config";

const Footer = () => {
  return (
    <footer className="flex h-24 w-full items-center justify-center border-t">
      Copyright &copy;{new Date().getFullYear()} {APP_NAME}. All right reserved
      Powered by <span>Techathon Node.JS Track Instructor</span>
    </footer>
  );
};

export default Footer;
