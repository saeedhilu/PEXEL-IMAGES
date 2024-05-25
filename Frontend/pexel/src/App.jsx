import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './Components/Login';
import Home from './Home/Home';
import  Whishlist  from './WhishList/Whishlist';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/whishlist" element={<Whishlist />} />
      </Routes>
    </Router>
  );
};

export default App;
