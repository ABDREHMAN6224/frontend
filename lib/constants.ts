const HISTORY_SEEDS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "h7",
  "h8",
  "h9",
  "h10",
] as const;

const HISTORY_PROMPTS = [
  "A misty mountain landscape at dawn with golden light breaking through clouds.",
  "An astronaut floating in a neon-lit cyberpunk city street at night.",
  "A cozy coffee shop interior with warm lighting and rain on the windows.",
  "A majestic white horse galloping through a field of wildflowers.",
  "Underwater coral reef scene with tropical fish and sunbeams.",
  "A vintage red sports car parked on a coastal cliff road at sunset.",
  "A fantasy castle on a floating island above the clouds.",
  "A minimalist Scandinavian living room with plants and natural wood.",
  "Northern lights dancing over a frozen lake in winter.",
  "A bustling Tokyo street market with lanterns and food stalls.",
] as const;

export const DEFAULT_PROMPT =
  "A professional portrait photograph of a smiling 31-year-old redheaded woman with warm brown eyes and softly tousled auburn hair framing her face, wearing a cream knit sweater against a neutral background, soft natural lighting, shallow depth of field.";

export const IMAGE_COUNTS = [1, 2, 4, 8] as const;
export const ASPECT_RATIOS = ["1:1", "4:3", "3:4", "16:9", "9:16"] as const;
export const MODELS = ["Flux Pro", "DALL-E 3", "Stable Diffusion XL", "Midjourney v6"] as const;

function buildHistoryItems() {
  return HISTORY_SEEDS.map((id, index) => ({
    id,
    thumbnailUrl: `https://picsum.photos/seed/${id}/200/200`,
    type: "image" as const,
    prompt: HISTORY_PROMPTS[index],
    model: MODELS[index % MODELS.length],
    items: Array.from({ length: 4 }, (_, itemIndex) => ({
      id: `${id}-item-${itemIndex}`,
      url: `https://picsum.photos/seed/${id}-${itemIndex}/480/640`,
      type: "image" as const,
    })),
  }));
}

export const HISTORY_ITEMS = buildHistoryItems();

export const PORTRAIT_SEED = "portrait-redhead-woman";

export function buildDefaultResultItems(count = 8) {
  return Array.from({ length: count }, (_, i) => ({
    id: `default-${i}`,
    url: `https://picsum.photos/seed/${PORTRAIT_SEED}-${i}/480/640`,
    type: "image" as const,
  }));
}

export const ASPECT_RATIO_DIMENSIONS: Record<string, { w: number; h: number }> = {
  "1:1": { w: 512, h: 512 },
  "4:3": { w: 640, h: 480 },
  "3:4": { w: 480, h: 640 },
  "16:9": { w: 640, h: 360 },
  "9:16": { w: 360, h: 640 },
};
