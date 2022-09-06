import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import CustomImage from "../components/CustomImage/CustomImage";
import Loader from "../components/Loader/Loader";
import Logo from "../components/Logo/Logo";
import PageHead from "../components/PageHead/PageHead";
import useAuth from "../hooks/useAuth";

interface IAuthLayout {
  children: ReactNode;
  title: string;
}
const AuthLayout = ({ children, title }: IAuthLayout) => {
  const { isLoading, loggedIn } = useAuth();
  const router = useRouter();
  if (loggedIn) {
    router.push("/");
  }
  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-cake1 relative">
      <div className="absolute z-[0] bg-white/30 inset-0 backdrop-blur-sm"></div>
      <PageHead title={title} />
      <div className={`relative z-[2] w-[95%] mx-auto max-w-[450px]`}>
        <div className="w-28 mx-auto mb-2 flex justify-center relative">
          <Link href="/">
            <a>
              <CustomImage
                src="/images/logo.png"
                layout="intrinsic"
                width="100%"
                height="100%"
                className="mx-auto block"
              />
            </a>
          </Link>
        </div>
        {isLoading ? <Loader /> : children}
      </div>
    </div>
  );
};

export default AuthLayout;
