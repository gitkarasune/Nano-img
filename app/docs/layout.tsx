import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { MobileDocsNav } from "@/components/docs/mobile-nav";

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
                        <a href="/dashboard" className="flex items-center space-x-2 text-lg">
                            IMvision
                        </a>
                        <span className="ml-2 rounded-none bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-400 border border-zinc-700">
                            Docs
                        </span>
                    </div>
                </div>
            </header>

            <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 pl-4 lg:pl-10">
                <DocsSidebar />
                <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_200px] xl:gap-8">
                    <div className="mx-auto w-full min-w-0">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
