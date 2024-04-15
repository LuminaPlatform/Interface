import { http, createConfig } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import { metaMask, walletConnect } from "wagmi/connectors";
const walletConnectProjectId = process.env.WALLET_CONNECT_PROJECT_ID || "";

export const wagmiConfig = createConfig({
  chains: [mainnet, base],
  connectors: [
    metaMask(),
    walletConnect({ projectId: "" }),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
