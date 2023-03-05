import React from "react";
import { ControlPanel, Sequencer } from "./components";
import { SequenceContextProvider } from "./context";
import "./App.css";

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
