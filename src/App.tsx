import React from 'react';
import './App.css';
import { Feelings } from './Feelings';
import { FeelingsForm } from './FeelingsForm';

function App() {
  return (
    <div className="App">
      <FeelingsForm />
      <Feelings />
    </div>
  );
}

export default App;


