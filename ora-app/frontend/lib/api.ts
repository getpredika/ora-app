/**
 * Modal API Client for Haitian Creole TTS
 * Connects Next.js frontend to Modal serverless backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_MODAL_API_URL || 'https://predika-ai--haitian-creole-tts-api-fastapi-app.modal.run'

export interface Speaker {
    id: string
    name: string
    gender: string
    description: string
    previewUrl?: string
}

export interface Model {
    id: string
    name: string
    description: string
}

export interface GenerateRequest {
    text: string
    speaker: string
    model: string
    temperature: number
    top_p: number
    repetition_penalty: number
    max_tokens: number
    num_return_sequences: number
}

export interface GenerateMetadata {
    generation_time: number
    decode_time: number
    total_time: number
    speaker: string
    model: string
}

/**
 * Fetch available TTS models from Modal API
 */
export async function getModels(): Promise<Model[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/models`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error(`Failed to fetch models: ${response.statusText}`)
        }
        const data = await response.json()
        return data.models
    } catch (error) {
        console.error('Error fetching models:', error)
        // Return empty array as fallback to prevent app crash
        return []
    }
}

/**
 * Fetch available voice speakers from Modal API
 */
export async function getSpeakers(): Promise<Speaker[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/speakers`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error(`Failed to fetch speakers: ${response.statusText}`)
        }
        const data = await response.json()
        // Use local preview URLs from Next.js public folder
        return data.speakers.map((speaker: Speaker) => ({
            ...speaker,
            previewUrl: `/previews/${speaker.id}.wav`
        }))
    } catch (error) {
        console.error('Error fetching speakers:', error)
        // Return empty array as fallback to prevent app crash
        return []
    }
}

/**
 * Generate speech from text using Modal GPU backend
 * Returns audio blob and metadata from response headers
 */
export async function generateSpeech(
    request: GenerateRequest
): Promise<{ audio: Blob; metadata: GenerateMetadata }> {
    const response = await fetch(`${API_BASE_URL}/api/generate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: response.statusText }))
        throw new Error(error.detail || 'Failed to generate speech')
    }

    // Extract metadata from response headers
    const metadata: GenerateMetadata = {
        generation_time: parseFloat(response.headers.get('X-Generation-Time') || '0'),
        decode_time: parseFloat(response.headers.get('X-Decode-Time') || '0'),
        total_time: parseFloat(response.headers.get('X-Total-Time') || '0'),
        speaker: response.headers.get('X-Speaker') || request.speaker,
        model: response.headers.get('X-Model') || request.model,
    }

    const audio = await response.blob()
    return { audio, metadata }
}

/**
 * Check API health status
 */
export async function checkHealth(): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/health`)
        return response.ok
    } catch {
        return false
    }
}




// -----------------------------
// ASR (Speech-to-Text) Client
// -----------------------------

const ASR_API_URL = process.env.NEXT_PUBLIC_ASR_API_URL || "https://predika-ai--hat-asr-app-fastapi-app.modal.run"

// Available ASR models
export const ASR_MODELS = [
    "predika-org/ayira-medium",
    "predika-org/ayira-large-turbo-v3",
    "predika-org/ayira-large-v2-2",
] as const

export type ASRModel = (typeof ASR_MODELS)[number]

export interface ASRResponse {
    text: string     // Transcribed text
    model: string    // Model used for transcription
}

/**
 * Transcribe audio using the specified ASR model
 * @param file - Audio file (wav, mp3, webm, etc.)
 * @param model - Model name (default: predika-org/ayira-medium)
 */
export async function transcribeAudio(
    file: File,
    model: ASRModel = "predika-org/ayira-medium",
    options?: { signal?: AbortSignal }
): Promise<ASRResponse> {
    if (!ASR_MODELS.includes(model)) {
        throw new Error(`Invalid model. Choose from: ${ASR_MODELS.join(", ")}`)
    }

    const form = new FormData()
    form.append("file", file)
    form.append("model", model)
    const response = await fetch(`${ASR_API_URL}/api/transcribe`, {
        method: "POST",
        body: form,
        signal: options?.signal,
    })

    if (!response.ok) {
        const parsed = await response.json().catch(async () => {
            const text = await response.text().catch(() => response.statusText)
            return { detail: text }
        })
        throw new Error(parsed?.detail || `Failed to transcribe audio (${response.status})`)
    }

    const data = await response.json().catch(() => {
        throw new Error('Invalid JSON response from ASR service')
    })

    return data as ASRResponse
}
