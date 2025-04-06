import { ethers } from "ethers";
import VoiceNFT from "../contract/VoiceNFT.json";

const { abi } = VoiceNFT; // ✅ Extract only the ABI

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const mintNFT = async (metadataUrl) => {
  if (!window.ethereum) throw new Error("MetaMask not detected");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const account = await signer.getAddress();

  // ✅ Pass only the ABI
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

  // ✅ Call correct mint function (must match your Solidity contract)
  const tx = await contract.mintVoiceNFT(account, metadataUrl);
  const receipt = await tx.wait();

  return receipt.hash;
};

export default mintNFT;
