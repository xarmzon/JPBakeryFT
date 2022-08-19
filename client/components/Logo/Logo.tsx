import Link from "next/link";
import React from "react";
import CustomImage from "../CustomImage/CustomImage";

const Logo = () => {
  return (
    <Link href="/">
      <a className="w-8">
        <CustomImage src="/images/logo.png" layout="intrinsic" />
      </a>
    </Link>
  );
};

export default Logo;
