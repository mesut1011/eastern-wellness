# Eastern Wellness - TCM Health Assessment

A Traditional Chinese Medicine health assessment platform for international users.

## Features

- Symptom questionnaire based on TCM principles
- AI-powered analysis (using Qwen/LLM)
- Expert review workflow
- Email notifications

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- OpenAI/Qwen API for AI analysis

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` from `.env.example`:
```bash
cp .env.example .env.local
```

3. Run development server:
```bash
npm run dev
```

4. Open http://localhost:3000

## Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
npm run build
npm start
```

## Customization

- Edit questions in `src/app/questionnaire/page.tsx`
- Modify AI prompt in `src/app/api/analyze/route.ts`
- Update styling in `src/app/globals.css`

## License

MIT
