import { useState } from 'react'
import './App.css'

function App() {
  const users = ["Yash", "Akash", "Shubham", "Swati", "Kiran"]
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          🔍 Search & Filter Users
        </h1>

        <div className="relative">
        <input
          // className="w-full px-4 py-2 pr-10 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800 placeholder-gray-400"
          className="w-full px-4 py-2 pr-10 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800 placeholder-gray-400"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a user..."  
        />
        {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 hover:bg-red-400 text-white text-xs shadow-md transition"
            >
              ❌
            </button>
          )}
        </div>

        <ul className="space-y-3 mt-2">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <li
                key={index}
                className="p-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition cursor-pointer"
              >
                {user}
              </li>
            ))
          ) : (
            <p className="text-gray-500 italic">No users found</p>
          )}
        </ul>
      </div>
    </div>
  )
}

export default App
