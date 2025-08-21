✅ Contact Form

A simple React project to capture user details (Name, Email, Message) with validation, error handling, and success messages. Built with React + Tailwind CSS for a modern and responsive UI.
---

🚀 Features

✏️ Input Fields – Collect Name, Email, and Message.
⚠️ Form Validation – Ensures required fields are filled and email format is valid.
✅ Success Message – Displays a success alert on successful submission.
❌ Error Handling – Inline error messages with red highlights.
🧹 Auto Reset – Clears form and errors after successful submission.
🎨 Modern UI – Gradient background, smooth transitions, responsive design.

---
⚡ How to Run Locally

```
git clone https://github.com/ayash2004/React-Roadmap-Projects.git
cd Intermediate-projects/ContactForm
npm install
npm run dev

```
🛠️ Tech Stack

React (Vite) – Frontend framework
Tailwind CSS – Styling
JavaScript (ES6+) – Core logic

---

📖 What I Learned

Through this project, I practiced and understood:

✅ Form handling and controlled components with React’s useState.
✅ Implementing client-side validation using regex and conditions.
✅ Managing success/error states dynamically.
✅ Adding auto-dismiss success messages with setTimeout.
✅ Styling inputs, errors, and success messages using Tailwind CSS.
✅ Improving UX with responsive layouts and hover/focus states.

---

## 🚀 Appwrite Integration

This project now uses **Appwrite** as the backend database for storing validated form data.

### 🔧 Setup Instructions

1. **Install Appwrite SDK**
   ```bash
   npm install appwrite
   ```

2. Configure Appwrite Client
Create a file appwriteConfig.js:

```bash
import { Client, Databases } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Add your endpoint here
  .setProject("YOUR_PROJECT_ID");

export const databases = new Databases(client);

```

3. Database Setup in Appwrite Console

Create a Database (e.g., userForms)
Create a Collection (e.g., formData)

Add attributes:

name (string)
email (string)
password (string or sensitive field)

Set permissions:

For testing → enable Any → Create
For production → enable Users → Create and use authentication

4. Saving Form Data
After validation, form data is stored in Appwrite:
```bash
await databases.createDocument(
  DATABASE_ID,
  COLLECTION_ID,
  "unique()",
  { name, email, password }
);
```
---

📌 Notes
- Have a look at the .env_sample file
- Make sure to replace DATABASE_ID, COLLECTION_ID, and PROJECT_ID with values from your Appwrite console.
- For production, use Appwrite Auth to restrict access.

---

🚀 Features Added

✅ Form validation (frontend)
✅ Appwrite database integration for storing form submissions
✅ Error handling for failed requests
