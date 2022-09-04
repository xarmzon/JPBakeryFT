import Link from "next/link";
import React, { ReactNode } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import PageHead from "../components/PageHead/PageHead";
import useAuth from "../hooks/useAuth";

interface IDashboardLayout {
  children: ReactNode;
}
const DashboardLayout = ({ children }: IDashboardLayout) => {
  const { isLoading, loggedIn } = useAuth();
  return (
    <>
      <PageHead />
      <Header />
      {isLoading ? (
        <div>Loading....</div>
      ) : loggedIn ? (
        { children }
      ) : (
        <Link href="/login">Login Here</Link>
      )}
      <Footer />
    </>
  );
};

export default DashboardLayout;
