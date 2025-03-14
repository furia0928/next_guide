import { useState } from 'react';
import { fetchData } from '@/lib/axiosInstance';

const API_BASE_URL = 'http://localhost:8000';

export default function JanusDemo() {
  const [textPrompt, setTextPrompt] = useState('');
  const [textResponse, setTextResponse] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageResponse, setImageResponse] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [analysisResponse, setAnalysisResponse] = useState('');

  const generateText = async () => {
    const res = await fetchData(`/posts`, 'POST', {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
    });
    console.log(res);
    setTextResponse(res.id);
  };

  const generateImage = async () => {
    const res = await fetch(`http://0.0.0.0:8001/generate-image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: imagePrompt }),
    });
    const data = await res.json();
    setImageResponse(data.result);
  };

  const analyzeImage = async () => {
    const formData = new FormData();
    formData.append('file', imageFile);

    const res = await fetch(`http://0.0.0.0:8001/analyze-image`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setAnalysisResponse(data.result);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Janus API Demo</h1>

      <div>
        <h3>Generate Text</h3>
        <input
          value={textPrompt}
          onChange={(e) => setTextPrompt(e.target.value)}
          placeholder="Enter text prompt"
        />
        <button onClick={generateText}>Generate</button>
        <p>Response: {textResponse}</p>
      </div>

      <div>
        <h3>Generate Image</h3>
        <input
          value={imagePrompt}
          onChange={(e) => setImagePrompt(e.target.value)}
          placeholder="Enter image prompt"
        />
        <button onClick={generateImage}>Generate</button>
        {imageResponse && (
          <img src={imageResponse} alt="Generated" width={200} />
        )}
      </div>

      <div>
        <h3>Analyze Image</h3>
        <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
        <button onClick={analyzeImage}>Analyze</button>
        <p>Analysis: {analysisResponse}</p>
      </div>
    </div>
  );
}
