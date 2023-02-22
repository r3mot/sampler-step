import * as Tone from "tone";
import { useState, useEffect } from "react";
import { useSequenceContext } from "../context/SequenceProvider";

/**
 * @description - Custom hook that returns functions for starting, stopping, and clearing the sequencer.<br>
 * These functions are used in the ControlPanel component.
 * @returns {Object} Object containing functions for starting, stopping, and clearing the sequencer.
 */
export const useControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStopped, setIsStopped] = useState(true);
  const [isCleared, setIsCleared] = useState(false);

  const { sequence, steps } = useSequenceContext();
  // Start the sequencer
  const start = () => {
    if (Tone.Transport.state !== "started") {
      sequence.current.context._context.resume();
      Tone.Transport.start();
      setIsPlaying(true);
      setIsStopped(false);
      setIsCleared(false);
    }
  };

  // Stop the sequencer and reset the opacity of the pads
  const stop = () => {
    if (Tone.Transport.state === "started") {
      sequence.current.context._context.suspend();
      Tone.Transport.stop();
    }
    const pads = document.querySelectorAll(".pad");
    pads.forEach((pad) => {
      pad.style.opacity = 1;
    });

    setIsPlaying(false);
    setIsStopped(true);
    setIsCleared(false);
  };

  // Clear the sequence and stop the sequencer
  const clear = () => {
    steps.current.map((step) =>
      step.map((beat) => {
        beat.checked = false;
      })
    );

    setIsPlaying(false);

    setIsCleared(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsCleared(false);
      stop();
      setIsStopped(true);
    }, 50);
  }, [isCleared]);

  return { start, stop, clear, isPlaying, isCleared, isStopped };
};
