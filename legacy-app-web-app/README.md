# DockingLabs Web Application

A modern Next.js web application with TypeScript, Tailwind CSS, and Radix UI.

## Features

- 🚀 Next.js 14 with App Router
- 💎 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 🔒 Authentication with NextAuth.js
- 🎯 Radix UI for accessible components
- 📱 Responsive design
- 🌙 Dark mode support

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd webapp
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
pnpm dev
```

## Project Structure

```
src/
├── app/                # Next.js app router
├── components/         # Reusable UI components
├── hooks/             # Custom React hooks
├── lib/              # Utility functions
├── types/            # TypeScript types
├── utils/            # Helper functions
└── styles/           # Global styles
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Open a Pull Request

## License

This project is licensed under the MIT License.
