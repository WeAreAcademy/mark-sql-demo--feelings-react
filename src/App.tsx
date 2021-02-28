import React from 'react';
import './App.css';
import { Feelings } from './Feelings';
import { FeelingsForm } from './FeelingsForm';

const DEFAULT_API_BASE = "http://localhost:4000"
const API_BASE: string = process.env.REACT_APP_API_BASE ?? DEFAULT_API_BASE;
function App() {
  return (
    <div className="App">
      <FeelingsForm apiBase={API_BASE} />
      <Feelings apiBase={API_BASE} />
    </div>
  );
}

export default App;


