import { useState, useEffect } from "react";
import uploadToIPFS from "../utils/uploadToIPFS.jsx";
import mintNFT from "../utils/mintNFT.jsx";

const MintVoiceNFT = () => {
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isMinting, setIsMinting] = useState(false);

  const handleUpload = async () => {
    if (!audio || !image) return alert("Please upload both audio and image files!");

    try {
      setIsMinting(true);
      const metadataUrl = await uploadToIPFS(audio, image);
      const txHash = await mintNFT(metadataUrl);
      alert(`✅ NFT Minted Successfully!\nTX Hash: ${txHash}`);
      setAudio(null);
      setImage(null);
      setPreviewUrl(null);
    } catch (err) {
      alert("❌ Minting failed: " + err.message);
    } finally {
      setIsMinting(false);
    }
  };

  useEffect(() => {
    if (audio) {
      const url = URL.createObjectURL(audio);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [audio]);

  return (
    <div className="bg-zinc-900 p-8 rounded-xl shadow-xl border border-yellow-500/20 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">🎤 Upload Voice + Image to Mint NFT</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-4 block w-full text-sm text-yellow-100 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-yellow-200 file:text-yellow-700 hover:file:bg-yellow-300"
      />

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setAudio(e.target.files[0])}
        className="mb-4 block w-full text-sm text-yellow-100 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-yellow-200 file:text-yellow-700 hover:file:bg-yellow-300"
      />

      {previewUrl && <audio controls src={previewUrl} className="w-full mb-4" />}

      <button
        onClick={handleUpload}
        disabled={isMinting}
        className={`w-full py-3 px-6 text-black font-bold rounded-full transition-all duration-300 ${
          isMinting
            ? "bg-yellow-300 cursor-wait"
            : "bg-gradient-to-r from-yellow-400 to-amber-500 hover:shadow-xl"
        }`}
      >
        {isMinting ? "Minting..." : "Mint Voice NFT"}
      </button>
    </div>
  );
};

export default MintVoiceNFT;
