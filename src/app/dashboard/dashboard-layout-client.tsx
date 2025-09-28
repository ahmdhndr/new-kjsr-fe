"use client";

import { Metadata } from "next";
import React, { useEffect } from "react";

import { useSession } from "next-auth/react";

import TokenManager from "@/lib/token-manager";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  if (session) {
    TokenManager.setToken(session.accessToken!);
  }

  useEffect(() => {
    if (session?.accessToken) {
      TokenManager.setToken(session.accessToken);
    } else {
      TokenManager.clear();
    }
  }, [session]);

  return children;
}
