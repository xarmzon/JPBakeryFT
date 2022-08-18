import Head from "next/head";
import React from "react";
import { APP_NAME } from "../../utils/config";

interface IPageHead {
  title?: string;
  fav?: string;
}
const PageHead = ({ title, fav }: IPageHead) => {
  return (
    <Head>
      <title>
        {title || "Home of Good Cakes"} | {APP_NAME}
      </title>
      {fav ? fav : <link rel="icon" href="/favicon.ico" />}
    </Head>
  );
};

export default PageHead;
