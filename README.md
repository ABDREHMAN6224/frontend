# F — AI Content Generation

A responsive AI content generation web app built with Next.js, matching a provided design mockup with a bonus creative variant.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 only (design tokens via `@theme inline`)
- **Icons:** Lucide React
- **Theming:** next-themes (light / dark / system)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the classic mockup design, or [http://localhost:3000/alt](http://localhost:3000/alt) for the Studio variant.

```bash
npm run build
npm start
```

## Project Structure

```
app/
  page.tsx              # Classic mockup design (/)
  alt/page.tsx          # Bonus Studio design (/alt)
  api/generate/route.ts # POST — mock image/video generation
  api/history/route.ts  # GET — history thumbnails
  globals.css           # Tailwind tokens, animations
components/
  mockup/               # Classic design components
  alt/                  # Studio design components
  shared/               # ThemeProvider, ThemeToggle
lib/
  api.ts                # Client fetch helpers
  useGeneration.ts      # Shared generation state hook
  constants.ts          # Defaults, aspect ratios, models
  types.ts              # Shared TypeScript types
  cn.ts                 # clsx + tailwind-merge helper
```

## API

### `GET /api/history`

Returns an array of history items:

```json
[{ "id": "h1", "thumbnailUrl": "...", "type": "image" }]
```

### `POST /api/generate`

Request:

```json
{
  "prompt": "A portrait of...",
  "type": "image",
  "count": 4,
  "aspectRatio": "1:1",
  "model": "Flux Pro"
}
```

Response:

```json
{
  "id": "gen-123",
  "prompt": "...",
  "model": "Flux Pro",
  "type": "image",
  "items": [{ "id": "...", "url": "...", "type": "image" }]
}
```

Images use deterministic [picsum.photos](https://picsum.photos) seeds. Videos return a sample MP4 URL.

## Design Decisions

### Classic (`/`)

Pixel-faithful implementation of the provided mockup:

- Cream (`#FDF8F5`) background with peach (`#E9A08A`) accents
- Header with nav icons, history scroll bar, left control panel, 4-column results grid
- Prompt card embedded in the results grid (second row, first column)
- Mobile-first responsive layout: stacked on small screens, sidebar + grid on desktop

### Studio (`/alt`)

A distinct creative direction — dark gradient canvas with:

- Glassmorphism floating control dock at the bottom
- Typography-forward prompt display as a blockquote
- Masonry column layout for results
- Violet/fuchsia accent palette

Both variants share the same API and `useGeneration` hook.

### Responsiveness

| Breakpoint | Layout |
|------------|--------|
| 320–639px | Single column, 1-col grid, compact header |
| 640–1023px | 2-col results grid |
| 1024–1279px | Sidebar + 3-col grid |
| 1280px+ | Full mockup layout, 4-col grid, max-width 1400px |

### Dark Mode

CSS custom properties swap in `.dark` class. Toggle in header persists via `next-themes`.

### Performance

- `next/image` for all remote images with responsive `sizes`
- `React.memo` on `ResultMedia` to reduce re-renders
- Skeleton loading states during generation (~800ms simulated delay)

### Accessibility

- Semantic HTML landmarks (`header`, `nav`, `main`, `section`)
- `aria-label`, `aria-expanded`, `aria-busy` on interactive elements
- Descriptive `alt` text derived from prompts
- `prefers-reduced-motion` respected for animations
