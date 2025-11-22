"use client";

import { useEffect, useState } from "react";
import SignupComponent from "./signup";
import SigninComponent from "./signin";
import { AuthType } from "./types";

const AuthPageComponent = () => {
  const [page, setPage] = useState<AuthType>("signin");

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {page == "signin" ? (
        <SigninComponent setPage={setPage} />
      ) : (
        <SignupComponent setPage={setPage} />
      )}
    </div>
  );
};

export default AuthPageComponent;
