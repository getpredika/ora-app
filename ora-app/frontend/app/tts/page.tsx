"use client"

import React from "react"
import TextInput from "@/components/text-input"
import VoiceSettings from "@/components/voice-settings"
import { useTTS } from "@/hooks/use-tts"
import { SiteHeader } from "@/components/site-header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Volume2, Sparkles } from "lucide-react"

export default function Home() {
  const { isGenerating } = useTTS()

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "16rem",
          "--header-height": "3rem",
          // application color variables used by landing/hero
          "--app-bg": "#030303",
          "--app-accent": "#10b981",
          "--app-accent-start": "#10b981",
          "--app-accent-end": "#3b82f6",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Tèks an Vwa Kreyòl Ayisyen" />
        <div className="flex flex-1 flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 md:px-6">
              {/* Hero Header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 mb-4">
                  <Volume2 className="h-3 w-3 text-emerald-400" />
                  <span className="text-xs font-medium text-emerald-400">Text-to-Speech</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 via-white to-blue-400 bg-clip-text text-transparent">
                  Konvèti Tèks an Vwa
                </h2>
                <p className="text-slate-400 text-base">
                  Bay lavi tèks Kreyòl avèk vwa natirèl ak miltip opsyon
                </p>
              </div>

              <div className="mx-auto w-full max-w-7xl">
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <div className="rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 shadow-lg">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="h-4 w-4 text-emerald-400" />
                        <h3 className="text-lg font-bold text-white">Tèks Antre</h3>
                      </div>
                      <TextInput />
                    </div>
                  </div>
                  <div>
                    <div className="rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 shadow-lg h-full">
                      <div className="flex items-center gap-2 mb-4">
                        <Volume2 className="h-4 w-4 text-blue-400" />
                        <h3 className="text-lg font-bold text-white">Paramèt Vwa</h3>
                      </div>
                      <VoiceSettings isGenerating={isGenerating} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
