# VibeHunt 🎯

Discover trending apps built with Vibe Coding platforms: Vercel, Lovable, Base44, and Youware.

## Features

- 📊 **Real Traffic Data**: Track actual traffic trends from top platforms
- 🔍 **Smart Search**: Find apps by name, domain, or URL
- 📅 **Time Filters**: View data by month (February - April 2026)
- 📈 **Growth Metrics**: See which apps are trending up or down
- 🎨 **Clean UI**: Modern, responsive design built with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Processing**: Custom Markdown parser
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run data parser (first time)
npm run parse:vercel

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Data Processing

The project includes a custom Markdown parser that converts traffic data into structured JSON:

```bash
# Parse single platform
npm run parse:vercel

# Parse all platforms
npm run parse:all
```

## Project Structure

```
vibehunt/
├── data/
│   ├── raw/          # Source Markdown files
│   ├── processed/    # Generated JSON data
│   └── scripts/      # Data processing scripts
├── src/
│   ├── app/         # Next.js pages
│   ├── components/  # React components
│   ├── lib/         # Utilities and types
│   └── hooks/       # Custom hooks
├── public/          # Static assets
└── package.json
```

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/vibehunt)

Or manually:

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

## License

MIT

## Credits

Built with ❤️ using Claude Code • Data from public traffic analytics
