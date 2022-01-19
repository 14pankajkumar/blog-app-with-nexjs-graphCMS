import React, { useEffect, useState } from "react";
import { Layout } from "../components";
import "../styles/globals.scss";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
