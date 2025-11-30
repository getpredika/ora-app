"use client"

import React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Mic, MessageSquare, Volume2, BookCheck, Home, HelpCircle } from "lucide-react"
import Link from "next/link"
import NextImage from "next/image"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"

const data = {
    user: {
        name: "Itilizatè",
        email: "itilizate@ora.app",
        avatar: "/predika.svg",
    },
    navMain: [
        {
            title: "Akèy",
            url: "/",
            icon: Home,
        },
        {
            title: "TTS",
            url: "/tts",
            icon: Volume2,
        },
        {
            title: "STT",
            url: "/stt",
            icon: Mic,
        },
        {
            title: "Gramè",
            url: "/grammar",
            icon: BookCheck,
        },
        {
            title: "Evalyasyon",
            url: "/assessment",
            icon: MessageSquare,
        },
    ],
    navSecondary: [
        {
            title: "Èd",
            url: "#",
            icon: HelpCircle,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <NextImage
                                        src="/predika.svg"
                                        alt="Predika"
                                        width={24}
                                        height={24}
                                        className="size-6"
                                    />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">ORA</span>
                                    <span className="text-xs">Kreyòl AI</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
