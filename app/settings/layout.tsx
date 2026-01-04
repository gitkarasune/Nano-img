import { SettingsSidebar } from "@/components/settings/settings-sidebar";
import { AppHeader } from "@/components/dashboard/app-header";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-black text-black dark:text-white">
            {/* Reuse AppHeader? Or custom header? v0 usually has a simple back or the standard header. 
                User requested standard v0 style. Let's assume standard header is fine, 
                but sidebar handles Back to App.
            */}

            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                <SettingsSidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
                    <div className="max-w-4xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
