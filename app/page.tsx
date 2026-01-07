"use client"

import { useState, useEffect } from 'react';
import { PromptInput, PromptSettings } from '@/components/dashboard/prompt-input';
import { AppHeader } from '@/components/dashboard/app-header';
import { RotatingPrompts } from '@/components/dashboard/rotating-prompts';
import { AuthModal } from '@/components/auth/auth-modal';
import { useAuthTrigger } from '@/lib/redirect-not-authenticated-to-sign-up';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function Home() {
  const [promptValue, setPromptValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showAuthModal, setShowAuthModal, authView, setAuthView, ensureAuthenticated } = useAuthTrigger();
  const { data: session } = authClient.useSession();
  const [chatPosition, setChatPosition] = useState<'left' | 'right'>('left');

  // Handle redirect after login if there's a pending prompt
  useEffect(() => {
    if (session) {
      const pending = localStorage.getItem('pendingPrompt');
      if (pending) {
        try {
          const { prompt, settings } = JSON.parse(pending);

          const params = new URLSearchParams();
          params.set('prompt', prompt);
          if (settings.packshotMode) params.set('packshot', 'true');
          if (settings.realisticShadows) params.set('shadows', 'true');
          if (settings.aspectRatio) params.set('ar', settings.aspectRatio);

          localStorage.removeItem('pendingPrompt');
          router.push(`/dashboard?${params.toString()}`);
        } catch (e) {
          console.error("Failed to parse pending prompt", e);
          localStorage.removeItem('pendingPrompt');
        }
      }
    }
  }, [session, router]);

  const handleGenerate = async (prompt: string, settings: PromptSettings) => {
    setIsLoading(true);

    // 1. Check Auth
    const isAuthenticated = await ensureAuthenticated();

    if (isAuthenticated) {
      // 2. Redirect to Dashboard with prompt
      const params = new URLSearchParams();
      params.set('prompt', prompt);
      if (settings.packshotMode) params.set('packshot', 'true');
      if (settings.realisticShadows) params.set('shadows', 'true');
      if (settings.aspectRatio) params.set('ar', settings.aspectRatio);

      router.push(`/dashboard?${params.toString()}`);
    } else {
      // 3. Save to localStorage for post-login redirect
      localStorage.setItem('pendingPrompt', JSON.stringify({ prompt, settings }));
      // Modal opens via ensureAuthenticated hook state
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white dark:bg-black text-black dark:text-white relative is-home-page selection:bg-black/5 selection:dark:bg-white/10">

      {/* Background Pattern - Radial Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12)_0%,transparent_50%)]" />
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialView={authView}
      />

      <AppHeader
        onMenuHover={() => { }} // No sidebar on landing? Or valid?
        chatPosition={chatPosition} // Prop binding
        setChatPosition={setChatPosition}
      // User check handling in header component?
      />

      {/* Main Content Area - Landing Style */}
      <main className="flex-1 w-full relative flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl space-y-8 animate-in fade-in zoom-in duration-500 slide-in-from-bottom-8">
          <div className="text-center space-y-4 mb-20">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              What can I create for you?
            </h1>
          </div>

          {/* Input prompt */}
          <PromptInput
            onGenerate={handleGenerate}
            isLoading={isLoading} // Loading state mainly for transition
            value={promptValue}
            onValueChange={setPromptValue}
          />

          {/* Rotating Prompts */}
          <RotatingPrompts onSelect={setPromptValue} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}
