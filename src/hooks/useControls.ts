import * as Tone from "tone";
import { useSequence } from "./useSequence";
import { useState } from "react";

export function useControls() {
  const { steps, startTransport, stopTransport } = useSequence();
  const [controls, setControls] = useState({
    playing: false,
    stopped: true,
    cleared: false,
  });

  async function startSequence() {
    if (Tone.getTransport().state !== "started") {
      await startTransport();
      setControls({ playing: true, stopped: false, cleared: false });
    }
  }

  async function stopSequence() {
    if (Tone.getTransport().state === "started") {
      await stopTransport();
      setControls({ playing: false, stopped: true, cleared: false });
      if (steps.current) {
        resetFilters(
          steps.current
            .flat()
            .filter((el): el is HTMLInputElement => el !== null)
        );
      }
    }
  }

  function clearGrid() {
    if (steps.current) {
      for (const step of steps.current) {
        for (const element of step) {
          element.checked = false;
        }
      }

      resetOverlay(
        steps.current.flat().filter((el): el is HTMLInputElement => el !== null)
      );
    }
  }

  const resetFilters = (elements: HTMLInputElement[]) => {
    for (const element of elements) {
      element.style.opacity = "1";
      element.style.filter = "none";
    }
  };

  const resetOverlay = (elements: HTMLInputElement[]) => {
    for (const element of elements) {
      element.style.background = "#181818 linear-gradient(#2e2e2e, #181818)";
      element.style.opacity = "1";
      element.style.filter = "none";
    }
  };

  return {
    startSequence,
    stopSequence,
    clearGrid,
    controls,
  };
}
