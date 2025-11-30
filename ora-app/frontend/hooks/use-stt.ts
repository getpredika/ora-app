import { useEffect, useRef, useState } from "react";
import { transcribeAudio, ASRModel } from "@/lib/api";

export function useSTT(defaultModel: ASRModel = "predika-org/ayira-medium") {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState("");
  const [selectedModel, setSelectedModel] = useState<ASRModel>(defaultModel);

  // Keep a single AbortController per in-flight transcription so we can cancel it.
  const controllerRef = useRef<AbortController | null>(null);

  // Cancel any running transcription (used before starting a new one or on unmount)
  const cancelTranscription = () => {
    controllerRef.current?.abort();
    controllerRef.current = null;
  };

  const startTranscription = async (file: File) => {
    cancelTranscription();
    const ctrl = new AbortController();
    controllerRef.current = ctrl;

    setIsTranscribing(true);
    setTranscription("");

    try {
      const result = await transcribeAudio(file, selectedModel, { signal: ctrl.signal });
      setTranscription(result.text ?? "");
    } catch (err: any) {
      if (err?.name === "AbortError") {
        // aborted by user - ignore
        return;
      }
      console.error("ASR error:", err);
      setTranscription("Erè pandan transkripsyon. Tanpri eseye ankò.");
    } finally {
      setIsTranscribing(false);
      controllerRef.current = null;
    }
  };

  const handleStartRecording = () => {
    // Placeholder: hook into real recorder here
    setIsRecording(true);
    // When you integrate a recorder, capture the audio blob and call startTranscription(blobFile)
  };

  const handleStopRecording = async (recordedFile?: File) => {
    // Stop the imaginary recorder and process the result
    setIsRecording(false);
    if (recordedFile) {
      setAudioFile(recordedFile);
      await startTranscription(recordedFile);
    } else {
      // If you don't pass a file, the integration can supply the recorded file here.
      // For now, keep the mock behavior.
      setIsTranscribing(true);
      setTimeout(() => {
        setTranscription("Transkripsyon egzanp pou odyo a.");
        setIsTranscribing(false);
      }, 2000);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAudioFile(file);
    await startTranscription(file);
  };

  // Abort any in-flight transcription when the hook unmounts
  useEffect(() => {
    return () => cancelTranscription();
  }, []);

  return {
    isRecording,
    isTranscribing,
    audioFile,
    handleStartRecording,
    handleStopRecording,
    handleFileUpload,
    transcription,
    // expose cancel in case the consumer wants to abort manually
    cancelTranscription,
    selectedModel,
    setSelectedModel,
  };
}
