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
                <Button variant="ghost" className="mr-4 px-0 text-white hover:bg-transparent hover:text-white/80 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden rounded-none">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="pr-0 bg-black text-white">
                <DocsSidebar
                    className="block static h-auto w-full border-none bg-black text-white"
                    onLinkClick={() => setOpen(false)}
                />
            </SheetContent>
        </Sheet>
    )
}
