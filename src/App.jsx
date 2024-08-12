import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setAudioUrl(URL.createObjectURL(uploadedFile)); // Create a local URL for the uploaded file
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPrediction(response.data.predicted_genre);
    } catch (error) {
      console.error("There was an error uploading the file!", error);
    }
  };

  return (
    <div className="w-full h-screen bg-blue-900 text-neutral-800 font-semibold flex flex-col items-center justify-center">
      <div className="App flex flex-col items-center justify-center gap-2 bg-white p-8 rounded-3xl shadow-2xl">
        <h1 className="text-4xl mb-5 font-bold text-neutral-700">Music Genre Predictor</h1>
        <form onSubmit={handleSubmit} className="flex flex-row gap-2 items-center justify-center">
          <input type="file" onChange={handleFileChange} className="text-blue-900 text-lg font-semibold" />
          <button type="submit" className="p-2 px-3 bg-blue-900 rounded-xl text-white text-lg shadow-xl">Predict Genre</button>
        </form>
        {audioUrl && (
        <div className="mb-5 flex flex-col items-center justify-center mt-4 ">
          <h2>Audio Preview:</h2>
          <audio controls className="">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
        {prediction && <h2 className="p-2 px-3 bg-blue-900 text-white rounded-full text-2xl">Predicted Genre: {prediction.toUpperCase()}</h2>}
      </div>
    </div>
  );
}

export default App;
