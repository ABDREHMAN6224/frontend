"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchHistory, generateContent } from "@/lib/api";
import { DEFAULT_PROMPT, MODELS } from "@/lib/constants";
import type { GenerateResponse, HistoryItem, MediaType } from "@/lib/types";

type UseGenerationOptions = {
  initialResult?: GenerateResponse | null;
};

function historyItemToResult(item: HistoryItem): GenerateResponse {
  return {
    id: item.id,
    prompt: item.prompt,
    model: item.model,
    type: item.type,
    items: item.items,
  };
}

function resultToHistoryItem(result: GenerateResponse): HistoryItem {
  return {
    id: result.id,
    thumbnailUrl:
      result.type === "image"
        ? result.items[0]?.url ?? ""
        : `https://picsum.photos/seed/${result.id}/200/200`,
    type: result.type,
    prompt: result.prompt,
    model: result.model,
    items: result.items,
  };
}

export function useGeneration({ initialResult = null }: UseGenerationOptions = {}) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [mediaType, setMediaType] = useState<MediaType>("image");
  const [count, setCount] = useState(4);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [model, setModel] = useState<string>(MODELS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(initialResult);
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(
    initialResult?.id ?? null,
  );

  useEffect(() => {
    fetchHistory().then(setHistory).catch(console.error);
  }, []);

  const loadFromHistory = useCallback((item: HistoryItem) => {
    setActiveHistoryId(item.id);
    setPrompt(item.prompt);
    setModel(item.model);
    setMediaType(item.type);
    setCount(item.items.length);
    setResult(historyItemToResult(item));
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
      setActiveHistoryId(response.id);
      if (response.items[0]) {
        const entry = resultToHistoryItem(response);
        setHistory((prev) => [entry, ...prev.filter((item) => item.id !== entry.id)]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, mediaType, count, aspectRatio, model]);

  return {
    history,
    activeHistoryId,
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
    loadFromHistory,
    handleGenerate,
  };
}
