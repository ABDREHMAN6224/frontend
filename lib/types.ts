export type MediaType = "image" | "video";

export type HistoryItem = {
  id: string;
  thumbnailUrl: string;
  type: MediaType;
};

export type GenerateRequest = {
  prompt: string;
  type: MediaType;
  count: number;
  aspectRatio: string;
  model: string;
};

export type MediaItem = {
  id: string;
  url: string;
  type: MediaType;
};

export type GenerateResponse = {
  id: string;
  prompt: string;
  model: string;
  type: MediaType;
  items: MediaItem[];
};
