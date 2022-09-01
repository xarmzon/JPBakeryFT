import React, { ReactNode } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import PageHead from "../components/PageHead/PageHead";

interface IDashboardLayout {
  children: ReactNode;
}
const DashboardLayout = ({ children }: IDashboardLayout) => {
  return (
    <>
      <PageHead />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default DashboardLayout;
