"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { DocsSidebar } from "@/components/docs/docs-sidebar"

export function MobileDocsNav() {
    const [open, setOpen] = React.useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="mr-4 px-0 text-base text-white hover:bg-transparent hover:text-white/80 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 bg-black text-white border-r border-zinc-800">
                <div className="px-7 pt-4">
                    <a href="/dashboard" className="flex items-center space-x-2 font-bold mb-4 text-white">
                        <span className="font-bold">IMvision</span>
                        <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-400 border border-zinc-700">
                            Docs
                        </span>
                    </a>
                </div>
                <DocsSidebar
                    className="block static h-auto w-full border-none bg-black text-white"
                    onLinkClick={() => setOpen(false)}
                />
            </SheetContent>
        </Sheet>
    )
}
