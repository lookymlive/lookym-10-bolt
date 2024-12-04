"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/auth/auth-dialog";
import { useAuthStore } from "@/lib/store/auth-store";

export function AuthButton() {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { user, signOut } = useAuthStore();

  if (user) {
    return (
      <Button variant="ghost" size="icon" onClick={() => signOut()}>
        <User className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setShowAuthDialog(true)}>
        <User className="h-5 w-5" />
      </Button>
      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </>
  );
}