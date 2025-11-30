"use client"

import { useState, useEffect } from 'react'
import { generateSpeech, type GenerateRequest, type GenerateMetadata } from '@/lib/api'
import { STATIC_MODELS, STATIC_SPEAKERS } from '@/lib/static-data'
import type { Model, Speaker } from '@/lib/api'

export interface TTSSettings {
    speaker: string
    model: string
    temperature: number
    top_p: number
    repetition_penalty: number
    max_tokens: number
    num_return_sequences: number
}

export function useTTS() {
    const [models, setModels] = useState<Model[]>([])
    const [speakers, setSpeakers] = useState<Speaker[]>([])
    const [settings, setSettings] = useState<TTSSettings>({
        speaker: 'narrateur',
        model: 'kani-tts-haitian-creole-22khz',
        temperature: 0.6,
        top_p: 0.95,
        repetition_penalty: 1.1,
        max_tokens: 1200,
        num_return_sequences: 1,
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Load static data on mount (no API calls)
    useEffect(() => {
        setIsLoading(true)

        // Use hardcoded data from static-data.ts
        setModels(STATIC_MODELS)
        setSpeakers(STATIC_SPEAKERS)

        // Set default speaker and model
        if (STATIC_SPEAKERS.length > 0 && !settings.speaker) {
            setSettings((prev: TTSSettings) => ({ ...prev, speaker: STATIC_SPEAKERS[0].id }))
        }
        if (STATIC_MODELS.length > 0 && !settings.model) {
            setSettings((prev: TTSSettings) => ({ ...prev, model: STATIC_MODELS[0].id }))
        }

        setIsLoading(false)
    }, [])

    async function generate(text: string): Promise<{ audioUrl: string; metadata: GenerateMetadata } | null> {
        if (!text.trim()) {
            setError('Text cannot be empty')
            return null
        }

        setIsGenerating(true)
        setError(null)

        try {
            const request: GenerateRequest = {
                text,
                speaker: settings.speaker,
                model: settings.model,
                temperature: settings.temperature,
                top_p: settings.top_p,
                repetition_penalty: settings.repetition_penalty,
                max_tokens: settings.max_tokens,
                num_return_sequences: settings.num_return_sequences,
            }

            const { audio, metadata } = await generateSpeech(request)
            const audioUrl = URL.createObjectURL(audio)

            return { audioUrl, metadata }
        } catch (err) {
            console.error('Failed to generate speech:', err)
            setError(err instanceof Error ? err.message : 'Failed to generate speech')
            return null
        } finally {
            setIsGenerating(false)
        }
    }

    return {
        models,
        speakers,
        settings,
        setSettings,
        isLoading,
        isGenerating,
        error,
        generate,
    }
}
