"use client";

import { useState } from "react";
import SignupComponent from "./signup";
import SigninComponent from "./signin";
import { AuthType } from "./type";

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
