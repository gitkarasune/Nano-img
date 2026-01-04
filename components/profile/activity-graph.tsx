"use client";

import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ActivityGraph() {
    // Generate a mock grid of 365 days (approx 52 weeks x 7 days)
    // Darker colors = more activity
    const weeks = 52;
    const daysPerWeek = 7;

    // Create a deterministic visual pattern
    const generateActivity = (i: number) => {
        // Just random visual noise for demo
        const val = Math.random();
        if (val > 0.9) return "bg-primary";
        if (val > 0.7) return "bg-primary/60";
        if (val > 0.5) return "bg-primary/30";
        if (val > 0.3) return "bg-primary/10"; // Very light
        return "bg-muted-foreground/10"; // Empty
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Activity</h3>
                <span className="text-xs text-muted-foreground">Last 12 months</span>
            </div>

            <div className="p-4 border rounded-xl bg-card/50 overflow-x-auto">
                <div className="flex gap-1 min-w-max">
                    {Array.from({ length: weeks }).map((_, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-1">
                            {Array.from({ length: daysPerWeek }).map((_, dayIndex) => (
                                <TooltipProvider key={dayIndex}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <div
                                                className={cn(
                                                    "w-3 h-3 rounded-[2px] transition-colors hover:ring-1 hover:ring-foreground/50",
                                                    generateActivity(weekIndex * 7 + dayIndex)
                                                )}
                                            />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="text-xs">
                                                {Math.floor(Math.random() * 10)} generations on {new Date().toLocaleDateString()}
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
