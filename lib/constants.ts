export const HISTORY_THUMBNAILS = [
  { id: "h1", url: "https://picsum.photos/seed/h1/200/200", type: "image" as const },
  { id: "h2", url: "https://picsum.photos/seed/h2/200/200", type: "image" as const },
  { id: "h3", url: "https://picsum.photos/seed/h3/200/200", type: "image" as const },
  { id: "h4", url: "https://picsum.photos/seed/h4/200/200", type: "image" as const },
  { id: "h5", url: "https://picsum.photos/seed/h5/200/200", type: "image" as const },
  { id: "h6", url: "https://picsum.photos/seed/h6/200/200", type: "image" as const },
  { id: "h7", url: "https://picsum.photos/seed/h7/200/200", type: "image" as const },
  { id: "h8", url: "https://picsum.photos/seed/h8/200/200", type: "image" as const },
  { id: "h9", url: "https://picsum.photos/seed/h9/200/200", type: "image" as const },
  { id: "h10", url: "https://picsum.photos/seed/h10/200/200", type: "image" as const },
];

export const DEFAULT_PROMPT =
  "A professional portrait photograph of a smiling 31-year-old redheaded woman with warm brown eyes and softly tousled auburn hair framing her face, wearing a cream knit sweater against a neutral background, soft natural lighting, shallow depth of field.";

export const IMAGE_COUNTS = [1, 2, 4, 8] as const;
export const ASPECT_RATIOS = ["1:1", "4:3", "3:4", "16:9", "9:16"] as const;
export const MODELS = ["Flux Pro", "DALL-E 3", "Stable Diffusion XL", "Midjourney v6"] as const;

export const ASPECT_RATIO_DIMENSIONS: Record<string, { w: number; h: number }> = {
  "1:1": { w: 512, h: 512 },
  "4:3": { w: 640, h: 480 },
  "3:4": { w: 480, h: 640 },
  "16:9": { w: 640, h: 360 },
  "9:16": { w: 360, h: 640 },
};
