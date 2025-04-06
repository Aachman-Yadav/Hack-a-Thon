import axios from "axios";

const JWT = import.meta.env.VITE_PINATA_JWT;

export async function uploadToPinata(file) {
  const formData = new FormData();
  formData.append("file", file);

  const metadata = JSON.stringify({
    name: "VoiceNFT Metadata",
  });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 1,
  });
  formData.append("pinataOptions", options);

  const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
    maxBodyLength: "Infinity",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: JWT,
    },
  });

  const audioHash = res.data.IpfsHash;
  const jsonRes = await axios.post(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    {
      name: "VoiceNFT",
      description: "Your voice as an NFT",
      audio: `ipfs://${audioHash}`,
    },
    {
      headers: {
        Authorization: JWT,
        "Content-Type": "application/json",
      },
    }
  );

  return `ipfs://${jsonRes.data.IpfsHash}`;
}
