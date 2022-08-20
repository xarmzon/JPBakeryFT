import React, { ReactNode } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import PageHead from "../components/PageHead/PageHead";

interface IMainLayout {
  children: ReactNode;
}
const MainLayout = ({ children }: IMainLayout) => {
  return (
    <>
      <PageHead />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
