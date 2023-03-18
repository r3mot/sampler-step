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
  const [intervalId, setIntervalId] = useState(null);

  /**
   * Tone.Transport.bpm.value must be between 1 and 1000
   * @param {number} delta - 1 or -1
   * @returns updated bpm
   */
  const updateBpm = (delta) => {
    setBpm((prevBpm) => {
      const newBpm = prevBpm + delta;
      if (newBpm === 0) stopInterval();
      if (newBpm < 1 || newBpm > 1) {
        Tone.Transport.bpm.value = newBpm;
        return newBpm;
      }

      return prevBpm;
    });
  };

  const startInterval = (delta) => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    // only one interval at a time
    const id = setInterval(() => updateBpm(delta), 100);
    setIntervalId(id);
  };

  const stopInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleMouseDown = (delta) => {
    updateBpm(delta);
    startInterval(delta);
  };

  const handleMouseUp = () => {
    stopInterval();
  };

  useEffect(() => {
    return () => {
      stopInterval();
    };
  }, []);

  return { bpm, handleMouseDown, handleMouseUp };
};
