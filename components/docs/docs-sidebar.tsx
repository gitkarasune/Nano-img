"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { docsConfig } from "./config";

export function DocsSidebar({ className, onLinkClick }: { className?: string; onLinkClick?: () => void }) {
    const pathname = usePathname();

    return (
        <aside className={cn("fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block border-r bg-white dark:bg-black", className)}>
            <div className="h-full overflow-y-auto py-6 pr-6 lg:py-8 pl-4">
                {docsConfig.items.map((item, index) => (
                    <div key={index} className="pb-4">
                        <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                            {item.title}
                        </h4>
                        {item.items?.length && (
                            <div className="grid grid-flow-row auto-rows-max text-sm">
                                {item.items.map((subItem, subIndex) => (
                                    <Link
                                        key={subIndex}
                                        href={subItem.href}
                                        onClick={onLinkClick}
                                        className={cn(
                                            "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
                                            subItem.href === pathname
                                                ? "font-medium text-foreground underline"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        {subItem.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </aside>
    );
}
