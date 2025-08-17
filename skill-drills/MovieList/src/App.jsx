import { useState } from 'react'
import './App.css'

function App() {
  
  const arrayMovie = ["Inception", "Interstellar", "Tamasha"," The Social Dilemma", "3Idiots" ]
  const [mov, setMov] = useState(arrayMovie)
  const [addmovie, setAddMovie] = useState("")
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  
  const add = () =>{
    if (addmovie.trim() === "") return;
    setMov([...mov, addmovie]);
    console.log("Added Movie ",addmovie, "Updated Movie List is",mov);
    
    setAddMovie("");
  }

  const startEdit = (i) => {
    setEditIndex(i);
    setEditText(mov[i]);
    console.log("Editing Movie with Index", i);
    
  };

  const saveEdit = (i) => {
    const updatedMovies = [...mov];
    updatedMovies[i] = editText;
    console.log("Updating Movie ");
    setMov(updatedMovies);
    console.log("Updated Successfully",mov);
    
    setEditIndex(null);
    setEditText("");
  };


  const delMovie = (movie, i) => {
    
    setMov(mov.filter((movie, index) => index !== i))
    console.log(" DelMovie with Index",i,"which is",movie);
    
  }
  return (
    <>
       <h1>🎬 My Favorite Movies</h1>
      <div className=''>
        {/* {console.log(mov)} */}
        <ul className='list-none space-y-1'>
        {mov.map((movie, i) =>(
          <li className= 'p-2' key={i}> 

          {editIndex === i ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveEdit(i);
                  }
                  if (e.key === "Escape") { // extra: cancel on ESC
                    setEditIndex(null);
                    setEditText("");
                  }
                }}
                />
                <button onClick={() => saveEdit(i)}>💾 Save</button>
                <button onClick={() => setEditIndex(null)}>❌ Cancel</button>
              </>
            ) : (
              <>
                {movie}{" "}
                <button onClick={() => startEdit(i)}>✏️ Update</button>
                <button onClick={() => delMovie(movie, i)}>❌ Delete</button>
              </>
            )}
          </li>
          
        ))}
        </ul>
      </div>
      <input type="text" placeholder='Enter Movie name' value={addmovie}  onChange={(e)=> setAddMovie(e.target.value)}/><button onClick={add}>Add Movie</button>

      <p>Currently typing: {addmovie}</p>
    </>
  )
}

export default App
