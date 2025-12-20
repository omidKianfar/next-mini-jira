"use client";

import { useContext } from "react";

// provider
import { authContext } from "@/src/providers/auth-provider";

// type
import { AuthContextProps } from "@/src/types/global";

export function useAuth(): AuthContextProps {
  return useContext(authContext);
}
