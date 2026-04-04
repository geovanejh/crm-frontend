# React Template

A production-ready React + TypeScript template with feature-based architecture, built with Vite, Tailwind CSS, shadcn/ui, React Router, Zustand, Zod, and React Hook Form.

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

## Scripts

| Script                 | Description                           |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | Start Vite dev server with HMR        |
| `npm run build`        | Type-check + production build         |
| `npm run preview`      | Preview production build              |
| `npm run lint`         | Run ESLint                            |
| `npm run format`       | Format code with Prettier             |
| `npm run format:check` | Check formatting without writing      |
| `npm run test`         | Run tests in watch mode               |
| `npm run test:run`     | Run tests once                        |
| `npm run test:coverage`| Run tests with coverage report        |

## Project Structure

```
src/
├── app/                          App shell (entry point, router, global CSS)
│   ├── main.tsx                  Application entry point
│   ├── router.tsx                Route definitions
│   └── index.css                 Tailwind + shadcn/ui theme
├── features/                     Domain-specific modules
│   ├── counter/stores/           Counter Zustand store
│   ├── home/pages/               Home page + tests
│   ├── layout/components/        RootLayout, Header, Footer
│   └── user/                     User services + types
└── shared/                       Cross-feature shared code
    ├── components/               ErrorBoundary, NotFoundPage
    │   └── ui/                   shadcn/ui components (Button, etc.)
    ├── hooks/                    Custom hooks (useLocalStorage)
    ├── lib/                      httpClient, cn() utility
    ├── config/                   Type-safe env variable access
    └── test/                     Test setup + renderWithProviders
```

## Architecture

- **Feature-based organization** — code is grouped by domain, not by file type. Each feature owns its components, stores, services, types, and tests
- **Routing**: React Router v7 with nested layouts (`RootLayout` → pages), configured in `src/app/router.tsx`
- **State**: Zustand stores scoped to their feature — no providers needed
- **API**: Typed `httpClient` wrapper over fetch in `src/shared/lib/`, service modules inside each feature
- **Forms**: React Hook Form + Zod via `@hookform/resolvers` for type-safe form validation
- **Validation**: Zod schemas for data validation at system boundaries
- **Styling**: Tailwind CSS v4 + shadcn/ui components with CSS variables and dark mode support
- **Testing**: Vitest + React Testing Library with global test utilities in `src/shared/test/`

### Adding a New Feature

Create a directory under `src/features/<feature-name>/` with only what you need:

```
src/features/<feature-name>/
├── components/    Feature-specific components
├── hooks/         Feature-specific hooks
├── pages/         Route-level components
├── services/      API service modules
├── stores/        Zustand stores
├── types/         TypeScript interfaces
└── __tests__/     Feature tests
```

Then register routes in `src/app/router.tsx`.

### Adding shadcn/ui Components

```bash
npx shadcn@latest add <component>
```

Components are installed into `src/shared/components/ui/` and can be customized directly.

## Conventions

- **Named exports** over default exports
- **PascalCase** for component files, **camelCase** for everything else
- **Direct imports** with `@/` path alias (no barrel exports)
- **Collocated tests** in `__tests__/` directories next to source files
- **Feature isolation** — features should not import from other features; shared code goes in `src/shared/`

## Tech Stack

- React 19 + TypeScript 5.9
- Vite 8
- Tailwind CSS 4 + shadcn/ui
- React Router 7
- Zustand 5
- Zod + React Hook Form
- Vitest + React Testing Library
- ESLint + Prettier + Husky + lint-staged
