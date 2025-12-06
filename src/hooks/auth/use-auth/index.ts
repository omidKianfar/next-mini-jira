"use client";

import { authContext, AuthContextProps, useContext } from "../../imports";

export function useAuth(): AuthContextProps {
  return useContext(authContext);
}