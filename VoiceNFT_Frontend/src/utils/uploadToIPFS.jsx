const uploadToIPFS = async (audioFile, imageFile) => {
    const PINATA_JWT = import.meta.env.VITE_PINATA_JWT;
  
    // Upload audio
    const audioForm = new FormData();
    audioForm.append("file", audioFile);
  
    const audioRes = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: PINATA_JWT,
      },
      body: audioForm,
    });
    const audioData = await audioRes.json();
    const audioUrl = `https://gateway.pinata.cloud/ipfs/${audioData.IpfsHash}`;
  
    // Upload image
    const imageForm = new FormData();
    imageForm.append("file", imageFile);
  
    const imageRes = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: PINATA_JWT,
      },
      body: imageForm,
    });
    const imageData = await imageRes.json();
    const imageUrl = `https://gateway.pinata.cloud/ipfs/${imageData.IpfsHash}`;
  
    // Create metadata
    const metadata = {
      name: "Voice NFT",
      description: "Generated from voice and image",
      image: imageUrl,
      animation_url: audioUrl, // 👈 THIS is what enables audio playback
    };
  
    const metadataBlob = new Blob([JSON.stringify(metadata)], { type: "application/json" });
    const metadataFile = new File([metadataBlob], "metadata.json");
  
    const metaForm = new FormData();
    metaForm.append("file", metadataFile);
  
    const metadataRes = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: PINATA_JWT,
      },
      body: metaForm,
    });
  
    const metaData = await metadataRes.json();
    return `https://gateway.pinata.cloud/ipfs/${metaData.IpfsHash}`;
  };
  
  export default uploadToIPFS;
  