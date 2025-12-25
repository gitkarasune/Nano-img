'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from "@/lib/auth-client";
import { ChatInterface, ChatMessage } from '@/components/dashboard/chat-interface';
import { PromptInput, PromptSettings } from '@/components/dashboard/prompt-input';
import { GeneratorView, type GeneratedImage } from '@/components/dashboard/generator-view';
import { AppHeader } from '@/components/dashboard/app-header';
import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { DownloadModal } from '@/components/modals/download-modal';
import { ImageEditorModal } from '@/components/modals/image-editor-modal';
import { toast } from 'sonner';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { MobileTabs, TabStatus } from '@/components/dashboard/mobile-tabs';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Auth Session
  const { data: session, isPending, error, refetch } = authClient.useSession();

  // Redirect if not authenticated (Middleware checks this too, but for client-side safety)
  useEffect(() => {
    if (!isPending && !session && !error) {
      router.push('/');
    }
  }, [session, isPending, error, router]);

  // Logic State
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'preview'>('chat');
  const [generationStatus, setGenerationStatus] = useState<TabStatus>('idle');

  // Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Preferences
  const [chatPosition, setChatPosition] = useState<'left' | 'right'>('left');

  // Modal states
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Initial Prompt Logic
  const hasRunInitialParamRef = useRef(false);

  // Read Search Params on Mount
  useEffect(() => {
    const prompt = searchParams.get('prompt');
    if (prompt && !hasRunInitialParamRef.current) {
      hasRunInitialParamRef.current = true;

      const packshot = searchParams.get('packshot') === 'true';
      const shadows = searchParams.get('shadows') === 'true';
      const aspectRatio = searchParams.get('ar') as any || '1:1';

      // Trigger generation
      handleGenerate(prompt, { packshotMode: packshot, realisticShadows: shadows, aspectRatio });

      // Clean up URL to prevent re-triggering
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('prompt');
      newParams.delete('packshot');
      newParams.delete('shadows');
      newParams.delete('ar');

      router.replace(newParams.toString() ? `/dashboard?${newParams.toString()}` : '/dashboard', { scroll: false });
    }
  }, [searchParams, router]);

  function AnimatedEllipsis() {
    const [dots, setDots] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        setDots(prev => prev.length < 3 ? prev + '.' : '');
      }, 500);
      return () => clearInterval(interval);
    }, []);

    return <span className="inline-block w-8 text-left">{dots}</span>;
  }

  if (isPending) return (
    <div className="flex h-screen flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white gap-3 animate-in fade-in duration-500">
      <div className="w-12 h-12 rounded-full border-4 border-primary border-t-blue-700 animate-spin" />
      <p className="text-muted-foreground animate-in slide-in-from-bottom-2 fade-in">
        Just a moment<AnimatedEllipsis />
      </p>
    </div>
  )

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white dark:bg-black text-black dark:text-white relative">
      <AppSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewChat={handleNewChat}
      />

      {/* Overlay to close sidebar on click outside */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px] md:bg-transparent md:backdrop-blur-none"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <AppHeader
        onMenuHover={handleSidebarHover}
        chatPosition={chatPosition}
        setChatPosition={setChatPosition}
      />

      {/* Main Content Area - Split View Enforced */}
      <main className="flex-1 w-full relative flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Tabs Header */}
          <div className="md:hidden sticky top-0 bg-white dark:bg-black z-30">
            <MobileTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              status={generationStatus}
            />
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Mobile Content (Animated Switch) */}
            <div className="md:hidden flex-1 flex flex-col w-full h-full relative overflow-hidden bg-muted/10">
              <AnimatePresence mode='popLayout' initial={false}>
                {activeTab === 'chat' ? (
                  <motion.div
                    key="chat"
                    className="absolute inset-0 w-full h-full bg-white dark:bg-black"
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -200, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <ChatInterface
                      messages={messages}
                      onGenerate={handleGenerate}
                      isLoading={isLoading}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="preview"
                    className="absolute inset-0 w-full h-full bg-white dark:bg-black"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 200, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="flex-1 bg-white dark:bg-black p-3 relative h-full">
                      <GeneratorView
                        images={images}
                        isLoading={isLoading}
                        onDownload={(img) => { setSelectedImage(img); setIsDownloadOpen(true); }}
                        onEdit={(img) => { setSelectedImage(img); setIsEditOpen(true); }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Content (Resizable Split Panel) */}
            <div className="hidden md:flex w-full h-full">
              <ResizablePanelGroup direction="horizontal">
                {chatPosition === 'left' ? (
                  <>
                    <ResizablePanel
                      defaultSize={35}
                      minSize={25}
                      maxSize={50}
                      className="bg-background flex flex-col"
                      order={1}
                    >
                      <ChatInterface
                        messages={messages}
                        onGenerate={handleGenerate}
                        isLoading={isLoading}
                      />
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    <ResizablePanel
                      defaultSize={65}
                      className="bg-white dark:bg-black" /* TODO: change to grid background, and it should still be adapted to white and dark mode */
                      order={2}
                    >
                      <div className="w-full h-full p-6">
                        <GeneratorView
                          images={images}
                          isLoading={isLoading}
                          onDownload={(img) => { setSelectedImage(img); setIsDownloadOpen(true); }}
                          onEdit={(img) => { setSelectedImage(img); setIsEditOpen(true); }}
                        />
                      </div>
                    </ResizablePanel>
                  </>
                ) : (
                  <>
                    <ResizablePanel
                      defaultSize={65}
                      className="bg-white dark:bg-black" /* TODO: change to grid background, and it should still be adapted to white and dark mode */
                      order={1}
                    >
                      <div className="w-full h-full p-6">
                        <GeneratorView
                          images={images}
                          isLoading={isLoading}
                          onDownload={(img) => { setSelectedImage(img); setIsDownloadOpen(true); }}
                          onEdit={(img) => { setSelectedImage(img); setIsEditOpen(true); }}
                        />
                      </div>
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    <ResizablePanel
                      defaultSize={35}
                      minSize={25}
                      maxSize={50}
                      className="bg-white dark:bg-black flex flex-col"
                      order={2}
                    >
                      <ChatInterface
                        messages={messages}
                        onGenerate={handleGenerate}
                        isLoading={isLoading}
                      />
                    </ResizablePanel>
                  </>
                )}
              </ResizablePanelGroup>
            </div>
          </div>
        </div>
      </main>

      <DownloadModal
        open={isDownloadOpen}
        onOpenChange={setIsDownloadOpen}
        image={selectedImage}
      />

      <ImageEditorModal
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        image={selectedImage}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
