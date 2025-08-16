import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  
  function increment(){
    setCount(prevCount=> prevCount +1)
  }

  function decrement(){
    setCount (prevCount =>Math.max( prevCount-1, 0))
  }

  const reset = () => setCount(0)

  const parity = count % 2 === 0 ? "Even" : "Odd"
  
  return (
    <>
      <h1>Vite + React Counter App</h1>
      <div className="card">Count is {count}<div style={{ color: count % 2 === 0 ? 'green' : 'red' }}>Count is {parity}</div></div>
      <div className="flex gap-4 mt-4 justify-center">
        <button onClick={increment}>Increment</button> 
        <button onClick={decrement}>Decrement</button> 
        <button onClick={reset}> Reset</button>
      </div>
    </>
  )
}

export default App
