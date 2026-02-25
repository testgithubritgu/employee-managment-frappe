import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppSidebar />

            <SidebarInset>

                <main className="p-4">
                    {children}
                </main>
            </SidebarInset>
        </>
    )
}