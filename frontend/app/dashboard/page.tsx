"use client";

import CreateTripForm from "@/components/CreateTripForm";
import { useAuth } from "@/components/contexts/Auth/AuthContext";

export default () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="self-center">
      <CreateTripForm />
    </div>
  );
};
