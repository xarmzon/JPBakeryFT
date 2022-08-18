import type { NextPage } from "next";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import PageHead from "../components/PageHead/PageHead";

const Home: NextPage = () => {
  return (
    <>
      <PageHead />
      <Main />
      <Footer />
    </>
  );
};

export default Home;
