"use client";

import { authContext } from "@/src/providers/auth/auth-provider";
import { AuthContextProps } from "@/src/types/global";
import { useContext } from "react";

export function useAuth(): AuthContextProps {
  return useContext(authContext);
}
