/**
 * Static TTS Data - Hardcoded for offline support
 * Use this instead of API calls if you want fully offline functionality
 */

import type { Model, Speaker } from './api'

export const STATIC_MODELS: Model[] = [
    {
        id: "kani-tts-haitian-creole-22khz",
        name: "Standard Model",
        description: "Balanced quality and speed"
    },
    {
        id: "kani-tts-haitian-creole-22khz-aggressive",
        name: "Aggressive Model",
        description: "More expressive and dynamic"
    },
]

export const STATIC_SPEAKERS: Speaker[] = [
    {
        id: "narrateur",
        name: "Narrateur",
        gender: "female",
        description: "Fi - Vitès Nòmal",
        previewUrl: "/previews/narrateur.wav"
    },
    {
        id: "narrateur_cmu_female",
        name: "CMU Female",
        gender: "female",
        description: "Fi - CMU Dataset",
        previewUrl: "/previews/narrateur_cmu_female.wav"
    },
    {
        id: "narrateur_cmu_male",
        name: "CMU Male",
        gender: "male",
        description: "Gason - CMU Dataset",
        previewUrl: "/previews/narrateur_cmu_male.wav"
    },
    {
        id: "presentateur",
        name: "Prezentatè",
        gender: "male",
        description: "Gason - Formal",
        previewUrl: "/previews/presentateur.wav"
    },
    {
        id: "conteuse",
        name: "Kontèz",
        gender: "female",
        description: "Fi - Storyteller",
        previewUrl: "/previews/conteuse.wav"
    },
    {
        id: "assistante",
        name: "Asistant",
        gender: "female",
        description: "Fi - Assistant",
        previewUrl: "/previews/assistante.wav"
    },
    {
        id: "femme_narratrice",
        name: "Naratris",
        gender: "female",
        description: "Fi - Narrator",
        previewUrl: "/previews/femme_narratrice.wav"
    },
    {
        id: "homme_jeune",
        name: "Jèn Gason",
        gender: "male",
        description: "Gason - Young",
        previewUrl: "/previews/homme_jeune.wav"
    },
]
