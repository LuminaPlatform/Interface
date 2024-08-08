import { http, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

// const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "";

export const wagmiConfig = createConfig({
  chains: [mainnet],
  connectors: [
    // walletConnect({ projectId: walletConnectProjectId }),
    metaMask()
  ],
  transports: {
    [mainnet.id]: http()
  }
});
