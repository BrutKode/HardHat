import './App.css';
import { Navbar } from './components/navbar';
import videoBg from './components/videoBg.mp4';
import { Box } from './components/SwapBox/box';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { ViewContractDetails } from './components/Main/sol';

const rpi = {
  id: 1337,
  name: 'Raspberry Pi',
  network: 'rpi',
  iconUrl: 'https://icon-library.com/images/raspberry-pi-icon/raspberry-pi-icon-17.jpg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: 'HTTP://127.0.0.1:8000',
  },
  blockExplorers: {
    default: { name: 'Etherscam', url: 'https://etherscan.io' },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [rpi, chain.goerli, chain.ropsten, chain.rinkeby, chain.kovan],
  [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) })],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function App() {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider theme={midnightTheme({
          accentColor: "rgba(255, 255, 255, 0.1)",
          accentColorForeground: "#00ffe0",
        })} chains={chains}>
          <div className="vid">
            <Navbar />
            <div className="overlay"></div>
            <video src={videoBg} autoPlay loop muted />
            <div className="something">
              <Navbar />  
              <div className="content">
                <ViewContractDetails />
                <Box />
              </div>
            </div>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>

    </>
  );
}

export default App;
