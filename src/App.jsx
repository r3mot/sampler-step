import React from "react";
import { Sequencer } from "./components";
import { SequenceContextProvider } from "./context";

const App = () => {
  return (
    <div className='App'>
      <SequenceContextProvider>
        <Sequencer />
      </SequenceContextProvider>
    </div>
  );
};

export default App;
