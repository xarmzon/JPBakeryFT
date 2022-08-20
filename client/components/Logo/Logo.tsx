import Link from "next/link";
import React from "react";
import CustomImage from "../CustomImage/CustomImage";

const Logo = () => {
  return (
    <Link href="/">
      <a className="w-8">
        <CustomImage
          src="/images/logo.png"
          layout="intrinsic"
          width="100%"
          height="100%"
        />
      </a>
    </Link>
  );
};

export default Logo;
