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
        <div className="flex min-h-screen flex-col bg-black text-white selection:bg-zinc-800 selection:text-white">
            <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
                <div className="container flex h-14 items-center pl-4 lg:pl-10">
                    <MobileDocsNav />
                    <div className="flex items-center gap-2">
                        {/* Logo can be improved here, keeping text for now but styling it */}
                        <a href="/dashboard" className="flex items-center space-x-2 font-bold text-lg tracking-tight">
                            IMvision
                        </a>
                        <span className="ml-2 rounded-full bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-400 border border-zinc-700">
                            Docs
                        </span>
                    </div>
                    <div className="ml-auto flex items-center gap-4 text-sm">
                        <a href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">
                            Dashboard
                        </a>
                    </div>
                </div>
            </header>

            <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 pl-4 lg:pl-10">
                <DocsSidebar />
                <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_200px] xl:gap-8">
                    <div className="mx-auto w-full min-w-0">
                        {children}
                    </div>

                    {/* Right TOC / Info Column */}
                    <div className="hidden text-sm xl:block">
                        <div className="sticky top-20">
                            <h4 className="font-semibold text-sm mb-4 text-white flex items-center gap-2">
                                On this page
                            </h4>
                            <ul className="space-y-3 text-zinc-400 text-sm">
                                <li>
                                    <a href="#" className="hover:text-white transition-colors block border-l-2 border-transparent hover:border-white pl-3 -ml-3">
                                        Overview
                                    </a>
                                </li>
                                {/* Additional static links or dynamic ones could go here */}
                            </ul>

                            <div className="mt-8 pt-6 border-t border-zinc-900">
                                <h4 className="font-semibold text-sm mb-4 text-white">
                                    Resources
                                </h4>
                                <ul className="space-y-3 text-zinc-400 text-sm">
                                    <li>
                                        <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                                            API Reference
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/gitkarasune/img-nano" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                                            GitHub
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
