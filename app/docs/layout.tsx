import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { MobileDocsNav } from "@/components/docs/mobile-nav";
import { AppHeader } from "@/components/dashboard/app-header";
import { Link } from "lucide-react"; // Just a dummy import to ensure creating file works if no errors, but Wait, AppHeader normally requires props.
// I need to wrap AppHeader or create a DocsHeader.
// Actually the user wants "Application Header" but maybe simpler for docs?
// Let's reuse AppHeader, but it has props `chatPosition` which are stateful in Dashboard.
// For docs, we don't need chat position.
// I should create a simpler `DocsHeader` or just use a Navbar.
// Or effectively render a Layout that enables the sidebar.

// Let's make a wrapper for the Docs Layout.

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-black text-black dark:text-white">
            {/* We can reproduce a static header or simplified one */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center pl-4">
                    <MobileDocsNav />
                    <div className="mr-4 flex">
                        <a href="/dashboard" className="mr-6 flex items-center space-x-2 font-bold">
                            IMvision
                        </a>
                    </div>
                </div>
            </header>

            <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 pl-4">
                <DocsSidebar />
                <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
                    <div className="mx-auto w-full min-w-0">
                        {children}
                    </div>
                    {/* Table of Contents Column (optional, placeholder for now) */}
                    <div className="hidden text-sm xl:block pl-4 border-l">
                        <div className="sticky top-16 -mt-10 pt-4">
                            {/* 
                  On This Page logic would go here. 
                  For now we can hardcode or just leave empty column for layout fidelity 
               */}
                            <h4 className="font-medium text-sm mb-2">On This Page</h4>
                            <ul className="space-y-2 text-muted-foreground text-xs">
                                <li><a href="#" className="hover:text-foreground">Overview</a></li>
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
