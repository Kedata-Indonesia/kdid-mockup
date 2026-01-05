# EverAfter - Wedding Marketplace

A premium wedding marketplace built with Nuxt 3, connecting couples with top-tier wedding vendors.

## Features

- Browse vendors by category (Venue, Catering, Photography, Decoration, Makeup, Entertainment)
- AI Wedding Consultant powered by Google Gemini
- Product detail pages with image galleries
- Vendor profile pages with services, portfolio, availability calendar, and reviews
- Shopping cart with booking management
- Multi-step checkout flow
- User authentication (login/register)
- Order history and profile management
- Responsive design with Tailwind CSS

## Tech Stack

- **Framework:** Nuxt 3
- **Styling:** Tailwind CSS
- **State Management:** Pinia
- **Icons:** Lucide Vue
- **AI:** Google Gemini API

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Navigate to project directory
cd everafter

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start development server
pnpm dev
```

The app will be available at `http://localhost:3000`

### Environment Variables

Create a `.env` file with:

```env
NUXT_GEMINI_API_KEY=your_gemini_api_key_here
```

## Project Structure

```
everafter/
├── assets/css/          # Global styles
├── components/          # Vue components
│   ├── landing/         # Landing page sections
│   └── layout/          # Navbar, Footer
├── layouts/             # Page layouts
├── pages/               # Route pages
├── plugins/             # Nuxt plugins
├── server/api/          # Server API routes
├── stores/              # Pinia stores
├── types/               # TypeScript types
└── utils/               # Utility functions
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, AI consultant, categories |
| `/browse` | Browse vendors with filters |
| `/product/:id` | Product detail page |
| `/vendor/:name` | Vendor profile page |
| `/cart` | Shopping cart |
| `/checkout` | Multi-step checkout |
| `/profile` | User profile & orders |
| `/login` | Login page |
| `/register` | Registration page |
| `/about` | How it works |

## Build for Production

```bash
# Build the application
pnpm build

# Preview production build
pnpm preview
```

## License

Copyright 2026 Kedata Indonesia Digital. All rights reserved.
