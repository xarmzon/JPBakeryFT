import React from "react";
import { APP_NAME } from "../../utils/config";

const Footer = () => {
  return (
    <footer className="flex h-24 w-full text-center items-center justify-center border-t">
      <p>
        Copyright &copy;{new Date().getFullYear()} {APP_NAME}. All right
        reserved Powered by{" "}
        <span className="text-primary">Techathon Node.JS Track</span>
      </p>
    </footer>
  );
};

export default Footer;
