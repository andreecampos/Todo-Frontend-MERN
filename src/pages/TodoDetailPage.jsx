import React, { useState, useEffect }  from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//import { useParams } from 'react-router-dom'
//import TodoDetail from '../components/TodoDetail'

/*
export default function TodoDetailPage() {
    let params = useParams()
    return (
        <TodoDetail id={params.id}/>
    )
}
*/

/*
const UpdateTodo = () =>{  
        
    let { id } = useParams()
       
    function fetchTodo(){
        const url = `http://localhost:3001/todo/update/${id}`
        const token = localStorage.getItem('token')
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        };
        fetch(url, {
            method: 'PUT',
            headers: headers,
        })
        .then((res) => res.json())
        
    }
        

    return(
        
        <div>
            <h1> Details sida</h1>
            <p>Hämta task/:id</p>
            
            
           

        </div>
    )

    
}

export default TodoDetailPage
*/


