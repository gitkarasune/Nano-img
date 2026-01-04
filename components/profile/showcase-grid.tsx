import { Globe } from "lucide-react";

export function ShowcaseGrid() {
    return (
        <div className="space-y-4 h-full flex flex-col">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Showcase</h3>

            <div className="flex-1 min-h-[400px] border rounded-xl bg-muted/10 border-dashed flex flex-col items-center justify-center p-12 text-center text-muted-foreground gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Globe className="w-6 h-6 opacity-50" />
                </div>
                <div className="max-w-xs">
                    <p className="font-medium text-foreground">No public showcase yet</p>
                    <p className="text-sm mt-1">
                        Select images from your dashboard to feature them on your profile.
                    </p>
                </div>
            </div>
        </div>
    );
}
