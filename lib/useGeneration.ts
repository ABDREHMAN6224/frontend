"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchHistory, generateContent } from "@/lib/api";
import { DEFAULT_PROMPT, MODELS } from "@/lib/constants";
import type { GenerateResponse, HistoryItem, MediaType } from "@/lib/types";

type UseGenerationOptions = {
  initialResult?: GenerateResponse | null;
};

export function useGeneration({ initialResult = null }: UseGenerationOptions = {}) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [mediaType, setMediaType] = useState<MediaType>("image");
  const [count, setCount] = useState(4);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [model, setModel] = useState<string>(MODELS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(initialResult);

  useEffect(() => {
    fetchHistory().then(setHistory).catch(console.error);
  }, []);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    try {
      const response = await generateContent({
        prompt,
        type: mediaType,
        count,
        aspectRatio,
        model,
      });
      setResult(response);
      if (response.items[0]) {
        setHistory((prev) => [
          {
            id: response.id,
            thumbnailUrl:
              response.type === "image"
                ? response.items[0].url
                : `https://picsum.photos/seed/${response.id}/200/200`,
            type: response.type,
          },
          ...prev,
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, mediaType, count, aspectRatio, model]);

  return {
    history,
    prompt,
    setPrompt,
    mediaType,
    setMediaType,
    count,
    setCount,
    aspectRatio,
    setAspectRatio,
    model,
    setModel,
    isGenerating,
    result,
    handleGenerate,
  };
}
