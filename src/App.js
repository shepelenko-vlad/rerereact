import React from 'react';
import FlavorFormFunctional from './Components/FlavorFormFunctional';
import HelloMessage from './Components/HelloMessage';
import FlavorForm from './Components/FlavorForm';

import './App.css';

function App() {
  return (
    <>
      <FlavorForm />
      <FlavorFormFunctional />
      <HelloMessage name="Vlad" />
    </>
  );
}

export default App;
