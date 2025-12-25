'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Loader2, Wand2, Box, Moon, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface GeneratorControlsProps {
    onGenerate: (prompt: string, settings: any) => Promise<void>;
    isLoading: boolean;
}

export function GeneratorControls({ onGenerate, isLoading }: GeneratorControlsProps) {
    const [prompt, setPrompt] = useState('');
    const [packshotMode, setPackshotMode] = useState(false);
    const [realisticShadows, setRealisticShadows] = useState(false);
    const [aspectRatio, setAspectRatio] = useState('1:1');

    const handleEnhancePrompt = () => {
        if (!prompt) return;
        // Mock enhancement logic - normally this would call an LLM
        const enhancements = [
            "highly detailed",
            "8k resolution",
            "cinematic lighting",
            "photorealistic",
            "masterpiece"
        ];
        // simple random addition
        setPrompt((prev) => `${prev}, ${enhancements.join(', ')}`);
        toast.success("Prompt enhanced with AI magic!");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) {
            toast.error("Please enter a prompt");
            return;
        }

        let finalPrompt = prompt;
        if (packshotMode) finalPrompt += ", product photography, clean background, studio lighting, commercial shot";
        if (realisticShadows) finalPrompt += ", realistic hard shadows, ray tracing, depth of field, ambient occlusion";

        await onGenerate(finalPrompt, { aspectRatio });
    };

    return (
        <div className="flex flex-col h-full gap-6 p-1">

            <div className="space-y-4">
                <Label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Advanced Settings</Label>

                <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Box className="h-4 w-4 text-muted-foreground" />
                            <Label htmlFor="packshot" className="font-normal cursor-pointer">Packshot Mode</Label>
                        </div>
                        <Switch id="packshot" checked={packshotMode} onCheckedChange={setPackshotMode} />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Moon className="h-4 w-4 text-muted-foreground" />
                            <Label htmlFor="shadows" className="font-normal cursor-pointer">Realistic Shadows</Label>
                        </div>
                        <Switch id="shadows" checked={realisticShadows} onCheckedChange={setRealisticShadows} />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-normal">Aspect Ratio</Label>
                        <Select value={aspectRatio} onValueChange={setAspectRatio}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select ratio" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1:1">Square (1:1)</SelectItem>
                                <SelectItem value="16:9">Landscape (16:9)</SelectItem>
                                <SelectItem value="9:16">Portrait (9:16)</SelectItem>
                                <SelectItem value="4:3">Standard (4:3)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <Separator />

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-sm font-medium">Create</Label>
                    <form onSubmit={handleSubmit} className="relative">
                        <Textarea
                            placeholder="Describe your image..."
                            className="min-h-[120px] resize-none pr-12 text-md p-4 shadow-sm"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                        />
                        <Button
                            size="icon"
                            variant="ghost"
                            type="button"
                            className="absolute bottom-2 right-2 hover:bg-muted"
                            onClick={handleEnhancePrompt}
                            title="Enhance Prompt"
                        >
                            <Sparkles className="h-4 w-4 text-purple-500" />
                        </Button>
                    </form>
                    <p className="text-xs text-muted-foreground flex justify-between">
                        <span>Press Enter to generate</span>
                        <span className="text-xs">{prompt.length} chars</span>
                    </p>
                </div>

                <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full h-10 font-medium"
                    size="lg"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Wand2 className="mr-2 h-4 w-4" />
                            Generate Image
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
