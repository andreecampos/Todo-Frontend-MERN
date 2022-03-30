import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Todo from './pages/Todo';
//import './index.css';


const App = () =>{
    return <div>
        <BrowserRouter>
            <Routes>
                <Route path="/login"  element={<Login/>}/>
                <Route path="/register"  element={<Register/>}/>
                <Route path="/todo" element={<Todo/>}/>
            </Routes>
        </BrowserRouter>
        </div>
}
export default App;
