import React, { ReactNode } from "react";
import PageHead from "../components/PageHead/PageHead";

interface IAuthLayout {
  children: ReactNode;
  title: string;
}
const AuthLayout = ({ children, title }: IAuthLayout) => {
  return (
    <>
      <PageHead title={title} />
      <div className={`w-[95%] mx-auto max-w-2xl bg-primary text-white`}>
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
