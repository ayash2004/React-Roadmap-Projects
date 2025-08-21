import { useState } from 'react'
import {  databases } from './appwrite/appwriteconfig'

const databaseid = import.meta.env.VITE_DATABASE_ID;
const collectionid = import.meta.env.VITE_COLLECTION_ID;

function App() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState("")
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

    // Check if fields are empty
    if (name.trim() === "") {
      newErrors.name = "Name is required"
    }
    
    if (email.trim() === "") {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email address"
    }
    
    if (message.trim() === "") {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    
    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      submitForm()
      return true
    }
    
    // Clear success message if there are errors
    setSuccess("")
    return false
  }
  
  async function submitForm() {
    await saveFormData()
    console.log(`The name is ${name}, Email is ${email} and the Content typed is ${message}`)
    
    // Clear form
    setName("")
    setEmail("")
    setMessage("")
    setErrors({})
    setSuccess("Message sent successfully!")
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setSuccess("")
    }, 5000)
  }
  
  async function saveFormData() {
    try {
      const response = await databases.createDocument(
        databaseid,
        collectionid,
        "unique()", // auto-generate ID
        {
          name: name,
          email: email,
          message: message, // 
          createdAt: new Date().toISOString()
        }
      );
      console.log("✅ Data saved:", response);
    } catch (error) {
      console.error("❌ Error saving data:", error);
    }
    }
 

  const handleSubmit = (e) => {
    e.preventDefault()
    validateForm()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">  
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h1>
          <p className="text-gray-600">We'd love to hear from you</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-green-400 text-xl">✓</span>
              </div>
              <div className="ml-3">
                <p className="text-green-800 font-medium">{success}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.name
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <span className="mr-1">⚠</span>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.email
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <span className="mr-1">⚠</span>
                {errors.email}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              rows="4"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                errors.message
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <span className="mr-1">⚠</span>
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send Message
          </button>
        </div>

        {/* Form Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>All fields marked with * are required</p>
        </div>
      </div>
    </div>
  )
}

export default App

// import { useState } from 'react'
// import { submitContactForm } from  './appwrite/appwriteconfig' // Import the Appwrite function

// function App() {
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [message, setMessage] = useState("")
//   const [success, setSuccess] = useState("")
//   const [errors, setErrors] = useState({})
//   const [isSubmitting, setIsSubmitting] = useState(false) // Add loading state

//   const validateForm = () => {
//     const newErrors = {}
//     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

//     // Check if fields are empty
//     if (name.trim() === "") {
//       newErrors.name = "Name is required"
//     }
    
//     if (email.trim() === "") {
//       newErrors.email = "Email is required"
//     } else if (!emailRegex.test(email)) {
//       newErrors.email = "Invalid email address"
//     }
    
//     if (message.trim() === "") {
//       newErrors.message = "Message is required"
//     }

//     setErrors(newErrors)
    
//     // If no errors, submit the form
//     if (Object.keys(newErrors).length === 0) {
//       submitForm()
//       return true
//     }
    
//     // Clear success message if there are errors
//     setSuccess("")
//     return false
//   }

//   async function submitForm() {
//     setIsSubmitting(true) // Start loading
    
//     try {
//       // Submit to Appwrite
//       const result = await submitContactForm({
//         name: name.trim(),
//         email: email.trim(),
//         message: message.trim()
//       });

//       if (result.success) {
//         console.log(`The name is ${name}, Email is ${email} and the Content typed is ${message}`)
        
//         // Clear form
//         setName("")
//         setEmail("")
//         setMessage("")
//         setErrors({})
//         setSuccess("Message sent successfully!")
        
//         // Clear success message after 5 seconds
//         setTimeout(() => {
//           setSuccess("")
//         }, 5000)
//       } else {
//         // Handle Appwrite error
//         setErrors({ submit: result.error })
//       }
//     } catch (error) {
//       console.error('Unexpected error:', error)
//       setErrors({ submit: "An unexpected error occurred. Please try again." })
//     } finally {
//       setIsSubmitting(false) // Stop loading
//     }
//   }
  
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     validateForm()
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 p-6 flex items-center justify-center">
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
//         {/* Header */}
//         <div className="text-center mb-8">  
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h1>
//           <p className="text-gray-600">We'd love to hear from you</p>
//         </div>

//         {/* Success Message */}
//         {success && (
//           <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <span className="text-green-400 text-xl">✓</span>
//               </div>
//               <div className="ml-3">
//                 <p className="text-green-800 font-medium">{success}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Error Message for submission */}
//         {errors.submit && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <span className="text-red-400 text-xl">⚠</span>
//               </div>
//               <div className="ml-3">
//                 <p className="text-red-800 font-medium">{errors.submit}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="space-y-6">
//           {/* Name Field */}
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//               Name *
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter your name"
//               disabled={isSubmitting}
//               className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
//                 errors.name
//                   ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
//                   : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
//               } ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`}
//             />
//             {errors.name && (
//               <p className="mt-1 text-sm text-red-600 flex items-center">
//                 <span className="mr-1">⚠</span>
//                 {errors.name}
//               </p>
//             )}
//           </div>

//           {/* Email Field */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//               Email *
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               disabled={isSubmitting}
//               className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
//                 errors.email
//                   ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
//                   : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
//               } ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`}
//             />
//             {errors.email && (
//               <p className="mt-1 text-sm text-red-600 flex items-center">
//                 <span className="mr-1">⚠</span>
//                 {errors.email}
//               </p>
//             )}
//           </div>

//           {/* Message Field */}
//           <div>
//             <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
//               Message *
//             </label>
//             <textarea
//               id="message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Enter your message"
//               rows="4"
//               disabled={isSubmitting}
//               className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
//                 errors.message
//                   ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
//                   : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
//               } ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`}
//             />
//             {errors.message && (
//               <p className="mt-1 text-sm text-red-600 flex items-center">
//                 <span className="mr-1">⚠</span>
//                 {errors.message}
//               </p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//             className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
//               isSubmitting ? 'opacity-70 cursor-not-allowed transform-none' : ''
//             }`}
//           >
//             {isSubmitting ? (
//               <div className="flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                 Sending...
//               </div>
//             ) : (
//               'Send Message'
//             )}
//           </button>
//         </div>

//         {/* Form Info */}
//         <div className="mt-6 text-center text-sm text-gray-500">
//           <p>All fields marked with * are required</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default App