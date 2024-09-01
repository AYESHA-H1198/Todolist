// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Firstpage from './Components/Firstpage'; 
import Login from './Components/Login'; 
import Signup from './Components/Signup'; 
import Todo from './Components/todo';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Firstpage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/todo' element={<Todo/>} />
      </Routes>
    </Router>
  );
};

export default App;
