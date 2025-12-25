'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Edit2, Share2, ZoomIn, Info, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';

function SearchIconAnimation() {
    const [phase, setPhase] = useState<'orbit' | 'scan'>('orbit');

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const runCycle = () => {
            setPhase('orbit');
            // Orbit for 10 seconds
            timeout = setTimeout(() => {
                setPhase('scan');
                // Scan for 3 seconds
                timeout = setTimeout(() => {
                    runCycle(); // Restart cycle
                }, 3000);
            }, 10000);
        };

        runCycle();

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="relative flex items-center justify-center w-32 h-32">
            {/* Text */}
            <motion.h3
                className={cn(
                    "text-sm font-medium transition-all duration-500",
                    phase === 'scan' ? "blur-[2px]" : "blur-0"
                )}
            >
                Preview
            </motion.h3>

            {/* Orbiting Icon */}
            <motion.div
                className="absolute"
                animate={phase === 'orbit' ? {
                    rotate: 360,
                } : {
                    rotate: 0, // Stop rotation or align?
                    // Actually, for "hover on top", we want x/y translation to center
                    x: 0, y: 0
                }}
                transition={phase === 'orbit' ? {
                    duration: 10,
                    ease: "linear",
                    repeat: Infinity
                } : {
                    duration: 0.5
                }}
            // When in orbit, we want it offset from center.
            // We can use a container for rotation, or just circular motion.
            // Let's use a container method:
            // If we rotate the CONTAINER, the child (icon) orbits if offset.
            >
                {/* 
                   Wait, if we rotate the parent div, the icon itself rotates. 
                   Better approach: 
                   'orbit' phase: animate x/y in a circle path?
                   Or just rotate parent, counter-rotate child? 
                   
                   Simplest "orbit around text":
                   Parent div (absolute centered) -> Rotate 360deg
                   Child div (absolute offset) -> Display icon.
                   
                   When switching to 'scan', we animate the Child div offset to 0 (center)
                   and stop Parent rotation? Or continue? 
                   If we stop rotation, it stops wherever it is.
                   Moving to center (0,0) works regardless of rotation angle if parent is centered.
                */}
            </motion.div>
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={phase === 'orbit' ? { rotate: 360 } : { rotate: 360 /* Keep rotating or freeze? User said "removes the hover and move around again". If we freeze, restart might jump. let's keep rotating container but move inner to center? */ }}
                transition={{ duration: 10, ease: "linear", repeat: Infinity }}
            >
                <motion.div
                    className="text-primary"
                    animate={phase === 'orbit' ? {
                        x: 40, // Reduced radius for "around text"
                        y: 0,
                        scale: 1,
                        rotate: -360 // Counter rotation to keep icon upright?
                    } : {
                        x: 0,
                        y: 0,
                        scale: 1.5, // "Make the icon bigger little bit"
                        rotate: -360 // Continue counter rotation matching parent
                    }}
                    transition={{
                        // Smooth transition between states
                        duration: 0.8,
                        type: "spring"
                    }}
                    style={{
                        originX: 0.5,
                        originY: 0.5
                    }}
                >
                    <Search className="w-5 h-5" />
                </motion.div>
            </motion.div>
        </div>
    );
}

export interface GeneratedImage {
    id: string;
    url: string;
    prompt: string;
    aspectRatio: string;
    createdAt: Date;
}

interface GeneratorViewProps {
    images: GeneratedImage[];
    isLoading: boolean;
    onDownload: (image: GeneratedImage) => void;
    onEdit: (image: GeneratedImage) => void;
}


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

