import React, { ReactNode } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

interface IMainLayout {
  children: ReactNode;
}
const MainLayout = ({ children }: IMainLayout) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
