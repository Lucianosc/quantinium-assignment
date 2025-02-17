# Quantinium assignment

Built with Next.js "create-next-app", featuring wallet integration, message signing, and animated UI components.

## Getting Started

1. Clone the repository.

2. Install dependencies:

```bash
# Using yarn (recommended for this project)
yarn install

# Using other package managers
npm install
pnpm install
```

3. Start the development server:

```bash
# Using yarn with turborepo to run the project locally
yarn dev

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│ ├── layout.tsx
│ └── page.tsx
├── components/
│ ├── SignMessage.tsx  # Message signing component
│ └── NavBar.tsx # Navigation with wallet connection
├── Providers/
│ └── Providers.tsx # Web3 providers setup
└── ...
```

## Tech Stack

- **Framework**: Next.js
- **Web3 Integration**:
  - RainbowKit
  - Wagmi
  - Viem
- **Styling & Animation**:
  - Tailwind CSS
  - Framer Motion
- **Package Management**:
  - Yarn (default)

