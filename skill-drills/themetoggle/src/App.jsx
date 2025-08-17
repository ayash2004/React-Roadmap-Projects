import { useEffect, useState } from 'react'
import './App.css'

function App(){
  const [theme, setTheme]= useState("light")
  const profiles = [
  { name: "Yash Agrawal", role: "Frontend Developer", desc: "Learning React by building fun projects 🚀" },
  { name: "Ada Lovelace", role: "Mathematician", desc: "First computer programmer in history." },
  { name: "Elon Musk", role: "Entrepreneur", desc: "CEO of SpaceX and Tesla, pushing space exploration." },
  { name: "Marie Curie", role: "Scientist", desc: "Pioneer in radioactivity research, Nobel laureate." }
  ];

  useEffect(()=> {
    const savedtheme= localStorage.getItem("theme")
    if(savedtheme) setTheme(savedtheme)
    else setTheme("light")
  },[]);

  const toggleTheme= ()=> {
    const newtheme= theme === "light" ? "dark" : "light" ;
    setTheme(newtheme);
    localStorage.setItem("theme", newtheme);
  }
  
return(
  <>
  <h2 className='text-3xl bold '>Current Theme  is {theme}</h2>
  <div className="mt-3 grid grid-cols-2 gap-4">
  {profiles.map((person, index)=> (
    <div className= {`p-4 border rounded-lg shadow-md transition  ${theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"}`} key={index}>
      <h2 className='text-xl'>{person.name}</h2>
      <p className='italic'>{person.role}</p>
      <p className='mt-2'>{person.desc}</p>
    </div>
    
  ))}
  </div>
  <button onClick={toggleTheme} aria-label="Toggle Theme" className="mb-6 px-4 py-2 rounded-lg border shadow mt-5">
    {theme === "light" ? "🌙 Switch to Dark" : "☀️ Switch to Light"}
  </button>
</>
)
}
export default App


