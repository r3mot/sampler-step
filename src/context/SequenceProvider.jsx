import { createContext, useRef, useState, useContext, useEffect } from "react";
import { initSamplers, initSequence } from "../utility";
import { samples } from "../data";
import * as Tone from "tone";

const SequenceContext = createContext();

export const SequenceContextProvider = ({ children }) => {
  // Number of beats in the sequence
  const [numBeats, setNumBeats] = useState(16);
  // Tone.js samplers
  const samplers = useRef([]);
  // Tone.js faders
  const faders = useRef([]);
  // Array of steps
  const steps = useRef([[]]);
  // Tone.js sequence
  const sequence = useRef(null);

  const stepOptions = [16, 32, 64];

  // Connect samplers to faders and meters
  for (let i = 0; i < samples.length; i++) {
    let newFader = new Tone.Volume(-12).toDestination();
    faders.current.push(newFader);
  }

  useEffect(() => {
    // Initialize samplers and sequence on mount
    samplers.current = initSamplers(samples);
    sequence.current = initSequence(samplers, steps, numBeats);

    for (let i = 0; i < samplers.current.length; i++) {
      samplers.current[i].sampler.connect(faders.current[i]);
    }

    // Start the sequence
    sequence.current.start(0);

    // Stop the sequence on unmount
    // and dispose of samplers
    return () => {
      stop();
      samplers.current.map((tone) => tone.sampler.dispose());
      sequence.current.dispose();
    };
  }, [numBeats, samples]);

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
        stepOptions,
      }}>
      {children}
    </SequenceContext.Provider>
  );
};

// Global context hook
export const useSequenceContext = () => useContext(SequenceContext);
