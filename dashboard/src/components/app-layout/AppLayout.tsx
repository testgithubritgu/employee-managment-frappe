import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppSidebar />

      <SidebarInset>
        {/* <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <h1 className="font-semibold">Dashboard</h1>
        </header> */}

        <main className="p-4">
          {children}
        </main>
      </SidebarInset>
    </>
  )
}