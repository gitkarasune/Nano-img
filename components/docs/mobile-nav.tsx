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
                <Button variant="ghost" className="mr-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <div className="px-7">
                    <a href="/dashboard" className="flex items-center space-x-2 font-bold mb-4">
                        IMvision
                    </a>
                </div>
                <DocsSidebar
                    className="block static h-auto w-full border-none"
                    onLinkClick={() => setOpen(false)}
                />
            </SheetContent>
        </Sheet>
    )
}
