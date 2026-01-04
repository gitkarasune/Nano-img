"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { docsConfig } from "./config";

export function DocsSidebar({ className, onLinkClick }: { className?: string; onLinkClick?: () => void }) {
    const pathname = usePathname();

    return (
        <aside className={cn("fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block bg-black", className)}>
            <div className="h-full overflow-y-auto py-6 pr-4 lg:py-8">
                {docsConfig.items.map((item, index) => (
                    <div key={index} className="pb-8">
                        <h4 className="mb-2 px-2 text-sm font-semibold text-white tracking-tight">
                            {item.title}
                        </h4>
                        {item.items?.length && (
                            <div className="grid grid-flow-row auto-rows-max text-sm space-y-0.5">
                                {item.items.map((subItem, subIndex) => {
                                    const isActive = subItem.href === pathname;
                                    return (
                                        <Link
                                            key={subIndex}
                                            href={subItem.href}
                                            onClick={onLinkClick}
                                            className={cn(
                                                "group flex w-full items-center rounded-md px-2 py-1.5 transition-all text-muted-foreground hover:text-white",
                                                isActive
                                                    ? "font-medium text-white bg-zinc-900/50"
                                                    : "text-zinc-500 hover:bg-zinc-900/20"
                                            )}
                                        >
                                            {subItem.title}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </aside>
    );
}
