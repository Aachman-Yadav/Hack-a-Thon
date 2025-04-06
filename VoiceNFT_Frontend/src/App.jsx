import MintVoiceNFT from "./components/MintVoiceNFT.jsx";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-yellow-300">🎙️ Voice NFT Minter</h1>
      <MintVoiceNFT />
      <footer className="mt-12 text-yellow-200 text-sm opacity-70">
        Made with ❤️ using React + Pinata + Ethereum
      </footer>
    </div>
  );
}

export default App;
