import React, { useState, useEffect } from 'react'

function TodoForm() {
     const [todos,setTodos] = useState([]);
     const [popupActive, setPopupActive] = useState(false);
     const [newTodo, setNewTodo] = useState("");
     const [description, setDescription] = useState("");

      useEffect(()=>{
        GetTodos();

        console.log(todos);
      }, [])

      const GetTodos =  () =>{

          fetch('http://localhost:3001/todos')
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

    const addtodo = async () => {
        const data = await fetch ('http://localhost:3001/todo/new/', {
            method: 'POST',
            headers:{
          'Content-Type': 'application/json',
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
    }
 
    return (
        <div className= "todos">
            <h1>Todo From </h1>
            { todos.map(todo => (
            <>
            <div 
            className={"todo " + (todo.complete ? "is-complete" : "")}
                        key={todo._id} onClick={()=> completeTodo(todo._id)}>
                
                    <div className="checkbox"></div>
                    
                    <div className="text">{todo.task}</div>
                    <br/>
                    <div className="description">{todo.description}</div>
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
}

export default TodoForm;
