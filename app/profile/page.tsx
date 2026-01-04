"use client";

import { ProfileHeader } from "@/components/profile/profile-header";
import { ActivityGraph } from "@/components/profile/activity-graph";
import { ShowcaseGrid } from "@/components/profile/showcase-grid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
            <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">

                {/* Navigation Back */}
                <Button variant="ghost" className="pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground" asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to app
                    </Link>
                </Button>

                <ProfileHeader />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
                    {/* Check v0 reference: Activity is usually wide, Showcase can be below or side.
                        Image shows Activity next to textual stats, or below profile.
                        Let's put Activity wide, then Showcase full width or grid.
                     */}

                    <div className="lg:col-span-3">
                        <ActivityGraph />
                    </div>

                    <div className="lg:col-span-3">
                        <ShowcaseGrid />
                    </div>
                </div>
            </div>
        </div>
    );
}
