'use client';

import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Area, Point } from 'react-easy-crop';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RotateCw, ZoomIn, Check, X } from 'lucide-react';
import type { GeneratedImage } from '../dashboard/generator-view';
import { toast } from 'sonner';

interface ImageEditorModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    image: GeneratedImage | null;
    onSave: (editedUrl: string) => void;
}

export function ImageEditorModal({ open, onOpenChange, image, onSave }: ImageEditorModalProps) {
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
            image.src = url;
        });

    async function getCroppedImg(
        imageSrc: string,
        pixelCrop: Area,
        rotation = 0
    ): Promise<string> {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return '';
        }

        const maxSize = Math.max(image.width, image.height);
        const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

        // set each dimensions to double largest dimension to allow for a safe area for the
        // image to rotate in without being clipped by canvas context
        canvas.width = safeArea;
        canvas.height = safeArea;

        // translate canvas context to a central location on image to allow rotating around the center.
        ctx.translate(safeArea / 2, safeArea / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-safeArea / 2, -safeArea / 2);

        // draw rotated image and store data.
        ctx.drawImage(
            image,
            safeArea / 2 - image.width * 0.5,
            safeArea / 2 - image.height * 0.5
        );

        const data = ctx.getImageData(0, 0, safeArea, safeArea);

        // set canvas width to final desired crop size - this will clear existing context
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        // paste generated rotate image with correct offsets for x,y crop values.
        ctx.putImageData(
            data,
            Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
            Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
        );

        // As Base64 string
        return canvas.toDataURL('image/png');
    }


    const handleSave = async () => {
        if (!image || !croppedAreaPixels) return;

        try {
            const croppedImage = await getCroppedImg(
                image.url,
                croppedAreaPixels,
                rotation
            );
            onSave(croppedImage);
            onOpenChange(false);
            toast.success("Image edited successfully!");
        } catch (e) {
            console.error(e);
            toast.error("Failed to save edited image");
        }
    };

    if (!image) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0 gap-0 overflow-hidden">
                <DialogHeader className="px-6 py-4 border-b">
                    <DialogTitle>Edit Image</DialogTitle>
                </DialogHeader>

                <div className="relative flex-1 bg-black/90 w-full overflow-hidden">
                    <div className="absolute inset-0">
                        <Cropper
                            image={image.url}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            aspect={4 / 3}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            onRotationChange={setRotation}
                        />
                    </div>
                </div>

                <div className="p-6 bg-background border-t space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-xs font-semibold uppercase text-muted-foreground">Zoom</Label>
                                <span className="text-xs text-muted-foreground">{zoom.toFixed(1)}x</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ZoomIn className="h-4 w-4 text-muted-foreground" />
                                <Slider
                                    value={[zoom]}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    onValueChange={(v) => setZoom(v[0])}
                                    className="flex-1"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-xs font-semibold uppercase text-muted-foreground">Rotation</Label>
                                <span className="text-xs text-muted-foreground">{rotation}°</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <RotateCw className="h-4 w-4 text-muted-foreground" />
                                <Slider
                                    value={[rotation]}
                                    min={0}
                                    max={360}
                                    step={1}
                                    onValueChange={(v) => setRotation(v[0])}
                                    className="flex-1"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} className="w-full sm:w-auto">
                            <Check className="mr-2 h-4 w-4" /> Save Changes
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
