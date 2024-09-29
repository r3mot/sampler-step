import { useState, useEffect } from "react";
import * as Tone from "tone";

export const useBPM = () => {
  const [bpm, setBpm] = useState(Tone.getTransport().bpm.value);
  const [intervalId, setIntervalId] = useState(0);

  const updateBpm = (newBpm: number) => {
    if (newBpm < 1 || newBpm > 1000) return; // Ensure BPM stays within valid range
    Tone.getTransport().bpm.value = newBpm;
    setBpm(newBpm);
  };

  const startInterval = (delta: number) => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const id = setInterval(() => updateBpm(bpm + delta), 100);
    setIntervalId(id);
  };

  const stopInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
    }
  };

  const handleMouseDown = (delta: number) => {
    updateBpm(bpm + delta);
    startInterval(delta);
  };

  const handleMouseUp = () => {
    stopInterval();
  };

  const handleInputChange = (event: any) => {
    let newBpm = parseInt(event.target.value, 10);
    if (!isNaN(newBpm)) {
      updateBpm(newBpm);
    }
  };

  useEffect(() => {
    return () => {
      stopInterval();
    };
  }, []);

  return { bpm, handleMouseDown, handleMouseUp, handleInputChange };
};
