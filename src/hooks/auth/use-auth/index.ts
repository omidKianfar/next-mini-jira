import { useContext } from "react";
import { AuthContextProps } from "../../../types/global";
import { authContext } from "../../../providers/auth/auth-provider";

export function useAuth(): AuthContextProps {
  return useContext(authContext);
}