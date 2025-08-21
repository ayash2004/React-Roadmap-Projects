import { Client, Databases } from "appwrite";
const endpoint = import.meta.env.VITE_END_POINT
const projectid = import.meta.env.VITE_PROJECT_ID
const client = new Client();

client
  .setEndpoint(endpoint) // Or your self-hosted endpoint
  .setProject(projectid); // Get from Appwrite console

const databases = new Databases(client);

export { client, databases };

// import { Client, Databases, ID } from 'appwrite';

// // Initialize Appwrite client
// const client = new Client();

// client
//     .setEndpoint('https://nyc.cloud.appwrite.io/v1') // Your API Endpoint 
//     .setProject('68a6a9d60016a7417862'); // Replace with your Project ID

// // Initialize services
// const databases = new Databases(client);

// // Configuration constants
// export const config = {
//     databaseId: '68a6aabc002b0f3551fb', // Replace with your Database ID
//     collectionId: '68a6aae00022b124d539' // Replace with your Collection ID
// };

// // Function to submit contact form
// export const submitContactForm = async (formData) => {
//     try {
//         const response = await databases.createDocument(
//             config.databaseId,
//             config.collectionId,
//             ID.unique(), // Generate unique ID
//             {
//                 name: formData.name,
//                 email: formData.email,
//                 message: formData.message,
//                 createdAt: new Date().toISOString()
//             }
//         );
        
//         console.log('Form submitted successfully:', response);
//         return { success: true, data: response };
//     } catch (error) {
//         console.error('Error submitting form:', error);
//         return { success: false, error: error.message };
//     }
// };

// // Function to get all contact submissions (optional - for admin use)
// export const getContactSubmissions = async () => {
//     try {
//         const response = await databases.listDocuments(
//             config.databaseId,
//             config.collectionId
//         );
//         return { success: true, data: response.documents };
//     } catch (error) {
//         console.error('Error fetching submissions:', error);
//         return { success: false, error: error.message };
//     }
// };