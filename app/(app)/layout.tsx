"use client";

import { PropsWithChildren } from "react";
import AuthGuard from "../../src/guards/auth-guard";

const Layout = ({ children }: PropsWithChildren) => {
  return children;
};

export default Layout;
