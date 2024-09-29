import * as Tone from "tone";
import { useState, useEffect } from "react";
// @ts-ignore
import { useSequenceContext } from "../context/SequenceProvider";
import { useSequence } from "./useSequence";

/**
 * @description - Custom hook that returns functions for starting, stopping, and clearing the sequencer.<br>
 * These functions are used in the ControlPanel component.
 * @returns {Object} Object containing functions for starting, stopping, and clearing the sequencer.
 */
export const useControls = () => {
  //@ts-ignore
  const { sequence, steps } = useSequence();
  const [controls, setControls] = useState({
    isPlaying: false,
    isStopped: true,
    isCleared: false,
  });

  const start = () => {
    if (Tone.Transport.state !== "started") {
      startSequence(sequence);
      updateControls(true, false, false);
    }
  };

  const stop = () => {
    if (Tone.Transport.state === "started") {
      suspendSeqeuence(sequence);
      resetFilters(document.querySelectorAll(".pad"));
      updateControls(false, true, false);
    }
  };

  const clear = () => {
    for (let step of steps.current) {
      for (let beat of step) {
        beat.checked = false;
      }
    }
    resetOverlay(document.querySelectorAll(".pad"));
    updateControls(false, true, true);
  };

  const updateControls = (playing: any, stopped: any, cleared: any) => {
    setControls((prevControls) => ({
      ...prevControls,
      isPlaying: playing,
      isStopped: stopped,
      isCleared: cleared,
    }));
  };

  const suspendSeqeuence = (sequence: any) => {
    sequence.current.context._context.suspend();
    Tone.Transport.stop();
  };

  const startSequence = (sequence: any) => {
    sequence.current.context._context.resume();
    Tone.Transport.start();
  };

  const resetFilters = (elements: any) => {
    for (let element of elements) {
      element.style.opacity = 1;
      element.style.filter = "none";
    }
  };

  const resetOverlay = (elements: any) => {
    for (let element of elements) {
      element.style.background = "#181818 linear-gradient(#2e2e2e, #181818)";
      element.style.opacity = 1;
      element.style.filter = "none";
    }
  };

  useEffect(() => {
    setTimeout(() => {
      updateControls(false, true, false);
      stop();
    }, 50);
  }, [controls.isCleared]);

  return { start, stop, clear, controls };
};
