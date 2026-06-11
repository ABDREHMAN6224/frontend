"use client";

import { Header } from "@/components/mockup/Header";
import { HistoryBar } from "@/components/mockup/HistoryBar";
import { ControlPanel } from "@/components/mockup/ControlPanel";
import { ResultsGrid } from "@/components/mockup/ResultsGrid";
import { DEFAULT_PROMPT, MODELS, buildDefaultResultItems } from "@/lib/constants";
import { useGeneration } from "@/lib/useGeneration";
import type { GenerateResponse } from "@/lib/types";

const initialResult: GenerateResponse = {
  id: "default",
  prompt: DEFAULT_PROMPT,
  model: MODELS[0],
  type: "image",
  items: buildDefaultResultItems(8),
};

export default function Home() {
  const gen = useGeneration({ initialResult });

  return (
    <div className="min-h-screen bg-cream transition-colors duration-200">
      <Header />
      <div className="space-y-4 py-4">
        <HistoryBar items={gen.history} />
        <main className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-start lg:px-8">
          <ControlPanel
            prompt={gen.prompt}
            mediaType={gen.mediaType}
            count={gen.count}
            aspectRatio={gen.aspectRatio}
            model={gen.model}
            isGenerating={gen.isGenerating}
            onPromptChange={gen.setPrompt}
            onMediaTypeChange={gen.setMediaType}
            onCountChange={gen.setCount}
            onAspectRatioChange={gen.setAspectRatio}
            onModelChange={gen.setModel}
            onGenerate={gen.handleGenerate}
          />
          <ResultsGrid
            result={gen.isGenerating ? null : gen.result}
            isLoading={gen.isGenerating}
            skeletonCount={gen.count}
            className="min-w-0 flex-1"
          />
        </main>
      </div>
    </div>
  );
}
