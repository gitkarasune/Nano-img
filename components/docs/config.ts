export interface DocsConfig {
    title: string;
    items: {
        title: string;
        href: string;
        items?: {
            title: string;
            href: string;
        }[];
    }[];
}

export const docsConfig: DocsConfig = {
    title: "IMvision",
    items: [
        {
            title: "Getting Started",
            href: "/docs",
            items: [
                { title: "Introduction", href: "/docs" },
                { title: "Installation", href: "/docs/installation" },
                { title: "Authentication", href: "/docs/authentication" },
            ],
        },
        {
            title: "Features",
            href: "/docs/features",
            items: [
                { title: "Image Generation", href: "/docs/image-generation" },
                { title: "Prompt Engineering", href: "/docs/prompt-engineering" },
                { title: "Image Editing", href: "/docs/image-editing" },
                { title: "History & Management", href: "/docs/history" },
            ],
        },
        {
            title: "API & Configuration",
            href: "/docs/api",
            items: [
                { title: "Environment Variables", href: "/docs/env-vars" },
                { title: "OpenRouter Integration", href: "/docs/openrouter" },
            ],
        },
    ],
};
