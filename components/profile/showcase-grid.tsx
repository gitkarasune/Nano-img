import { Globe } from "lucide-react";

export function ShowcaseGrid() {
    return (
        <div className="space-y-4 h-full flex flex-col">

            <div className="flex-1 min-h-[400px] border rounded-none border-dashed flex flex-col items-center justify-center p-12 text-center text-muted-foreground gap-4">
                <div className="w-12 h-12 rounded-full border flex items-center justify-center">
                    <Globe className="w-6 h-6" />
                </div>
                <div className="max-w-xs">
                    <p className="text-foreground">No public showcase yet</p>
                    <p className="text-sm mt-1">
                        Select images from your dashboard to feature them on your profile.
                    </p>
                </div>
            </div>
        </div>
    );
}
