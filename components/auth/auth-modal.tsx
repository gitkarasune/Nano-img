'use client';

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
// Note: If VisuallyHidden is not available directly, we can just use a standard screen-reader-only class or omitting Title if allowed (but accessible dialogs usually need one).
// I will assume standard shadcn dialog structure.
import { LoginForm } from "@/components/auth/sign-in-page";
import { SignupForm } from "@/components/auth/sign-up-page";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialView?: 'signin' | 'signup';
}

export function AuthModal({ isOpen, onClose, initialView = 'signin' }: AuthModalProps) {
    const [view, setView] = useState<'signin' | 'signup'>(initialView);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            // Prevent closing by clicking outside or escape if we want strict control, 
            if (!open) return; // Prevent closing via auto-events 
        }}>
            <DialogContent
                className="w-full p-0 gap-0 overflow-hidden bg-white dark:bg-black border rounded-none"
                // This prevents the default close button from rendering or working if we want custom behavior
                // But shadcn usually includes a close button. Use `[&>button]:hidden` to hide default close.
                forceMount
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
                onEscapeKeyDown={(e) => {
                    e.preventDefault();
                }}
            >
                {/* the times close button */}
                <div className="absolute right-4 top-4 z-50 border rounded-none">
                    <Button
                        size="icon"
                        className="h-8 w-8 rounded-none bg-white dark:bg-black text-black dark:text-white cursor-pointer"
                        onClick={onClose}
                    >
                        <X className="h-4 w-4 " />
                        <span className="sr-only">Close</span>
                    </Button>
                </div>

                {/* Accessibility requirement: Title */}
                <VisuallyHidden>
                    <DialogTitle>Authentication</DialogTitle>
                    <DialogDescription>Sign in or create an account</DialogDescription>
                </VisuallyHidden>

                <div className="w-full max-h-[80vh] scroll-auto p-0">
                    {view === 'signin' ? (
                        <div className="flex flex-col">
                            <LoginForm className="w-full px-4 lg:px-3 -mt-12" />
                            <div className="text-center text-sm text-black dark:text-white">
                                Don&apos;t have an account?{" "}
                                <button
                                    onClick={() => setView('signup')}
                                    className="text-black dark:text-white rounded-none border hover:underline transition-all px-3 py-1"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <SignupForm className="w-full px-4 lg:px-3 -mt-12" />
                            <div className=" text-center text-sm text-black dark:text-white">
                                Have an account?{" "}
                                <button
                                    onClick={() => setView('signin')}
                                    className="text-black dark:text-white rounded-none border hover:underline transition-all px-3 py-1"
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
