"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AuthForm } from "@/components/auth/auth-form";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" aria-describedby="auth-dialog-description">
        <DialogHeader>
          <DialogTitle>Welcome to Lookym</DialogTitle>
          <p id="auth-dialog-description" className="text-sm text-muted-foreground">
            Sign in to your account or create a new one
          </p>
        </DialogHeader>
        <AuthForm />
      </DialogContent>
    </Dialog>
  );
}