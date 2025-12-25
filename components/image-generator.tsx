'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import Image from 'next/image';
import { Loader2, Download } from 'lucide-react';

export function ImageGenerator() {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!prompt.trim()) {
            toast.error('Please enter a prompt');
            return;
        }

        setIsLoading(true);
        setImageUrl(null);

        try {
            const response = await fetch('/api/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate image');
            }

            setImageUrl(data.imageUrl);
            toast.success('Image generated successfully!');
        } catch (error) {
            console.error('Generation error:', error);
            toast.error(error instanceof Error ? error.message : 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = async () => {
        if (!imageUrl) return;

        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `generated-image-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Download error:', error);
            toast.error('Failed to download image');
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>AI Image Generator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <form onSubmit={handleGenerate} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="prompt">Prompt</Label>
                        <div className="flex gap-2">
                            <Input
                                id="prompt"
                                placeholder="A futuristic city with flying cars..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                disabled={isLoading}
                                className="flex-1"
                            />
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating
                                    </>
                                ) : (
                                    'Generate'
                                )}
                            </Button>
                        </div>
                    </div>
                </form>

                <div className="min-h-[300px] w-full rounded-lg border bg-muted/50 flex items-center justify-center overflow-hidden relative">
                    {isLoading ? (
                        <div className="flex flex-col items-center gap-2">
                            <Skeleton className="h-[300px] w-full absolute inset-0" />
                            <div className="z-10 flex flex-col items-center gap-2 text-muted-foreground">
                                <Loader2 className="h-8 w-8 animate-spin" />
                                <p>Creating your masterpiece...</p>
                            </div>
                        </div>
                    ) : imageUrl ? (
                        <div className="relative w-full h-full min-h-[400px]">
                            <Image
                                src={imageUrl}
                                alt={prompt}
                                fill
                                className="object-contain"
                                unoptimized // Since it's an external URL that might not be configured in next.config.js
                            />
                        </div>
                    ) : (
                        <div className="text-muted-foreground text-center p-4">
                            Enter a prompt above to generate an image
                        </div>
                    )}
                </div>
            </CardContent>
            {imageUrl && (
                <CardFooter className="justify-end">
                    <Button variant="outline" onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}
