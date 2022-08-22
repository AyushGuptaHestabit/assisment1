import React from 'react';
import './App.css';
import HomeView from './components/Home';
import EditView from './components/EditView';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="container-fluid py-3 bg-light" style={{ minHeight: '100vh' }}>
      <div className="mx-5">
        <div className='row h4 text-primary bg-white p-3 rounded shadow my-5'>
          <div className='col-12'>
            Student Management
          </div>
        </div>
        <HomeView />
        {/* <Routes>
          <Route exact path="/" element={<HomeView />} />
          <Route path="/edit/:id" element={<EditView />} />
        </Routes> */}
      </div>
    </div>
  );
}

export default App;
