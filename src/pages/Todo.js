import React, {useEffect}from 'react'
import jwt from 'jsonwebtoken'
import {  Route, Routes, useNavigate } from 'react-router-dom'

import TodoForm from './TodoForm';


const Todo = () =>{  
    const navigate = useNavigate()
    /* 
    async function populateQuote() {
        const req = await fetch('http://localhost:3001/api/quote', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}` 
            },

        })
        const data = req.json()
        console.log(data)
    } */

    useEffect(() =>{
        const token = localStorage.getItem('token')
        if(token){
            const user = jwt.decode(token)
            if(!user){
                localStorage.removeItem('token')
                navigate('/login')
            } else {
                return ({satus: 'error'})
            }
        }
    }, [])

   
    return(
        
        <div>
            <h1> welcome todo page</h1>
            <h4>Your taks</h4>
            <div>
                
                    <Routes>
                        <Route path="" element={<TodoForm/>}/>
                    </Routes>
                
            </div>
            

        </div>
    )
    
}


export default Todo
