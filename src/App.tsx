// @ts-nocheck
import { ControlPanel, Sequencer } from "./components";
import { SequenceContextProvider } from "./context";
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
