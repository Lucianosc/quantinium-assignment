/**
 * Web3 provider wrapper component integrating RainbowKit, Wagmi, and React Query
 */
"use client";
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { avalancheFuji, sepolia } from "viem/chains";
import { WagmiProvider } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";

/**
 * @param {React.ReactNode} children - Child components to be wrapped
 */

// Component for keeping all the providers in one place as it can grow quite big in some react apps

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  // Configure RainbowKit and Wagmi defaults
  const config = getDefaultConfig({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID", // WalletConnect v2 project ID
    chains: [sepolia, avalancheFuji], // Eth and Avax testnets
    ssr: true,
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
