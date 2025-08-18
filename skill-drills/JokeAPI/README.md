# 🎭 Random Joke Generator

A simple React app that fetches random jokes from [JokeAPI](https://jokeapi.dev/) and displays them with a clean UI.  
Users can click a button to fetch a new joke instantly.

---

## 🚀 Features
- Fetches **single-line** and **two-part jokes** from JokeAPI.  
- Category filter: **Any, Programming, Misc, Dark**.  
- Shows **Loading...** while fetching.  
- Button to fetch a new joke on demand.  
- Maintains **joke history** with ability to delete individual jokes.  
- Copy jokes to clipboard with one click.  
- Prevents double-fetch on React Strict Mode using `useRef`.  
- Clean and modern UI with Tailwind CSS styling.  
- History limited to last 10 jokes for better UX.  
- Error handling: shows a message if the API fails.  

---

## 🛠️ Tech Stack
- **React (Vite)** – Frontend Framework
- **Tailwind CSS** – Styling
- **JokeAPI** – External API for jokes
- **useState, useEffect, useRef** – React hooks

---

## ⚡ How to Run Locally

```bash

git clone https://github.com/ayash2004/React-Roadmap-Projects.git
cd skill-drills/JokeAPI
npm install
npm run dev

```

---

What I Learned

- Fetching data from an external API using fetch and async/await.
- Managing loading states for better UX.
- Handling single and two-part jokes dynamically.
- Using useEffect and useRef to control API calls.
- Building a category filter for API requests.
- Maintaining a history list with delete functionality.
- Using the Clipboard API to copy jokes.
- Styling with Tailwind CSS for modern UI/UX.
- Error handling and user feedback.
