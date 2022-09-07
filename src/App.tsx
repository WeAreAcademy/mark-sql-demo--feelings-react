import React from 'react';
import './App.css';
import { Feelings } from './Feelings';
import { FeelingsForm } from './FeelingsForm';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DEFAULT_API_BASE = "http://localhost:4000"
const API_BASE: string = process.env.REACT_APP_API_BASE ?? DEFAULT_API_BASE;
function App() {
  return (
    <div className="App">
      <FeelingsForm apiBase={API_BASE} />
      <Feelings apiBase={API_BASE} />
      <ToastContainer newestOnTop transition={Slide} />

    </div>
  );
}


export default App;


