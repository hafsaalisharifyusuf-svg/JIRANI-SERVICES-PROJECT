import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    console.log("API called");

    axios.get("http://localhost:5000/")
      .then((res) => {
        console.log("SUCCESS:", res.data);
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log("ERROR:", err);
        setMessage("Failed to connect to backend");
      });

  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Jirani Services Frontend</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;