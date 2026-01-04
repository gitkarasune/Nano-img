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
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        <strong>IMvision</strong> is a next-generation AI image generation platform designed for speed, creativity, and collaboration. Built on the bleeding edge of web technology, it leverages Google's <strong>Gemini Flash 2.5</strong> models via OpenRouter to deliver high-fidelity visuals with near-zero latency.
                    </p>
                    <div className="p-4 border-l-4 border-primary bg-muted/40 italic">
                        "IMvision isn't just a tool; it's a creative partner that keeps up with your imagination."
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border rounded-xl bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">⚡ Real-time Performance</h3>
                        <p className="text-sm text-muted-foreground">
                            Powered by optimized API streaming and Next.js 15 App Router, generations start appearing the moment you submit. No queues, no waiting rooms.
                        </p>
                    </div>
                    <div className="p-6 border rounded-xl bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">🛡️ Enterprise-Grade Security</h3>
                        <p className="text-sm text-muted-foreground">
                            Built with Better-Auth for robust authentication, secure session management, and encrypted data handling at every layer.
                        </p>
                    </div>
                    <div className="p-6 border rounded-xl bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">🎨 Granular Control</h3>
                        <p className="text-sm text-muted-foreground">
                            From "Packshot Mode" for e-commerce to "Realistic Shadows" for artistic depth, control every aspect of your output.
                        </p>
                    </div>
                    <div className="p-6 border rounded-xl bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">📂 Historical Persistence</h3>
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
                    <p className="text-muted-foreground">
                        Setting up IMvision locally allows you to contribute to the codebase or run your own private instance. This guide covers everything from prerequisites to running the development server.
                    </p>
                </section>

                <section className="space-y-4">
                    <h3 className="text-2xl font-semibold tracking-tight">Prerequisites</h3>
                    <p className="text-sm text-muted-foreground">Ensure your environment meets these requirements before proceeding.</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-2 p-3 border rounded-lg bg-muted/20">
                            <span className="font-semibold text-primary">Node.js 18+</span>
                            <span className="text-sm text-muted-foreground">Required for Next.js 15 features.</span>
                        </li>
                        <li className="flex items-start gap-2 p-3 border rounded-lg bg-muted/20">
                            <span className="font-semibold text-primary">PostgreSQL</span>
                            <span className="text-sm text-muted-foreground">A connection string (e.g., Neon, Supabase, or local).</span>
                        </li>
                        <li className="flex items-start gap-2 p-3 border rounded-lg bg-muted/20">
                            <span className="font-semibold text-primary">OpenRouter Key</span>
                            <span className="text-sm text-muted-foreground">Access to Gemini models.</span>
                        </li>
                        <li className="flex items-start gap-2 p-3 border rounded-lg bg-muted/20">
                            <span className="font-semibold text-primary">Google Cloud</span>
                            <span className="text-sm text-muted-foreground">OAuth credentials for social login.</span>
                        </li>
                    </ul>
                </section>

                <hr className="border-t border-border" />

                <section className="space-y-6">
                    <h3 className="text-2xl font-semibold tracking-tight">Step-by-Step Guide</h3>

                    <div className="space-y-2">
                        <h4 className="font-medium text-lg">1. Clone the Repository</h4>
                        <pre className="p-4 border rounded-lg bg-zinc-950 text-zinc-50 overflow-x-auto text-sm font-mono">
                            <code>git clone https://github.com/gitkarasune/img-nano.git
                                cd im-vision</code>
                        </pre>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-medium text-lg">2. Install Dependencies</h4>
                        <p className="text-sm text-muted-foreground">We recommend using npm, but pnpm or yarn are also supported.</p>
                        <pre className="p-4 border rounded-lg bg-zinc-950 text-zinc-50 overflow-x-auto text-sm font-mono">
                            <code>npm install</code>
                        </pre>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-medium text-lg">3. Environment Configuration</h4>
                        <p className="text-sm text-muted-foreground">Copy the example file and fill in your secrets.</p>
                        <pre className="p-4 border rounded-lg bg-zinc-950 text-zinc-50 overflow-x-auto text-sm font-mono">
                            <code>cp env.example .env</code>
                        </pre>
                        <div className="text-sm text-muted-foreground mt-2">
                            Refer to the <a href="/docs/env-vars" className="text-primary underline">Environment Variables</a> guide for details on each key.
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-medium text-lg">4. Database Setup</h4>
                        <p className="text-sm text-muted-foreground">Push the Prisma schema to your database.</p>
                        <pre className="p-4 border rounded-lg bg-zinc-950 text-zinc-50 overflow-x-auto text-sm font-mono">
                            <code>npx prisma db push</code>
                        </pre>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-medium text-lg">5. Run Development Server</h4>
                        <pre className="p-4 border rounded-lg bg-zinc-950 text-zinc-50 overflow-x-auto text-sm font-mono">
                            <code>npm run dev</code>
                        </pre>
                        <p className="text-sm text-muted-foreground mt-2">
                            The application will be available at <code className="bg-muted px-1 rounded">http://localhost:3000</code>.
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
                    <p className="text-muted-foreground">
                        Security is paramount. IMvision leverages <strong>Better-Auth</strong>, a cutting-edge authentication library designed for TypeScript and Next.js. It provides a comprehensive, type-safe solution that handles sessions, cookies, and OAuth providers with ease.
                    </p>
                </section>

                <section className="space-y-6">
                    <h3 className="text-2xl font-semibold tracking-tight">Core Architecture</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <h4 className="font-medium">Session Management</h4>
                            <p className="text-sm text-muted-foreground">
                                Sessions are stateless on the server side but persisted in the database for control. Clients receive HTTP-only, secure, same-site cookies that are automatically rotated to prevent session hijacking.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-medium">Type Safety</h4>
                            <p className="text-sm text-muted-foreground">
                                Unlike traditional auth solutions, Better-Auth provides end-to-end type safety. The user object in your component exactly matches the database schema, eliminating `any` types and runtime errors.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h3 className="text-2xl font-semibold tracking-tight">Supported Methods</h3>
                    <ul className="space-y-4">
                        <li className="p-4 border rounded-lg bg-card">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold uppercase">Primary</span>
                                <h4 className="font-semibold">Email & Password</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Standard credential flow with bcrypt hashing. Includes built-in support for password reset and email verification workflows (configurable).
                            </p>
                        </li>
                        <li className="p-4 border rounded-lg bg-card">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold uppercase">OAuth</span>
                                <h4 className="font-semibold">Google Integration</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                One-click sign-in using Google OAuth 2.0. This flow automatically provisions a user account and links it to the verified email address.
                            </p>
                        </li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h3 className="text-2xl font-semibold tracking-tight">Implementation Details</h3>
                    <p className="text-sm text-muted-foreground">
                        The auth client is initialized in `lib/auth-client.ts`. To use it in a component:
                    </p>
                    <pre className="p-4 border rounded-lg bg-zinc-950 text-zinc-50 overflow-x-auto text-sm font-mono">
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
                        IMvision's generation engine is the heart of the platform. It abstracts the complexity of prompt construction, API communication, and error handling into a seamless UI.
                    </p>
                </section>

                <section className="space-y-6">
                    <h3 className="text-2xl font-semibold tracking-tight">The Pipeline</h3>
                    <div className="relative border-l-2 border-muted pl-6 space-y-8">
                        <div className="relative">
                            <div className="absolute -left-[31px] bg-background border-2 border-primary w-4 h-4 rounded-full mt-1.5"></div>
                            <h4 className="font-semibold text-lg">1. Input Normalization</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                                Raw user prompts are sanitized and enriched. If "Prompt Enhancement" is active, a secondary LLM call (transparent to the user) expands the prompt with stylistic descriptors.
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

    // Prompt Engineering
    "prompt-engineering": {
        title: "Prompt Engineering Guide",
        content: (
            <div className="space-y-8 pt-4">
                <section className="space-y-4">
                    <p className="text-muted-foreground">
                        Mastering the art of prompting is key to unlocking the full potential of IMvision. The Gemini model handles natural language exceptionally well, but structure yields consistency.
                    </p>
                </section>

                <section className="space-y-6">
                    <h3 className="text-2xl font-semibold tracking-tight">The Anatomy of a Perfect Prompt</h3>
                    <div className="bg-muted p-6 rounded-xl">
                        <code className="text-lg block mb-4 break-words">
                            <span className="text-blue-500">[Subject]</span>, <span className="text-green-500">[Action/Context]</span>, <span className="text-purple-500">[Art Style]</span>, <span className="text-orange-500">[Lighting/Camera]</span>, <span className="text-red-500">[Parameters]</span>
                        </code>
                        <ul className="space-y-2 text-sm">
                            <li><span className="font-semibold text-blue-500">Subject:</span> "A cyberpunk street samurai..."</li>
                            <li><span className="font-semibold text-green-500">Action:</span> "...standing in rain under neon signs..."</li>
                            <li><span className="font-semibold text-purple-500">Style:</span> "...oil painting by Gregory Manchess..."</li>
                            <li><span className="font-semibold text-orange-500">Lighting:</span> "...volumetric fog, cinestill 800t..."</li>
                            <li><span className="font-semibold text-red-500">Parameters:</span> "--ar 16:9 --v 6.0" (handled by UI controls)</li>
                        </ul>
                    </div>
                </section>

                <section className="space-y-4">
                    <h3 className="text-2xl font-semibold tracking-tight">Advanced Techniques</h3>

                    <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-bold mb-1">Medium Specification</h4>
                            <p className="text-sm text-muted-foreground">
                                Explicitly state the medium. E.g., "A photograph of...", "A 3D render of...", "A flat vector illustration of...". This is the single strongest token you can use.
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-bold mb-1">Negative Constraints</h4>
                            <p className="text-sm text-muted-foreground">
                                While Gemini follows instructions well, describing what you <em>don't</em> want can be helpful. e.g., "clean background, no blur, no text".
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-bold mb-1">Lighting Modifiers</h4>
                            <p className="text-sm text-muted-foreground">
                                Use professional photography terms: "Rim lighting", "Global illumination", "Rembrandt lighting", "Bokeh".
                            </p>
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

    // History & Management
    "history": {
        title: "History & Data Management",
        content: (
            <div className="space-y-8 pt-4">
                <section className="space-y-4">
                    <p className="text-muted-foreground">
                        Your creative journey is valuable. IMvision provides a persistent history layer that automatically versions and archives every interaction.
                    </p>
                </section>

                <section className="space-y-6">
                    <h3 className="text-2xl font-semibold tracking-tight">Data Structure</h3>
                    <p className="text-sm text-muted-foreground">
                        Each generation is stored as a `Transaction` record linked to the `User`.
                    </p>
                    <div className="p-4 border rounded-lg bg-muted/30 font-mono text-sm max-w-full overflow-x-auto">
                        <pre>{`type Generation = {
  id: string;
  userId: string;
  prompt: string;          // The exact text used
  enhancedPrompt?: string; // If AI enhancement was used
  imageUrl: string;        // Permanent URL
  settings: JSON;          // { ratio, packshot, etc }
  createdAt: Date;
}`}</pre>
                    </div>
                </section>

                <section className="space-y-4">
                    <h3 className="text-2xl font-semibold tracking-tight">Management Features</h3>
                    <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                        <li><strong>Dashboard Sidebar:</strong> Real-time feed of recent generations.</li>
                        <li><strong>Search (Coming Soon):</strong> Full-text search across your prompt history.</li>
                        <li><strong>Export:</strong> Download high-res originals from the history view.</li>
                    </ul>
                </section>
            </div>
        )
    },

    // OpenRouter Integration
    "openrouter": {
        title: "OpenRouter Integration",
        content: (
            <div className="space-y-8 pt-4">
                <section className="space-y-4">
                    <p className="text-muted-foreground">
                        IMvision does not manage its own GPU clusters. Instead, we route requests through <strong>OpenRouter</strong>, a unified API for accessing the world's best AI models.
                    </p>
                </section>

                <section className="space-y-6">
                    <h3 className="text-2xl font-semibold tracking-tight">Why OpenRouter?</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex gap-4 p-4 border rounded-xl">
                            <div className="text-3xl">🌐</div>
                            <div>
                                <h4 className="font-bold">Model Agnosticism</h4>
                                <p className="text-sm text-muted-foreground">
                                    While we currently optimize for Gemini, the infrastructure supports swappable models (e.g., Stable Diffusion 3, DALL-E 3) with a single config change.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-4 border rounded-xl">
                            <div className="text-3xl">📉</div>
                            <div>
                                <h4 className="font-bold">Cost Efficiency</h4>
                                <p className="text-sm text-muted-foreground">
                                    OpenRouter provides competitive pricing and unified billing, allowing us to offer generation at scale without massive overhead.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h3 className="text-2xl font-semibold tracking-tight">API Reference</h3>
                    <p className="text-sm text-muted-foreground">
                        Outgoing requests follow standard OpenAI-compatible completion formats, but with image-specific payload extensions.
                    </p>
                    <div className="mt-2 p-4 border rounded bg-zinc-950 text-zinc-50 overflow-x-auto text-sm font-mono">
                        <pre><code>POST https://openrouter.ai/api/v1/chat/completions
                            Headers:
                            Authorization: Bearer $OPENROUTER_KEY
                            Body:
                            model: "google/gemini-flash-2.5"
                            messages: [...]</code></pre>
                    </div>
                </section>
            </div>
        )
    },

    // Environment Variables
    "env-vars": {
        title: "Environment Variables",
        content: (
            <div className="space-y-8 pt-4">
                <section className="space-y-4">
                    <p className="text-muted-foreground">
                        Configuration is managed via a `.env` file in the root directory. NEVER commit this file to version control.
                    </p>
                </section>

                <table className="w-full text-sm text-left border rounded-lg overflow-hidden">
                    <thead className="bg-muted text-muted-foreground">
                        <tr>
                            <th className="p-4 font-semibold">Variable</th>
                            <th className="p-4 font-semibold">Description</th>
                            <th className="p-4 font-semibold">Required</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y border-x border-b">
                        <tr>
                            <td className="p-4 font-mono font-medium">OPENROUTER_API_KEY</td>
                            <td className="p-4 text-muted-foreground">
                                Your API key from <a href="https://openrouter.ai" target="_blank" className="underline">openrouter.ai</a>.
                            </td>
                            <td className="p-4"><span className="text-red-500 font-bold">Yes</span></td>
                        </tr>
                        <tr>
                            <td className="p-4 font-mono font-medium">DATABASE_URL</td>
                            <td className="p-4 text-muted-foreground">
                                PostgreSQL connection string (Postgres://...).
                            </td>
                            <td className="p-4"><span className="text-red-500 font-bold">Yes</span></td>
                        </tr>
                        <tr>
                            <td className="p-4 font-mono font-medium">BETTER_AUTH_SECRET</td>
                            <td className="p-4 text-muted-foreground">
                                A random string used to sign session cookies. Generate with `openssl rand -hex 32`.
                            </td>
                            <td className="p-4"><span className="text-red-500 font-bold">Yes</span></td>
                        </tr>
                        <tr>
                            <td className="p-4 font-mono font-medium">BETTER_AUTH_URL</td>
                            <td className="p-4 text-muted-foreground">
                                The base URL of your application (e.g., http://localhost:3000).
                            </td>
                            <td className="p-4"><span className="text-red-500 font-bold">Yes</span></td>
                        </tr>
                        <tr>
                            <td className="p-4 font-mono font-medium">GOOGLE_CLIENT_ID</td>
                            <td className="p-4 text-muted-foreground">
                                OAuth Client ID from Google Cloud Console.
                            </td>
                            <td className="p-4"><span className="text-yellow-500 font-bold">Optional</span></td>
                        </tr>
                        <tr>
                            <td className="p-4 font-mono font-medium">GOOGLE_CLIENT_SECRET</td>
                            <td className="p-4 text-muted-foreground">
                                OAuth Client Secret from Google Cloud Console.
                            </td>
                            <td className="p-4"><span className="text-yellow-500 font-bold">Optional</span></td>
                        </tr>
                    </tbody>
                </table>
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
                <p className="text-muted-foreground">Documentation for <strong>{title}</strong> is coming soon.</p>
                <div className="p-4 border border-dashed rounded bg-muted/20 text-center text-sm">
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
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {data.title}
            </h1>
            <div className="prose prose-zinc prose-invert max-w-none pb-12 dark:prose-headings:text-white dark:prose-p:text-zinc-400 dark:prose-strong:text-white dark:prose-code:text-zinc-200 dark:prose-li:text-zinc-400">
                {data.content}
            </div>
        </div>
    );
}
