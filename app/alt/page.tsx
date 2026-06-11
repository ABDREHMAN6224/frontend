"use client";

import { AltControlDock } from "@/components/alt/AltControlDock";
import { AltHeader } from "@/components/alt/AltHeader";
import { AltResultsMasonry } from "@/components/alt/AltResultsMasonry";
import { useGeneration } from "@/lib/useGeneration";

export default function AltPage() {
  const gen = useGeneration();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c1a] via-[#1a1030] to-[#0d1117] pb-52 transition-colors duration-300">
      <AltHeader />

      <main className="mx-auto max-w-6xl px-4 pt-28 sm:px-6">
        <AltResultsMasonry
          result={gen.isGenerating ? null : gen.result}
          isLoading={gen.isGenerating}
          skeletonCount={gen.count}
        />
      </main>

      <AltControlDock
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
    </div>
  );
}
