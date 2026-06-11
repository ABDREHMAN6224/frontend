"use client";

import { useCallback, useEffect, useState } from "react";
import { Header } from "@/components/mockup/Header";
import { HistoryBar } from "@/components/mockup/HistoryBar";
import { ControlPanel, useControlPanelDefaults } from "@/components/mockup/ControlPanel";
import { ResultsGrid } from "@/components/mockup/ResultsGrid";
import { fetchHistory, generateContent } from "@/lib/api";
import { DEFAULT_PROMPT, MODELS, buildDefaultResultItems } from "@/lib/constants";
import type { GenerateResponse, HistoryItem, MediaType } from "@/lib/types";

const initialResult: GenerateResponse = {
  id: "default",
  prompt: DEFAULT_PROMPT,
  model: MODELS[0],
  type: "image",
  items: buildDefaultResultItems(8),
};

export default function Home() {
  const defaults = useControlPanelDefaults();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [prompt, setPrompt] = useState(defaults.prompt);
  const [mediaType, setMediaType] = useState<MediaType>(defaults.mediaType);
  const [count, setCount] = useState(defaults.count);
  const [aspectRatio, setAspectRatio] = useState(defaults.aspectRatio);
  const [model, setModel] = useState<string>(defaults.model);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerateResponse>(initialResult);

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

  return (
    <div className="min-h-screen bg-cream transition-colors duration-200">
      <Header />
      <div className="space-y-4 py-4">
        <HistoryBar items={history} />
        <main className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-start lg:px-8">
          <ControlPanel
            prompt={prompt}
            mediaType={mediaType}
            count={count}
            aspectRatio={aspectRatio}
            model={model}
            isGenerating={isGenerating}
            onPromptChange={setPrompt}
            onMediaTypeChange={setMediaType}
            onCountChange={setCount}
            onAspectRatioChange={setAspectRatio}
            onModelChange={setModel}
            onGenerate={handleGenerate}
          />
          <ResultsGrid
            result={isGenerating ? null : result}
            isLoading={isGenerating}
            skeletonCount={count}
            className="min-w-0 flex-1"
          />
        </main>
      </div>
    </div>
  );
}
