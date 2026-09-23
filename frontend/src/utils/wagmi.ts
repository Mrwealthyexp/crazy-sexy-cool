import { createConfig, http } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

const walletConnectProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID?.trim()
const rpcUrl = import.meta.env.VITE_RPC_URL?.trim()

const connectors = [injected()]

if (walletConnectProjectId) {
  connectors.unshift(
    walletConnect({
      projectId: walletConnectProjectId,
      showQrModal: true,
      metadata: {
        name: 'Crazy Sexy Cool',
        description: 'Wallet-native metaverse client',
        url: 'https://crazysexycool.metaverse',
        icons: ['https://avatars.githubusercontent.com/u/9919?s=200&v=4'],
      },
    }),
  )
}

export const requiredChain = baseSepolia

export const wagmiConfig = createConfig({
  chains: [requiredChain],
  connectors,
  transports: {
    [requiredChain.id]: http(rpcUrl || requiredChain.rpcUrls.default.http[0]),
  },
})
