import React from "react";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import ProtectedPageInfo from "./protected-page-info";

export default async function ProtectedComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <ProtectedPageInfo />;
  }
  return <>{children}</>;
}
