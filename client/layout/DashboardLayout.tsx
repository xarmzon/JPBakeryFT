import React, { ReactNode } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Loader from "../components/Loader/Loader";
import PageHead from "../components/PageHead/PageHead";
import { TUser } from "../context/AuthContext";
import useAuth from "../hooks/useAuth";

interface IDashboardLayout {
  children: ReactNode;
  allow?: TUser["role"];
  title?: string;
}
const DashboardLayout = ({
  children,
  allow = "buyer",
  title = "Dashboard",
}: IDashboardLayout) => {
  const { isLoading, loggedIn, user } = useAuth();
  return (
    <section className="py-24 min-h-screen">
      <PageHead title={title} />
      <Header />

      {isLoading ? (
        <Loader />
      ) : loggedIn && user?.role === allow ? (
        children
      ) : (
        <div className="my-5 text-center">
          <p className="text-secondary">You don't have access to this page</p>
        </div>
      )}

      <Footer />
    </section>
  );
};

export default DashboardLayout;
