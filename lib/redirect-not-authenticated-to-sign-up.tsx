import { authClient } from "@/lib/auth-client";

// This helper is intended to be used in event handlers (like onGenerate).
// It returns true if authenticated, otherwise it returns false and should trigger the modal.
// However, since hooks can't be called conditionally in handlers, this might be better as a Hook.

/**
 * Checks if the user is authenticated.
 * @returns true if authenticated, false otherwise.
 */
export const checkIsAuthenticated = async () => {
    const session = await authClient.getSession();
    return !!session.data;
}

// this will trigger the login or the sign up page... to a model"
// Since we need to trigger state in the component, maybe we export a hook.

import { useState, useCallback } from 'react';

export function useAuthTrigger() {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authView, setAuthView] = useState<'signin' | 'signup'>('signin');

    const ensureAuthenticated = useCallback(async () => {
        const session = await authClient.getSession();
        if (!session.data) {
            setShowAuthModal(true);
            return false;
        }
        return true;
    }, []);

    return {
        showAuthModal,
        setShowAuthModal,
        authView,
        setAuthView,
        ensureAuthenticated
    };
}
