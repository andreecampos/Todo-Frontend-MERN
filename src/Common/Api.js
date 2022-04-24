import React from "react";

 const GetTodos = (completed ) =>{
    let  queryParam = "false";
     if (completed) {
     queryParam = "true";
     }
 
   fetch('http://localhost:3001/todos/?completed=' + queryParam, {
       headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem('token')}`
       },
   })
   
     .then(res => res.json())
     .then(data => setTodos(data))
     .catch(err => console.error("Error: ", err));
}


const completeTodo = async id => {
 const data = await fetch ('http://localhost:3001/todo/complete/' + id)
     .then(res => res.json());
 
     setTodos(todos => todos.map(todo => {
         if(todo._id === data._id){
             todo.complete = data.complete
         }
         return todo;
     }));
 
     
}

module.exports = { GetTodos, completeTodo}