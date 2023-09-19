import { AuthRequired } from "@/components/contexts/Auth/AuthRequired";
import React from "react";

export default ({ children }: { children: React.ReactNode }) => {
  return <AuthRequired>{children}</AuthRequired>;
};
