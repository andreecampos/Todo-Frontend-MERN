import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'





function TodoForm({completed}) {
     const [todos,setTodos] = useState([]);
     const [popupActive, setPopupActive] = useState(false);
     const [newTodo, setNewTodo] = useState("");
     const [description, setDescription] = useState("");

     const navigate = useNavigate()

     
     
     

      useEffect(()=>{
        GetTodos(completed);

        //console.log(todos);
      }, [])

      const GetTodos = (completed ) =>{
           let queryParam = "false";
            if (completed) {
            queryParam = "true";
            }
            console.log(queryParam)
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
  
    
    

    const deleteTodo = async id => {
        const data = await fetch ('http://localhost:3001/todo/delete/' + id, {
            method: "DELETE" })
            .then(res => res.json());

            setTodos(todos => todos.filter(todo => todo._id !== data._id));

    }



    const clickTask = (_id) => {
        const dataTodo = _id
        
        console.log("id av todo :",  dataTodo) 
        //navigate('Details' + _id)
    }

    const updateTodo = async id => {
        const data = await fetch ('http://localhost:3001/todo/update/' + id, {
            method: "PUT" })
           
            .then(res => res.json());
        
           
        
            //setTodos(todos => todos.filter(todo => todo._id !== data._id));

    }

    const addtodo = async () => {
        const data = await fetch ('http://localhost:3001/todo/new/', {
            method: 'POST',
            headers:{ "Authorization": `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({
                task: newTodo, 
                description: description
            })

        }).then(res => res.json());
        //console.log(data);
        setTodos([...todos, data]);
        setPopupActive(false);
        setNewTodo("");
        setDescription("");



        const timestamp = timeDifference(new Date(), new Date(data.createdAt));
    }

  
    return (
        <div className= "todos">
            <h1>Check all your task below </h1>
            <Link to="/complete" className="button" >Completed Todo </Link>

            { todos.map(todo => (
            <>
            <div 
            className={"todo " + (todo.complete ? "is-complete" : "")}
                        key={todo._id} onClick={()=> completeTodo(todo._id)}>

                  
                
                    <div className="checkbox"></div>
                    
                    <div className="text">{todo.task}</div>
                    <br/>  
                    <div className="description">{todo.description}</div>
                    
                    <div className="date">{(todo.createdAt)}</div>
                    <Link to={`/detail/${todo._id}`} className="button" onClick={()=>clickTask(todo._id)}>Details</Link>
                    <div className="delete-todo" onClick={()=> deleteTodo(todo._id)}>x</div>
               
                   
            </div>
            </>
            ))}


            <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

                {popupActive ? (
                        <div className="popup">
                            <div className="closePopup" onClick={() => setPopupActive(false)}>x</div>
                            <div className="content">
                                <h3>Add Task</h3>
                                <input
                                    type="text"
                                    className="add-todo-input"
                                    placeholder="write your task"
                                    onChange={e => setNewTodo(e.target.value)}
                                    value={newTodo}
                                />
                                
                                <input
                                    type="text"
                                    className="add-todo-input"
                                    placeholder="decribe your task"
                                    onChange={e => setDescription(e.target.value)}
                                    value={description}
                                />
                                <div className="button" onClick={addtodo}>Create Task</div>
                            </div>
                            
                        </div>
                ) : ''}
                

        </div>
    )


    //-------------Calculating the timestamp of the posts -------------
function timeDifference(current, previous) {

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - previous;

    if (elapsed < msPerMinute) {
        if(elapsed/1000 < 30) return "Just now"
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}
}

export default TodoForm;
