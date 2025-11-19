import React, { ReactElement } from "react";

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return getLayout(<Component {...pageProps} />);
};

export default MyApp;
