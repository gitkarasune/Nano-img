"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Settings,
    CreditCard,
    Users,
    Activity,
    Key,
    User,
    ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarItems = [
    {
        title: "Account",
        href: "/settings/account",
        icon: User,
        disabled: true // Placeholder
    },
    {
        title: "Preferences",
        href: "/settings",
        icon: Settings,
    },
    {
        title: "Billing",
        href: "/settings/billing",
        icon: CreditCard,
        disabled: true // Placeholder
    },
    {
        title: "Members",
        href: "/settings/members",
        icon: Users,
        disabled: true // Placeholder
    },
    {
        title: "Usage",
        href: "/settings/usage",
        icon: Activity,
        disabled: true // Placeholder
    },
    {
        title: "API Keys",
        href: "/settings/api-keys",
        icon: Key,
        disabled: true // Placeholder
    },
];

export function SettingsSidebar() {
    const pathname = usePathname();

    return (
        <nav className="w-full md:w-[240px] flex flex-col gap-2 shrink-0 h-full md:border-r bg-white dark:bg-black p-4">
            <div className="mb-6">
                <Button variant="ghost" className="pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground" asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to app
                    </Link>
                </Button>
            </div>

            <h2 className="px-2 text-sm font-semibold text-muted-foreground mb-2">Workspace</h2>

            <div className="flex flex-col gap-1">
                {sidebarItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.disabled ? "#" : item.href}
                        className={cn(
                            "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                            pathname === item.href
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                            item.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
                        )}
                    >
                        <item.icon className="w-4 h-4" />
                        {item.title}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
