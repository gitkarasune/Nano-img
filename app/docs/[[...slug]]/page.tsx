"use client"

import { use } from "react";

// Simple MDX-like content map
const docContent: Record<string, { title: string; content: React.ReactNode }> = {
    // Introduction
    "index": {
        title: "Introduction",
        content: (
            <div className="space-y-8 pt-4">
                <section className="space-y-4">
                    <p className="">
                        IMvision is an AI image generation platform designed for speed, creativity, and collaboration. Built on the bleeding edge of web technology, it leverages Google&apos;s Gemini Flash 2.5 models via OpenRouter to deliver high-fidelity visuals with near-zero latency.
                    </p>
                    <p className="p-4 text-sm border-l-4 border-primary bg-muted/40 italic">
                        IMvision isn&apos;t just a tool; it&apos;s a creative partner that keeps up with your imagination.
                    </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border rounded-none shadow-sm hover:shadow-md transition-shadow">
                        <h3 className=" mb-2 flex items-center gap-2">Real-time Performance</h3>
                        <p className="text-sm">
                            Powered by optimized API streaming and Next.js 15 App Router, generations start appearing the moment you submit. No queues, no waiting rooms.
                        </p>
                    </div>
                    <div className="p-6 border rounded-none shadow-sm hover:shadow-md transition-shadow">
                        <h3 className=" mb-2 flex items-center gap-2">Enterprise-Grade Security</h3>
                        <p className="text-sm">
                            Built with Better-Auth for robust authentication, secure session management, and encrypted data handling at every layer.
                        </p>
                    </div>
                    <div className="p-6 border rounded-none shadow-sm hover:shadow-md transition-shadow">
                        <h3 className=" mb-2 flex items-center gap-2">Granular Control</h3>
                        <p className="text-sm">
                            From Packshot Mode for e-commerce to Realistic Shadows for artistic depth, control every aspect of your output.
                        </p>
                    </div>
                    <div className="p-6 border rounded-none shadow-sm hover:shadow-md transition-shadow">
                        <h3 className=" mb-2 flex items-center gap-2">Historical Persistence</h3>
                        <p className="text-sm">
                            Never lose a masterpiece. Every prompt, setting, and resulting image is automatically indexed and stored in your dedicated PostgreSQL database.
                        </p>
                    </div>
                </section>
            </div>
        )
    },

    // Installation
    "installation": {
        title: "Installation & Setup",
        content: (
            <div className="space-y-8 pt-4">
                <section className="space-y-4">
                    <p className="">
                        Setting up IMvision locally allows you to contribute to the codebase or run your own private instance. This guide covers everything from prerequisites to running the development server.
                    </p>
                </section>

                <section className="space-y-4">
                    <h3 className="text-lg">Prerequisites</h3>
                    <p className="text-sm ">Ensure your environment meets these requirements before proceeding.</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-2 p-3 border rounded-none">
                            <span className="text-sm">Required for Next.js 15 features.</span>
                        </li>
                        <li className="flex items-start gap-2 p-3 border rounded-none">
                            <span className="text-sm">A connection string of Neon</span>
                        </li>
                        <li className="flex items-start gap-2 p-3 border rounded-none">
                            <span className="text-sm">Access to Gemini models.</span>
                        </li>
                        <li className="flex items-start gap-2 p-3 border rounded-none">
                            <span className="text-sm">OAuth credentials for social login.</span>
                        </li>
                    </ul>
                </section>

                <section className="space-y-6 mt-20">
                    <h3 className="text-lg">Step-by-Step Guide</h3>

                    <div className="space-y-2">
                        <h4 className="font-medium">1. Clone the Repository</h4>
                        <pre className="p-4 border rounded-none text-zinc-50 overflow-x-auto text-sm font-mono">
                            <code>git clone https://github.com/gitkarasune/im-vision.git
                                </code>
                        </pre>
                        <pre className="p-4 border rounded-none text-zinc-50 overflow-x-auto text-sm font-mono">
                            <code>cd im-vision
                                </code>
                        </pre>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-medium">2. Install Dependencies</h4>
                        <p className="text-sm text-muted-foreground">We recommend using npm, but pnpm or yarn are also supported.</p>
                        <pre className="p-4 border rounded-none text-zinc-50 overflow-x-auto text-sm font-mono">
                            <code>npm install</code>
                        </pre>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-medium">3. Environment Configuration</h4>
                        <p className="text-sm text-muted-foreground">Copy the example file and fill in your secrets.</p>
                        <pre className="p-4 border rounded-none text-zinc-50 overflow-x-auto text-sm font-mono">
                            <code>cp env.example .env</code>
                        </pre>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-medium">4. Database Setup</h4>
                        <p className="text-sm text-muted-foreground">Push the schema to your Neon database.</p>
                        <pre className="p-4 border rounded-none text-zinc-50 overflow-x-auto text-sm font-mono">
                            <code>npx drizzle-kit push</code>
                        </pre>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-medium">5. Run Development Server</h4>
                        <pre className="p-4 border rounded-none text-zinc-50 overflow-x-auto text-sm font-mono">
                            <code>npm run dev</code>
                        </pre>
                        <p className="text-sm mt-2">
                            The application will be available at <code className=" px-1 rounded-none">http://localhost:3000</code>.
                        </p>
                    </div>
                </section>
            </div>
        )
    },
};

// Helper for default/generic pages
function getGenericContent(slug: string) {
    const title = slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    return {
        title,
        content: (
            <div className="space-y-4 pt-2">
                <p className="">Documentation for <i>{title}</i> is coming soon.</p>
                <div className="p-4 border border-dashed rounded-none text-center text-sm">
                    Detailed guide for {title} will be available in the next update.
                </div>
            </div>
        )
    };
}


export default function DocsPage({ params }: { params: Promise<{ slug?: string[] }> }) {
    // Unwrap params using React.use()
    const resolvedParams = use(params);
    const slug = resolvedParams.slug ? resolvedParams.slug.join("/") : "index";
    const data = docContent[slug] || getGenericContent(slug);

    return (
        <div className="space-y-4 max-w-3xl">
            <h1 className="scroll-m-20 text-2xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {data.title}
            </h1>
            <div className="prose prose-zinc prose-invert max-w-none pb-12 dark:prose-headings:text-white dark:prose-p:text-zinc-400 dark:prose-strong:text-white dark:prose-code:text-zinc-200 dark:prose-li:text-zinc-400">
                {data.content}
            </div>
        </div>
    );
}
