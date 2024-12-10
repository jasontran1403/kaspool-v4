import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { createThirdwebClient, defineChain } from "thirdweb";
import {
  ConnectButton,
  useWalletInfo,
  useDisconnect,
  useActiveWalletChain,
  useActiveAccount,
  darkTheme,
} from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { ToastContainer, toast } from "react-toastify";

const client = createThirdwebClient({
  clientId: "c4917b86730652d8197cc695ca2b38eb",
});

const BACKGROUND_COLOR = "#272487";
const TEXT_COLOR = "#E8FE61";

const USDT_CONTRACT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955"; // USDT BEP20 Contract Address
const USDT_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

const BSC_CHAIN_ID = 56; // Binance Smart Chain Mainnet Chain ID

const wallets = [
  createWallet("io.metamask"),
  // createWallet("com.coinbase.wallet"),
  // createWallet("com.trustwallet.app"),
  // createWallet("org.uniswap"),
  createWallet("com.safepal"),
];

const TrustWalletConnect = ({ transparent, label }) => {
  const chainId = useActiveWalletChain();
  const activeAccount = useActiveAccount();
  const { isConnected } = useWalletInfo(client);
  const disconnect = useDisconnect(); // Sử dụng hook useDisconnect
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [isLocalConnected, setIsLocalConnected] = useState(
    localStorage.getItem("walletAddress")?.length > 0
  );

  const getUSDTBalance = async (walletAddress) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://bsc-dataseed.binance.org/"
      );
      const usdtContract = new ethers.Contract(
        USDT_CONTRACT_ADDRESS,
        USDT_ABI,
        provider
      );

      // Lấy số dư token
      const rawBalance = await usdtContract.balanceOf(walletAddress);
      const decimals = await usdtContract.decimals();

      const balance = ethers.utils.formatUnits(rawBalance, decimals);
      return balance;
    } catch (error) {
      console.error("Error fetching USDT balance:", error);
      return "0";
    }
  };

  const bscChain = defineChain({
    id: 56, // BSC Mainnet chain ID
    rpc: "https://bsc-dataseed.binance.org/", // BSC RPC endpoint
  });

  // useEffect(() => {
  //   const fetchBalance = async () => {
  //     if (activeAccount?.address) {
  //       const balance = await getUSDTBalance(activeAccount.address);
  //       setUsdtBalance(balance);
  //     }
  //   };

  //   fetchBalance();
  // }, [activeAccount]);

  useEffect(() => {
    if (activeAccount !== undefined && activeAccount.address) {
      if (localStorage.getItem("walletAddress") !== activeAccount.address) {
        toast.success("Connect wallet success", {
          position: "top-right",
          autoClose: 1500,
          onClose: (() => {
            window.location.reload();
          })
        });
      }
      localStorage.setItem("walletAddress", activeAccount.address);
      localStorage.setItem("publicKey", activeAccount.address);
      localStorage.setItem("walletStateInit", activeAccount.address);
      if (chainId.id !== BSC_CHAIN_ID) {
        toast.warning("Please switch your network to Binance Smart Chain", {
          position: "top-right",
          autoClose: 1500,
        });
      }
    }
  }, [activeAccount]);

  const handleConnect = async () => {
    if (activeAccount?.address) {
      if (chainId.id !== BSC_CHAIN_ID) {
        toast.warning("Please switch your network to Binance Smart Chain", {
          position: "top-right",
          autoClose: 1500,
        });
      }
    }
  };

  // Handle wallet disconnection
  const disconnectWallet = () => {
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("publicKey");
    localStorage.removeItem("walletStateInit");
    localStorage.removeItem("is_in_tree");
    localStorage.removeItem("is_lock");
    localStorage.removeItem("access_token");
    localStorage.removeItem("bep20");
    localStorage.removeItem("management");
    window.location.href = "/";
  };

  return (
    <div>
      <ConnectButton
        connectButton={{ label }}
        chain={bscChain}
        client={client}
        wallets={wallets}
        showAllWallets={false}
        isEmbed={true}
        connectModal={{
          size: "compact",
          title: "Kaspool",
          showThirdwebBranding: false,
          className: "custom-modal-classname", // Add your modal-specific class name here
        }}
        onConnect={() => handleConnect()}
        onDisconnect={() => disconnectWallet()}
      />
      {/* <ToastContainer stacked /> */}
    </div>
  );
};

export default TrustWalletConnect;
