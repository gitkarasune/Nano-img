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
                { title: "Installation", href: "/docs/installation" },            ],
        },
    ],
};
