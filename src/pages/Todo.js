import React, {useEffect, useState}from 'react'
import jwt from 'jsonwebtoken'
import {  Route, Routes, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import TodoForm from './TodoForm';




const Todo = () =>{  
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState("")
    useEffect(() =>{
        const token = localStorage.getItem('token')
        if(token){
            const user = jwt.decode(token)
            console.log(user)
            if(!user){
                localStorage.removeItem('token')
                navigate('/login')    
            } 
            else {
                //usuario = user.firstname
                setUsuario(user.firstName)
            }
        }
        
    }, [])

   
const Logoutfunction = () =>{
    //console.log("i am the logout button")
     
        localStorage.removeItem('token') 
        navigate('/')
    
        
}

    return(
        
        <div>
            <h1>  Hello {usuario} !! Welcome </h1>
            
           
          
            <div>
           
                    <Routes>
                        <Route path="" element={<TodoForm completed={false}/>}/>
                        
                    </Routes>
                
        
                   
                <button className="button" onClick={Logoutfunction}>logo ut</button>
            </div>
            

        </div>
    )

    
}




export default Todo
