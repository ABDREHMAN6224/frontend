"use client";

import { useCallback, useEffect, useState } from "react";
import { Header } from "@/components/mockup/Header";
import { HistoryBar } from "@/components/mockup/HistoryBar";
import { ControlPanel, useControlPanelDefaults } from "@/components/mockup/ControlPanel";
import { fetchHistory, generateContent } from "@/lib/api";
import type { GenerateResponse, HistoryItem, MediaType } from "@/lib/types";

export default function Home() {
  const defaults = useControlPanelDefaults();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [prompt, setPrompt] = useState(defaults.prompt);
  const [mediaType, setMediaType] = useState<MediaType>(defaults.mediaType);
  const [count, setCount] = useState(defaults.count);
  const [aspectRatio, setAspectRatio] = useState(defaults.aspectRatio);
  const [model, setModel] = useState<string>(defaults.model);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(null);

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
            thumbnailUrl: response.items[0].url,
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
        <main className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:px-8">
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
          <div className="min-w-0 flex-1">
            {result ? (
              <p className="text-sm text-muted">
                Generated {result.items.length} {result.type}(s) — results grid coming next.
              </p>
            ) : (
              <p className="text-sm text-muted">Enter a prompt and click Generate to create content.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
