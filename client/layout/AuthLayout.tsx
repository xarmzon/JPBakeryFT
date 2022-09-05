import React, { ReactNode } from "react";
import CustomImage from "../components/CustomImage/CustomImage";
import Logo from "../components/Logo/Logo";
import PageHead from "../components/PageHead/PageHead";

interface IAuthLayout {
  children: ReactNode;
  title: string;
}
const AuthLayout = ({ children, title }: IAuthLayout) => {
  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-cake1 relative">
      <div className="absolute z-[2] bg-amber-600 inset-0 backdrop-blur-sm"></div>
      <PageHead title={title} />
      <div className={`relative z-[1] w-[95%] mx-auto max-w-[500px] shadow-md`}>
        <div className="w-28 mx-auto mb-2 flex justify-center relative">
          <CustomImage
            src="/images/logo.png"
            layout="intrinsic"
            width="100%"
            height="100%"
            className="mx-auto block"
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
