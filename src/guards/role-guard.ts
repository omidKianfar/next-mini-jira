"use client";

import { useEffect } from "react";
import { useNavigation } from "../hooks/navigation";
import { useAuth } from "../hooks/auth/use-auth";

interface Props {
  accessTypes: string[];
  children: React.ReactNode;
}

const RoleGuard = ({ accessTypes, children }: Props) => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const userType = user?.userType;

  const userLoaded = user !== null && user !== undefined;
  const allowed = userLoaded ? accessTypes.includes(userType as string) : false;

  useEffect(() => {
    if (!userLoaded) return;

    if (!allowed) navigation.signin();
  }, [userLoaded, allowed, navigation]);

  if (!userLoaded) return null;
  if (!allowed) return null;

  return children;
};

export default RoleGuard;
