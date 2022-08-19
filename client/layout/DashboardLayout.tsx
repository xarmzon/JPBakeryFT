import React, { ReactNode } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

interface IDashboardLayout {
  children: ReactNode;
}
const DashboardLayout = ({ children }: IDashboardLayout) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default DashboardLayout;
