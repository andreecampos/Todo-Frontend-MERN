import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Todo from './pages/Todo';

import Complete from './pages/complete';
//import TodoDetailPage from './pages/TodoDetailPage';
import DetailTodo from './pages/DetailTodo'
//import './index.css';
//<Route path="/todo/:id" element={<TodoDetailPage/>}/>

const App = () =>{
    return <div>
        <BrowserRouter>
            <Routes>
                <Route path="/"  element={<Login/>}/>
                <Route path="/register"  element={<Register/>}/>
                <Route path="/todo" element={<Todo/>}/>
                <Route path="/complete" element={<Complete completed={true}/>}/>
                <Route path="/detail/:id" element={<DetailTodo />}/>
                
               
            </Routes>
        </BrowserRouter>
        </div>
}
export default App;
