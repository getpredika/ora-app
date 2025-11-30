import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader({ title }: { title: string }) {
    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b border-slate-700/50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-sm transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1 text-slate-300 hover:text-emerald-400 hover:bg-slate-700/50" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4 bg-slate-700/50"
                />
                <h1 className="text-base font-medium text-slate-100">{title}</h1>
            </div>
        </header>
    )
}
