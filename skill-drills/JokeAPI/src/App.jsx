import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(true);
  const didMount = useRef(false)
  const [category, setCategory] = useState("Any")
  const [history,setHistory] = useState([])

  async function fetchJoke() {
    setLoading(true);
    try {
      const response = await fetch(
        `https://v2.jokeapi.dev/joke/${category}?type=single,twopart`
      );
      const data = await response.json();
      console.log("data is ", data);
      
      const newjoke = data.type === "single" ? data.joke : ` ${data.setup} - ${data.delivery} `  // sorting on basis of joke type (single or two-part jokes (setup + delivery))
      setJoke (newjoke)
      setHistory((prev) => [newjoke, ...prev].slice(0, 10))  // Add to History (Limit 10 Jokes)
    } catch (error) {
      console.log("Failed to fetch a Joke", error);
      setJoke("Oops! Couldn’t fetch a joke. Try again.");
    }
    setLoading(false);
  }

  useEffect(() => {
    if(!didMount.current){
    fetchJoke();
    didMount.current = true;
    }
  }, []);

  function deleteJoke(index) {
  setHistory((prev) => prev.filter((_, i) => i !== index))
  }

  function copyJoke() {
  navigator.clipboard.writeText(joke)
    .then(() => alert("Joke copied to clipboard!"))
    .catch(() => alert("Failed to copy joke"))
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 text-center transition-all duration-500">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Random Joke Generator
        </h1>
        <span className="text-black">Select Category </span> <select className="mb-6 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 shadow-sm transition duration-300"
          value={category} onChange={(e) => setCategory(e.target.value)}> 

          <option value="Any">Any</option>
          <option value="Programming">Programming</option>
          <option value="Misc">Misc</option>
          <option value="Dark">Dark</option>
        </select> 

        {loading ? (
          <p className="text-gray-500 italic animate-pulse">Loading...</p>
        ) : (
          <p className="text-lg text-gray-700 mb-6 transition-all duration-500">
            {joke}
          </p>
        )}

        <h2 className="text-3xl font-bold text-gray-800 mb-6">Joke History</h2>
        <ul>
        {history.map((item, index) =>(
          <li className="text-orange-500" key={index}> {item} <button onClick={() => deleteJoke(index)}>❌</button> </li>
        ))}
        </ul>

        <button
          onClick={fetchJoke}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 active:scale-95 transition-all duration-300">
          🎲 Get New Joke
        </button>
        <button onClick={copyJoke}
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 active:scale-95 transition-all duration-300">
        📋 Copy Joke</button>
      </div>
     </div> 
  );
}

export default App;
