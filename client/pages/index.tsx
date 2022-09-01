import type { NextPage } from "next";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import PageHead from "../components/PageHead/PageHead";
import MainLayout from "../layout/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Main />
    </MainLayout>
  );
};

export default Home;
