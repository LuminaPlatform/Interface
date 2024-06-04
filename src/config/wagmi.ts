import { http, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { metaMask, walletConnect } from "wagmi/connectors";

// const walletConnectProjectId = process.env.WALLET_CONNECT_PROJECT_ID || "";

export const wagmiConfig = createConfig({
  chains: [mainnet],
  connectors: [
    // walletConnect({ projectId: walletConnectProjectId }),
    metaMask(),
  ],
  transports: {
    [mainnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
