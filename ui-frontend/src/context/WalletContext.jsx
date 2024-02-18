import { Contract } from "ethers";
import { BrowserProvider } from "ethers";
import { createContext, useEffect, useState } from "react";
import abi from "../Assessment.json";
import { Network } from "ethers";

const WalletContext = createContext({
  account: "",
  connectWallet: () => {},
  contract: undefined,
});

const contractAddr = "0xe643d74B96047765c9E67B43aFBb9Df8758c0b63";

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [eth, setEth] = useState();
  const [contract, setContract] = useState();

  const initWallet = async () => {
    const provider = new BrowserProvider(window.ethereum);
    if (provider) {
      setEth(provider);
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request the user's accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  
        // Assuming you want the first account from the list
        const selectedAddress = accounts[0];
  
        const network = await eth.getNetwork();
  
        if (network.chainId !== Network.from("sepolia").chainId) {
          await window.ethereum.send("wallet_addEthereumChain", [
            {
              chainId: "0xaa36a7",
              rpcUrls: ["https://ethereum-sepolia.publicnode.com"],
              chainName: "Sepolia",
              nativeCurrency: {
                name: "SepoliaETH",
                symbol: "ETH",
                decimals: 18,
              },
            },
          ]);
        }
  
        setAccount(selectedAddress);
  
        // Note: MetaMask doesn't provide a direct equivalent to getSigner()
        // You may need to adapt your contract interactions accordingly
        getContract();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getContract = () => {
    if (eth && account) {
      const contract = new Contract(contractAddr, abi, eth);
      setContract(contract);
    }
  };
  
  useEffect(() => {
    initWallet();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        account,
        connectWallet,
        contract,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;
