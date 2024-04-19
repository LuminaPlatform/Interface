import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { metaMask, walletConnect } from "wagmi/connectors";

const walletConnectProjectId = process.env.WALLET_CONNECT_PROJECT_ID || "";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    metaMask(),
    walletConnect({ projectId: walletConnectProjectId }),
  ],
  transports: {
    [base.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
