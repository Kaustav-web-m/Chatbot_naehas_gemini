import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");  // Reset previous error
        setResponse("");  // Reset previous response

        try {
            const res = await axios.post("http://localhost:8080/chat", { prompt });
            setResponse(res.data);  // Update response state with the generated text
        } catch (err) {
            console.error("Error:", err);  // Log the error
            setError("An error occurred while generating a response!");  // Show user-friendly error
        } finally {
            setLoading(false);  // Stop loading spinner
        }
    };

    return (
      <div>
        <div className="card">
            <h1>Naehas Chatbot</h1>
            <form onSubmit={handleSubmit} className="card">
                <textarea
                    placeholder="Enter your prompt here..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? "Generating..." : "Submit"}
                </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {response && <p>{response}</p>}
        </div>
      </div>
    );
};

export default App;
