"use client"

import React from "react"
import { SiteHeader } from "@/components/site-header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function GrammarPage() {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "16rem",
                    "--header-height": "3rem",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader title="Gramè ak Òtograf" />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
                                <div className="mb-4">
                                    <p className="text-muted-foreground">
                                        Korije tèks Kreyòl ou a
                                    </p>
                                </div>
                                <div className="rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 p-12 text-center">
                                    <p className="text-muted-foreground">
                                        Paj gramè ap vini byento...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
