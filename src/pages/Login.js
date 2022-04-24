import  { useState } from 'react'
import { useNavigate} from 'react-router-dom'
//import jwt from 'jsonwebtoken'

function App() {
  const navigate = useNavigate()
  
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  async function loginUser(event){
    event.preventDefault()

      const response = await fetch('http://localhost:3001/api/login', {
      
      method: 'POST',
      headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username,password}),

      })

      const data = await response.json()

      if(data.user){
        localStorage.setItem('token', data.user)
        alert('login succesful')
        
        navigate('/Todo')
        //console.log(data.user) här ligger token

      }else {
        alert('please cheack your username and password')
        
      }
      console.log(data)
  }

  const userAuthenticated= () =>{
     fetch('http://localhost:3001/isUserAuth', {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}` 
    },

     }).then((response) => response.json())
     .then(data => console.log(data))

       //console.log(response.body);
  }

  return (
    <div >
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        
        <input 
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="Username"
        
        />
        
        <input 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        
        />

        <input type="submit" value="Login" onClick={userAuthenticated}/>
        
      </form>
    </div>
  );
}

export default App;