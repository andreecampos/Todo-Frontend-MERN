import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function App() {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser(event){
    event.preventDefault()

      const response = await fetch('http://localhost:3001/api/register', {
      
      method: 'POST',
      headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({firstName,lastName,username,email,password}),

      })

      const data = await response.json()

      if(data.status === 'ok'){
        navigate('/login')
        
      }
  }
  
  return (
    <div >
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input 
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          placeholder="First Name"
        
        />
        <input 
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          placeholder="Last Name"
        
        />
        <input 
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="Username"
        
        />
        <input 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        
        />
        <input 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        
        />

        <input type="submit" value="Register"/>
        
      </form>
    </div>
  );
}

export default App;

