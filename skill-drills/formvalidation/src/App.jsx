import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  
  function handleChange(e) {
    
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
    }
    
  const isFormValid = formData.name.trim() !== "" &&
    /\S+@\S+\.\S+/.test(formData.email) &&
    formData.password.length >= 6;
    
  function handleSubmit(e) {(e.preventDefault());
    alert(`Name: ${formData.name}\nEmail: ${formData.email}\nPassword: ${formData.password}`);
    setFormData({ name: "", email: "", password: "" });
      
  }

  function getPasswordStrength(password){
    if (!password.length) return 
    if (password.length < 6 ) return "Weak"
    if (password.length < 10) return "Medium"
    return "Strong"
  }
  return (
    <>
      <div className=' flex gap-4 mt-8'>
      <h1>Sign-Up Form</h1>
      <form onSubmit={handleSubmit}> 
          <div><input type="text" value={formData.name} name='name'  placeholder='Enter name' onChange={handleChange}/> </div>
          <div><input type="email" value={formData.email} name="email" placeholder='Enter Email'onChange={handleChange} /> </div>
          <div><input type="password" value={formData.password} name="password" placeholder='Enter the Password'  onChange={handleChange}/> </div>      
          <button  type="submit" disabled= {!isFormValid}>Submit</button>  
      </form>
      
      <h3>Live Preview </h3>
      <p>Name: {formData.name}</p>
      <p>Email: {formData.email}</p>
      <p>Password: {formData.password}</p>
      <p>Password: {"*".repeat(formData.password.length)}</p>

      <p>Password Strength: {getPasswordStrength(formData.password)}</p>
      </div>
    </>
  )

}

export default App
