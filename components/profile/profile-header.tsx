"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";
import { CalendarDays, Link as LinkIcon, MapPin } from "lucide-react";
import { format } from "date-fns";

export function ProfileHeader() {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    if (!user) return null;

    return (
        <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between animate-in fade-in duration-500">
            <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background shadow-xl">
                    <AvatarImage src={user.image || ""} />
                    <AvatarFallback className="text-2xl md:text-4xl bg-primary/10">
                        {user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                </Avatar>

                <div className="space-y-4 pt-2">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{user.name}</h1>
                        <p className="text-muted-foreground">@{user.name?.toLowerCase().replace(/\s+/g, '')}</p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <CalendarDays className="w-4 h-4" />
                            Joined {format(new Date(user.createdAt), 'MMMM yyyy')}
                        </div>
                        {/* Mock data for visuals */}
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            Earth, 616
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="flex flex-col p-3 rounded-lg bg-muted/50 w-24 border">
                            <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Prompts</span>
                            <span className="text-2xl font-bold">92</span>
                        </div>
                        <div className="flex flex-col p-3 rounded-lg bg-muted/50 w-24 border">
                            <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Images</span>
                            <span className="text-2xl font-bold">148</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
                <Button variant="outline" className="w-full md:w-auto">Edit Profile</Button>
                <Button variant="outline" className="w-full md:w-auto">Set Profile to Private</Button>
            </div>
        </div>
    );
}
