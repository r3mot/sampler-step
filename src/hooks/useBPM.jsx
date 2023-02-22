import { useState, useEffect } from "react";
import * as Tone from "tone";

/**
 * Custom hook to control the tempo of the Tone.Transport<br>
 * @returns {Object} - bpm, raiseTempo, lowerTempo, mouseUp
 * @example
 * const { bpm, raiseTempo, lowerTempo, mouseUp } = useBPM();
 * <button onMouseDown={lowerTempo} onMouseUp={mouseUp}>-</button>
 * <button onMouseDown={raiseTempo} onMouseUp={mouseUp}>+</button>
 * <h2>{bpm}BPM</h2>
 */
export const useBPM = () => {
  const [bpm, setBpm] = useState(Tone.Transport.bpm.value);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const [isDecreasing, setIsDecreasing] = useState(false);

  const raiseTempo = () => {
    setBpm(bpm + 1);
    setIsMouseDown(true);
    setIsIncreasing(true);
  };

  const lowerTempo = () => {
    setBpm(bpm - 1);
    setIsMouseDown(true);
    setIsDecreasing(true);
  };

  // allows for user to click and hold
  // to increase or decrease the tempo
  const mouseUp = () => {
    clearInterval();
    setIsMouseDown(false);
    setIsIncreasing(false);
    setIsDecreasing(false);
  };

  // cleanup function to clear the interval
  // when the component unmounts
  useEffect(() => {
    if (isMouseDown) {
      const interval = setInterval(() => {
        if (isIncreasing) setBpm(bpm + 1);
        if (isDecreasing) setBpm(bpm - 1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isMouseDown, bpm]);

  // update the Tone.Transport.bpm.value
  // when the bpm state changes
  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  return { bpm, raiseTempo, lowerTempo, mouseUp };
};
