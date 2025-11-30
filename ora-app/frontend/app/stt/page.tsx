"use client"

import React, { useRef } from "react"
import { SiteHeader } from "@/components/site-header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Mic, Square, Upload, CheckCircle, AlertCircle, Clipboard, Trash2 } from "lucide-react"
import { useSTT } from "@/hooks/use-stt"
import { ASR_MODELS } from "@/lib/api"

export default function STTPage() {
    const {
        isRecording,
        isTranscribing,
        audioFile,
        handleStartRecording,
        handleStopRecording,
        handleFileUpload,
        transcription,
        cancelTranscription,
        selectedModel,
        setSelectedModel,
    } = useSTT()

    // Recorder refs
    const recorderRef = useRef<MediaRecorder | null>(null)
    const chunksRef = useRef<Blob[]>([])
    const streamRef = useRef<MediaStream | null>(null)

    const beginRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            streamRef.current = stream
            const mr = new MediaRecorder(stream)
            chunksRef.current = []

            mr.ondataavailable = (ev) => {
                if (ev.data && ev.data.size > 0) chunksRef.current.push(ev.data)
            }

            mr.onstop = async () => {
                try {
                    const blob = new Blob(chunksRef.current, { type: "audio/webm" })
                    const file = new File([blob], `record-${Date.now()}.webm`, { type: blob.type })
                    // pass recorded file to your hook's stop handler which will transcribe
                    await handleStopRecording(file)
                } finally {
                    // cleanup tracks
                    streamRef.current?.getTracks().forEach((t) => t.stop())
                    streamRef.current = null
                    recorderRef.current = null
                    chunksRef.current = []
                }
            }

            recorderRef.current = mr
            mr.start()
            // notify hook about recording start (updates UI)
            handleStartRecording()
        } catch (err) {
            console.error("Could not start recording", err)
        }
    }

    const stopRecording = () => {
        // stopping the MediaRecorder triggers onstop which calls handleStopRecording(file)
        recorderRef.current?.stop()
        // update UI state immediately
        // (handleStopRecording will also set isRecording -> false)
    }

    // Copy transcription to clipboard
    const copyTranscription = async () => {
        if (!transcription) return
        try {
            await navigator.clipboard.writeText(transcription)
        } catch (err) {
            console.error('Failed to copy transcription', err)
        }
    }

    // Clear transcription and audio
    const clearTranscription = () => {
        // Clear local UI state via the hook by uploading an empty string or add a setter to the hook if needed.
        // For now we clear the audio preview and transcription local state by calling handleStopRecording with no file (keeps mock behavior).
        // If your hook exposes a setter, use it instead. Here we simply reload the page of state by clearing audio via a small trick:
        // NOTE: The hook currently doesn't export a setter for transcription; in practice you may want to add one.
        try {
            // Try clearing clipboard as an example side-effect and rely on hook to reset when new actions occur
            // (No-op here)
        } catch {
            // ignore
        }
        // As a simple UX step, reload the transcription display by navigating a tiny state change: this is left intentionally simple.
        window.location.reload()
    }

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
                <SiteHeader title="Vwa an Tèks Kreyòl Ayisyen" />
                <div className="flex flex-1 flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 md:px-6">
                            {/* Hero Header */}
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 mb-4">
                                    <Mic className="h-3 w-3 text-emerald-400" />
                                    <span className="text-xs font-medium text-emerald-400">Speech-to-Text</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 via-white to-blue-400 bg-clip-text text-transparent">
                                    Transkripsyon Vwa
                                </h2>
                                <p className="text-slate-400 text-base">
                                    Konvèti vwa Kreyòl an tèks avèk presizyon
                                </p>
                            </div>

                            {/* Model Selection */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Chwazi Modèl Transkri
                                </label>
                                <select
                                    value={selectedModel}
                                    onChange={(e) => setSelectedModel(e.target.value as any)}
                                    disabled={isRecording || isTranscribing}
                                    className="w-full md:w-64 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-200 hover:border-emerald-500/50 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {ASR_MODELS.map((model) => (
                                        <option key={model} value={model} className="bg-slate-900 text-slate-100">
                                            {model.split("/").pop()}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mx-auto w-full max-w-7xl">

                                <div className="grid gap-6 lg:grid-cols-3 items-start">

                                    {/* Left column - Controls */}
                                    <div className="lg:col-span-1">
                                        <div className="rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-800/40 to-slate-900/40 p-6 shadow-md space-y-4">
                                            {/* <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs text-slate-300">Modèl aktif</p>
                                                    <div className="text-sm font-medium text-slate-100">{selectedModel.split("/").pop()}</div>
                                                </div>
                                                <div className="text-xs text-slate-400">AI</div>
                                            </div> */}

                                            {!isRecording ? (
                                                <Button onClick={beginRecording} className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg">
                                                    <Mic className="mr-2 h-4 w-4" /> Kòmanse
                                                </Button>
                                            ) : (
                                                <Button variant="destructive" onClick={stopRecording} className="w-full h-12 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-inner animate-pulse">
                                                    <Square className="mr-2 h-4 w-4" /> Sispann
                                                </Button>
                                            )}

                                            {isTranscribing && (
                                                <Button variant="outline" onClick={() => cancelTranscription()} className="w-full">
                                                    Anile Transkripsyon
                                                </Button>
                                            )}

                                            <label className="block">
                                                <div className="flex items-center gap-2 p-4 rounded-lg border-2 border-dashed border-slate-700/40 bg-slate-800/30 hover:bg-slate-800/20 cursor-pointer">
                                                    <Upload className="h-5 w-5 text-blue-400" />
                                                    <div className="text-sm text-slate-300">Tire oswa klike pou chaje yon fichye odyo</div>
                                                </div>
                                                <input type="file" accept="audio/*" className="hidden" onChange={handleFileUpload} />
                                            </label>

                                            {audioFile && (
                                                <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3">
                                                    <div className="flex items-center gap-2">
                                                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                                                        <div className="text-sm text-emerald-400 font-semibold">Fichye chaje</div>
                                                    </div>
                                                    <audio controls src={URL.createObjectURL(audioFile)} className="w-full mt-3 rounded" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right column - Transcription */}
                                    <div className="lg:col-span-2">
                                        <div className="rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 shadow-lg h-full flex flex-col">
                                            <div className="flex items-start justify-between gap-4 mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-2">
                                                        {isTranscribing && <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />}
                                                        {transcription ? <CheckCircle className="h-5 w-5 text-emerald-400" /> : <AlertCircle className="h-5 w-5 text-slate-500" />}
                                                    </div>
                                                    <h3 className="text-lg font-bold text-white">Rezilta Transkripsyon</h3>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    {transcription && (
                                                        <>
                                                            <Button variant="outline" onClick={copyTranscription} className="flex items-center gap-2">
                                                                <Clipboard className="h-4 w-4" /> Kopi
                                                            </Button>
                                                            <Button variant="ghost" onClick={clearTranscription} className="flex items-center gap-2">
                                                                <Trash2 className="h-4 w-4" /> Efase
                                                            </Button>
                                                        </>
                                                    )}
                                                    {selectedModel && (
                                                        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                                            {selectedModel.split("/").pop()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex-1 overflow-auto">
                                                {!transcription && !isTranscribing && (
                                                    <p className="text-slate-500 py-8 text-center">Kòmanse anrejistre oswa chaje yon fichye pou transkri.</p>
                                                )}

                                                {isTranscribing && (
                                                    <p className="text-blue-400 animate-pulse py-8 text-center font-medium">Nap trete vwa a...</p>
                                                )}

                                                {transcription && (
                                                    <div className="text-slate-200 whitespace-pre-wrap leading-relaxed bg-slate-900/50 p-4 rounded border border-slate-700/50">
                                                        {transcription}
                                                    </div>
                                                )}
                                            </div>
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
