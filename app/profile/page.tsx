"use client";

import { ProfileHeader } from "@/components/profile/profile-header";
import { ShowcaseGrid } from "@/components/profile/showcase-grid";

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
            <div className="max-w-7xl mx-auto p-2 md:p-6 space-y-8">

                <ProfileHeader />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
                    <div className="lg:col-span-3">
                        <ShowcaseGrid />
                    </div>
                </div>
            </div>
        </div>
    );
}
