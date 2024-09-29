// @ts-nocheck
import { ControlPanel } from "@/components/controls/ControlPanel";
import { SequenceContextProvider } from "@/context/SequenceProvider";
import { Sequencer } from "@/components/sequencer/Sequencer";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <SequenceContextProvider>
        <ControlPanel />
        <Sequencer />
      </SequenceContextProvider>
      <h3>r3mot</h3>
    </div>
  );
};

export default App;
