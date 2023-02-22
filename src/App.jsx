import React from "react";
import "./App.css";
import { Sequencer, ControlPanel } from "./components";
import { SequenceContextProvider } from "./context";

const App = () => {
  return (
    <div className='App'>
      <SequenceContextProvider>
        <ControlPanel />
        <Sequencer />
      </SequenceContextProvider>
    </div>
  );
};

export default App;
