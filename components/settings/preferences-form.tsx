"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function PreferencesForm() {
    const { setTheme, theme } = useTheme();
    const [suggestions, setSuggestions] = React.useState(true);
    const [soundNotifications, setSoundNotifications] = React.useState(true);
    const [chatPosition, setChatPosition] = React.useState("left");
    const [instructions, setInstructions] = React.useState("");

    const handleSave = () => {
        toast.success("Preferences saved successfully");
    };

    return (
        <div className="max-w-2xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Preferences</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Manage your interface and interaction settings.
                </p>
            </div>

            <div className="space-y-6">
                {/* General Section */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">General</h3>

                    <div className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                        <div className="space-y-0.5">
                            <Label className="text-base">Suggestions</Label>
                            <p className="text-sm text-muted-foreground">
                                Get relevant in-chat suggestions to refine your project.
                            </p>
                        </div>
                        <Switch
                            checked={suggestions}
                            onCheckedChange={setSuggestions}
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                        <div className="space-y-0.5">
                            <Label className="text-base">Sound Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                                Play a sound when generation is finished and window is not focused.
                            </p>
                        </div>
                        <Switch
                            checked={soundNotifications}
                            onCheckedChange={setSoundNotifications}
                        />
                    </div>

                    <div className="space-y-3 p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                        <div className="flex items-center justify-between">
                            <Label className="text-base">Chat Position</Label>
                            <Select value={chatPosition} onValueChange={setChatPosition}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select position" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="left">Left</SelectItem>
                                    <SelectItem value="right">Right</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Choose which side of the screen the chat interface appears on.
                        </p>
                    </div>

                    <div className="space-y-3 p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                        <Label className="text-base">Custom Instructions</Label>
                        <p className="text-sm text-muted-foreground mb-2">
                            Manage your custom user rules or preferences for the AI.
                        </p>
                        <Textarea
                            placeholder="e.g., Always generate images with a 16:9 aspect ratio unless specified..."
                            className="min-h-[120px] resize-none bg-muted/50"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                        />
                        <div className="flex justify-end pt-2">
                            <Button onClick={handleSave} size="sm">Save</Button>
                        </div>
                    </div>
                </div>

                {/* Interface Section */}
                <div className="space-y-4 pt-4">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Interface and Theme</h3>

                    <div className="space-y-3 p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                        <div className="flex items-center justify-between">
                            <Label className="text-base">Theme</Label>
                            <div className="flex items-center gap-2 border rounded-md p-1 bg-muted/50">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={cn("h-7 w-7 rounded-sm", theme === 'light' && "bg-background shadow-sm")}
                                    onClick={() => setTheme("light")}
                                >
                                    <Sun className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={cn("h-7 w-7 rounded-sm", theme === 'system' && "bg-background shadow-sm")}
                                    onClick={() => setTheme("system")}
                                >
                                    <Monitor className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={cn("h-7 w-7 rounded-sm", theme === 'dark' && "bg-background shadow-sm")}
                                    onClick={() => setTheme("dark")}
                                >
                                    <Moon className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Choose your preferred color scheme.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
