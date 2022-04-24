import React, {useState, useEffect} from "react";

export default function TodoDetail(props) {
    const [todoItem, setTodoItem] = useState(null)
  
    useEffect((id) => {
      const url = `http://localhost:3001/todo/${id}`
      const token = localStorage.getItem('token')
      const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        };
      fetch(url,{
        method:'PUT',
        headers: headers, 
      })
      .then(res => res.json())
      .then( data => setTodoItem(data))
    })
  
    return (
      <div>
        {props.id}
        {todoItem && (
          <>
            {todoItem.task}
            {todoItem.description}
          </>
  
        )}
      </div>
    );
  }