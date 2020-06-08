import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import extensions from './helpers/extensions';

import Routes from './routes';

extensions();

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </>
  );
}

export default App;
