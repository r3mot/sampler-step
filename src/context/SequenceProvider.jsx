import { createContext, useRef, useState, useContext, useEffect } from "react";
import { initSamplers, initSequence } from "../utility";
import { samples } from "../data";
import * as Tone from "tone";

const SequenceContext = createContext();

export const SequenceContextProvider = ({ children }) => {
  const [numBeats, setNumBeats] = useState(16);
  const samplers = useRef([]);
  const faders = useRef([]);
  const steps = useRef([[]]);
  const sequence = useRef(null);

  // Connect samplers to faders and meters
  for (let i = 0; i < samples.length; i++) {
    let newFader = new Tone.Volume(-12).toDestination();
    faders.current.push(newFader);
  }

  // Initialize samplers and sequence
  samplers.current = initSamplers(samples);
  sequence.current = initSequence(samplers, steps, numBeats);

  // Connect samplers to faders
  for (let i = 0; i < samplers.current.length; i++) {
    samplers.current[i].sampler.connect(faders.current[i]);
  }

  // Start sequence on mount and stop on unmount
  useEffect(() => {
    sequence.current.start(0);

    return () => {
      // Check if samplers have been initialized
      if (!samplers.current) {
        // Stop sequence and dispose of samplers
        sequence.current.stop();
        sequence.current.dispose();
        samplers.current.map((tone) => tone.sampler.dispose());
      }
    };
  }, []);

  return (
    <SequenceContext.Provider
      value={{
        numBeats,
        setNumBeats,
        samplers,
        faders,
        steps,
        sequence,
        samples,
      }}>
      {children}
    </SequenceContext.Provider>
  );
};

// Global context hook
export const useSequenceContext = () => useContext(SequenceContext);
