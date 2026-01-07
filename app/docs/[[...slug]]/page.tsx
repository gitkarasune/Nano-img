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
                        IMvision is a next-generation AI image generation platform designed for speed, creativity, and collaboration. Built on the bleeding edge of web technology, it leverages Google&apos;s Gemini Flash 2.5 models via OpenRouter to deliver high-fidelity visuals with near-zero latency.
                    </p>
                    <p className="p-4 text-sm border-l-4 border-primary bg-muted/40 italic">
                        IMvision isn&apos;t just a tool; itapos;s a creative partner that keeps up with your imagination.
                    </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border rounded-none shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">Real-time Performance</h3>
                        <p className="text-sm text-muted-foreground">
                            Powered by optimized API streaming and Next.js 15 App Router, generations start appearing the moment you submit. No queues, no waiting rooms.
                        </p>
                    </div>
                    <div className="p-6 border rounded-none shadow-sm hover:shadow-md transition-shadow">
                        <h3 className=" mb-2 flex items-center gap-2">Enterprise-Grade Security</h3>
                        <p className="text-sm text-muted-foreground">
                            Built with Better-Auth for robust authentication, secure session management, and encrypted data handling at every layer.
                        </p>
                    </div>
                    <div className="p-6 border rounded-none shadow-sm hover:shadow-md transition-shadow">
                        <h3 className=" mb-2 flex items-center gap-2">Granular Control</h3>
                        <p className="text-sm text-muted-foreground">
                            From Packshot Mode for e-commerce to Realistic Shadows for artistic depth, control every aspect of your output.
                        </p>
                    </div>
                    <div className="p-6 border rounded-none shadow-sm hover:shadow-md transition-shadow">
                        <h3 className=" mb-2 flex items-center gap-2">Historical Persistence</h3>
                        <p className="text-sm text-muted-foreground">
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
                            <span className="text-primary">Node.js 18+:</span>
                            <span className="text-sm">Required for Next.js 15 features.</span>
                        </li>
                        <li className="flex items-start gap-2 p-3 border rounded-none">
                            <span className="text-primary">PostgreSQL:</span>
                            <span className="text-sm">A connection string (e.g., Neon, Supabase, or local).</span>
                        </li>
                        <li className="flex items-start gap-2 p-3 border rounded-none">
                            <span className="text-primary">OpenRouter Key:</span>
                            <span className="text-sm">Access to Gemini models.</span>
                        </li>
                        <li className="flex items-start gap-2 p-3 border rounded-none">
                            <span className="text-primary">Google Cloud:</span>
                            <span className="text-sm">OAuth credentials for social login.</span>
                        </li>
                    </ul>
                </section>

                <section className="space-y-6 mt-20">
                    <h3 className="text-lg">Step-by-Step Guide</h3>

                    <div className="space-y-2">
                        <h4 className="font-medium">1. Clone the Repository</h4>
                        <pre className="p-4 border rounded-none text-zinc-50 overflow-x-auto text-sm font-mono">
                            <code>git clone https://github.com/gitkarasune/img-nano.git
                                cd im-vision</code>
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
                        <p className="text-sm text-muted-foreground">Push the Prisma schema to your database.</p>
                        <pre className="p-4 border rounded-none text-zinc-50 overflow-x-auto text-sm font-mono">
                            <code>npx prisma db push</code>
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

    // Authentication
    "authentication": {
        title: "Authentication System",
        content: (
            <div className="space-y-8 pt-4">
                <section className="space-y-4">
                    <p className="">
                        Security is paramount. IMvision leverages Better-Auth, a cutting-edge authentication library designed for TypeScript and Next.js. It provides a comprehensive, type-safe solution that handles sessions, cookies, and OAuth providers with ease.
                    </p>
                </section>

                <section className="space-y-6">
                    <h3 className="text-lg">Core Architecture</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <h4 className="font-medium">Session Management</h4>
                            <p className="text-sm">
                                Sessions are stateless on the server side but persisted in the database for control. Clients receive HTTP-only, secure, same-site cookies that are automatically rotated to prevent session hijacking.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-medium">Type Safety</h4>
                            <p className="text-sm">
                                Unlike traditional auth solutions, Better-Auth provides end-to-end type safety. The user object in your component exactly matches the database schema, eliminating `any` types and runtime errors.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h3 className="text-lg">Supported Methods</h3>
                    <ul className="space-y-4">
                        <li className="p-4 border rounded-none">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-2 py-1 rounded-none text-xs border uppercase">Primary</span>
                                <h4 className="">Email & Password</h4>
                            </div>
                            <p className="text-sm">
                                Standard credential flow with bcrypt hashing. Includes built-in support for password reset and email verification workflows (configurable).
                            </p>
                        </li>
                        <li className="p-4 border rounded-none">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-2 py-1 rounded-none text-xs border uppercase">OAuth</span>
                                <h4 className="">Google Integration</h4>
                            </div>
                            <p className="text-sm">
                                One-click sign-in using Google OAuth 2.0. This flow automatically provisions a user account and links it to the verified email address.
                            </p>
                        </li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h3 className="text-lg">Implementation Details</h3>
                    <p className="text-sm ">
                        The auth client is initialized in `lib/auth-client.ts`. To use it in a component:
                    </p>
                    <pre className="p-4 border rounded-none overflow-x-auto text-sm font-mono">
                        {`import { useSession } from "@/lib/auth-client";

export default function UserProfile() {
  const { data: session, isPending } = useSession();
  
  if (isPending) return <Skeleton />;
  if (!session) return <LoginForm />;
  
  return <div>Welcome, {session.user.name}</div>;
}`}
                    </pre>
                </section>
            </div>
        )
    },

    // Image Generation
    "image-generation": {
        title: "Image Generation Engine",
        content: (
            <div className="space-y-8 pt-4">
                <section className="space-y-4">
                    <p className="text-muted-foreground">
                        IMvision&apos;s generation engine is the heart of the platform. It abstracts the complexity of prompt construction, API communication, and error handling into a seamless UI.
                    </p>
                </section>

                <section className="space-y-6">
                    <h3 className="text-2xl font-semibold tracking-tight">The Pipeline</h3>
                    <div className="relative border-l-2 border-muted pl-6 space-y-8">
                        <div className="relative">
                            <div className="absolute -left-[31px] bg-background border-2 border-primary w-4 h-4 rounded-full mt-1.5"></div>
                            <h4 className="font-semibold text-lg">1. Input Normalization</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                                Raw user prompts are sanitized and enriched. If Prompt Enhancement is active, a secondary LLM call (transparent to the user) expands the prompt with stylistic descriptors.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[31px] bg-background border-2 border-muted w-4 h-4 rounded-full mt-1.5"></div>
                            <h4 className="font-semibold text-lg">2. Configuration Injection</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                                System parameters are injected based on user toggles:
                            </p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 ml-2">
                                <li><strong>Packshot Mode:</strong> Enforces white backgrounds, high contrast, and studio lighting keywords.</li>
                                <li><strong>Realistic Shadows:</strong> Adds ray-tracing and ambient occlusion tokens to the prompt.</li>
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[31px] bg-background border-2 border-muted w-4 h-4 rounded-full mt-1.5"></div>
                            <h4 className="font-semibold text-lg">3. API Transmission</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                                The payload is sent to OpenRouter targeting the `google/gemini-flash-2.5` model. This model is chosen for its superior understanding of spatial relationships and text rendering.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[31px] bg-background border-2 border-green-500 w-4 h-4 rounded-full mt-1.5"></div>
                            <h4 className="font-semibold text-lg">4. Rendering & Persistence</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                                The Base64 response is rendered immediately on the canvas. Simultaneously, a background job uploads the image to blob storage (or saves the Base64 deeply) and records the transaction in PostgreSQL.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h3 className="text-2xl font-semibold tracking-tight">Aspect Ratios</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 border rounded text-center">
                            <div className="font-bold text-lg">1:1</div>
                            <div className="text-xs text-muted-foreground">Square</div>
                            <div className="text-xs text-muted-foreground">Social Data</div>
                        </div>
                        <div className="p-4 border rounded text-center">
                            <div className="font-bold text-lg">16:9</div>
                            <div className="text-xs text-muted-foreground">Landscape</div>
                            <div className="text-xs text-muted-foreground">Web/Video</div>
                        </div>
                        <div className="p-4 border rounded text-center">
                            <div className="font-bold text-lg">9:16</div>
                            <div className="text-xs text-muted-foreground">Portrait</div>
                            <div className="text-xs text-muted-foreground">Stories</div>
                        </div>
                        <div className="p-4 border rounded text-center">
                            <div className="font-bold text-lg">4:3</div>
                            <div className="text-xs text-muted-foreground">Classic</div>
                            <div className="text-xs text-muted-foreground">Print</div>
                        </div>
                    </div>
                </section>
            </div>
        )
    },

    // Image Editing
    "image-editing": {
        title: "Image Editing Suite",
        content: (
            <div className="space-y-8 pt-4">
                <section className="space-y-4">
                    <p className="text-muted-foreground">
                        IMvision includes a powerful client-side editing suite built on top of `react-easy-crop`. This allows users to refine generated assets before downloading or sharing them.
                    </p>
                </section>

                <section className="space-y-6">
                    <h3 className="text-2xl font-semibold tracking-tight">Capabilities</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <li className="p-4 border rounded-lg">
                            <h4 className="font-bold mb-2">Lossless Cropping</h4>
                            <p className="text-sm text-muted-foreground">
                                Adjust the framing without re-generating. Supports fixed aspect ratios or freeform cropping.
                            </p>
                        </li>
                        <li className="p-4 border rounded-lg">
                            <h4 className="font-bold mb-2">Rotation & Straightening</h4>
                            <p className="text-sm text-muted-foreground">
                                Correct horizon lines or rotate images 90 degrees with precision sliders (0.1 degree increments).
                            </p>
                        </li>
                        <li className="p-4 border rounded-lg">
                            <h4 className="font-bold mb-2">Zoom & Pan</h4>
                            <p className="text-sm text-muted-foreground">
                                Focus on specific details. The viewport resolution is dynamically maintained to ensure clarity.
                            </p>
                        </li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h3 className="text-2xl font-semibold tracking-tight">Future Roadmap</h3>
                    <p className="text-sm text-muted-foreground">
                        We are actively working on server-side Inpainting and Outpainting features, which will allow for AI-driven modifications of existing images.
                    </p>
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
