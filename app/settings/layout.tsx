
export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-black text-black dark:text-white">

            <div className="flex flex-col flex-1 overflow-hidden">
                <main className="flex-1 overflow-y-auto p-2 md:p-8 lg:p-12">
                    <div className="max-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