function LoadingState() {
    const [phase, setPhase] = useState<'spinner' | 'generating' | 'message'>('spinner');

    useEffect(() => {
        // Phase 0: Spinner only (start)
        const timer1 = setTimeout(() => {
            setPhase('generating');
        }, 2000); // 2 seconds

        const timer2 = setTimeout(() => {
            setPhase('message');
        }, 4000); // 2 seconds (2 seconds of "Generating")

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <div className="flex flex-col items-center gap-4 animate-in fade-in duration-500">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-blue-700 animate-spin" />

            {phase === 'generating' && (
                <p className="text-muted-foreground animate-in slide-in-from-bottom-2 fade-in">
                    Generating<AnimatedEllipsis />
                </p>
            )}

            {phase === 'message' && (
                <p className="text-muted-foreground animate-in slide-in-from-bottom-2 fade-in text-center max-w-[250px]">
                    Just a moment, we're getting your image ready!
                </p>
            )}
        </div>
    );
}

export function GeneratorView({ images, isLoading, onDownload, onEdit }: GeneratorViewProps) {
    const [activeImageId, setActiveImageId] = useState<string | null>(null);

    // Default to the newest image if no active image is selected
    const activeImage = activeImageId
        ? images.find(img => img.id === activeImageId)
        : images[0];

    // Update active image if a new image comes in and we were looking at null or the top one
    if (images.length > 0 && !activeImageId && activeImage !== images[0]) {
        // Automatically select the newest one if nothing was explicitly selected
        // setActiveImageId(images[0].id);
        // actually, let's just let activeImage fallback to images[0] naturally
    }

    if (images.length === 0 && !isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-white dark:bg-black border text-muted-foreground p-8 text-center animate-in fade-in zoom-in duration-500 relative">
                <SearchIconAnimation />

                {/* the Rigth angle signs 'Do not remove this code' */}
                {/* top left corner */}
                {/* horizontal */}
                <div className='w-6 h-[1px] bg-black dark:bg-white absolute top-0 left-0'></div>
                {/* vertical */}
                <div className='w-[1px] h-6 bg-black dark:bg-white absolute top-0 left-0'></div>

                {/* bottom riht corner */}
                {/* horizontal */}
                <div className='w-6 h-[1px] bg-black dark:bg-white absolute bottom-0 right-0'></div>
                {/* vertical */}
                <div className='w-[1px] h-6 bg-black dark:bg-white absolute bottom-0 right-0'></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white dark:bg-black p-4 gap-4 animate-in fade-in duration-500">

            {/* Main Preview Area */}
            <div className="flex-1 relative min-h-[300px] flex items-center justify-center bg-white dark:bg-black rounded-none border overflow-hidden shadow-none">

                {isLoading && !activeImage && (
                    <LoadingState />
                )}

                {activeImage && (
                    <>
                        <div className="relative w-full h-full p-4 flex items-center justify-center">
                            <div className="relative w-full h-full max-w-full max-h-full aspect-[4/3] md:aspect-auto">
                                <Image
                                    src={activeImage.url}
                                    alt={activeImage.prompt}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                        </div>

                        {/* Top Overlay Info */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start opacity-0 hover:opacity-100 transition-opacity duration-200">
                            <Badge variant="secondary" className="backdrop-blur-md bg-black/40 text-white border-white/10">
                                {activeImage.aspectRatio}
                            </Badge>
                        </div>

                        {/* Bottom Actions Toolbar */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 shadow-xl transition-all hover:scale-105">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-10 w-10 rounded-full text-white hover:bg-white/20"
                                            onClick={() => onDownload(activeImage)}
                                        >
                                            <Download className="w-5 h-5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent className="rounded-none">Download</TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-10 w-10 active:scale-95 transition-transform rounded-full text-white hover:bg-white/20"
                                            onClick={() => onEdit(activeImage)}
                                        >
                                            <Edit2 className="w-5 h-5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent className="rounded-none">Edit</TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-10 w-10 rounded-full text-white hover:bg-white/20"
                                        >
                                            <Info className="w-5 h-5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent className="rounded-none">
                                        <p className="max-w-[200px] text-xs wrap">{activeImage.prompt}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </>
                )}
            </div>

            {/* History Strip */}
            <div className="h-24 bg-white dark:bg-black rounded-none border p-2">
                <ScrollArea className="w-full h-full">
                    <div className="flex gap-2 h-full">
                        {/* Loading placeholder in history */}
                        {isLoading && (
                            <div className="h-[72px] w-[72px] shrink-0 rounded-none border-2 border-black dark:border-white border-dashed animate-pulse bg-white dark:bg-black flex items-center justify-center">
                                <div className="w-3 h-3 absolute rounded-full border-2 border-primary border-t-blue-700 animate-spin" />
                            </div>
                        )}

                        {images.map((img) => (
                            <button
                                key={img.id}
                                onClick={() => setActiveImageId(img.id)}
                                className={cn(
                                    "relative h-[72px] w-[72px] shrink-0 rounded-none overflow-hidden border-2 transition-all",
                                    (activeImageId === img.id || (!activeImageId && img === images[0]))
                                        ? "border-primary ring-2 ring-primary/20"
                                        : "border-transparent opacity-70 hover:opacity-100"
                                )}
                            >
                                <Image
                                    src={img.url}
                                    alt="History thumbnail"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    );
}
