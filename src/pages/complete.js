import React from 'react'
import TodoForm from './TodoForm'
import {  Route, Routes } from 'react-router-dom'


const Complete = () =>{
    


    return(
        <div>
            <h1>complete todos</h1>
           
           <TodoForm completed={true}/>
            
        </div>

    )
}

export default Complete