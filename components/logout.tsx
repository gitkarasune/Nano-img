"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

export function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <Button className="flex items-center gap-2 rounded-none " onClick={handleLogout}>
      Logout <LogOut className="size-4" />
    </Button>
  );
}
