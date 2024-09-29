import { useState } from "react";
import { FaderInternal, StepInternal } from "../../../../types";
import styles from "./Mutebutton.module.css";

interface Props {
  fader: FaderInternal | null;
  id: number;
  steps: StepInternal[] | null;
}

export function MuteButton({ fader, id, steps }: Props) {
  const [muted, setMuted] = useState(false);

  function toggleMute() {
    setMuted((prevMuted) => {
      if (fader && steps) {
        const newVolume = prevMuted ? -12 : -100;
        fader.volume.value = newVolume;

        steps[id].forEach((step) => {
          if (step.parentNode) {
            (step.parentNode as HTMLElement).classList.toggle(
              styles.muted,
              !prevMuted
            );
          }
        });
      }
      return !prevMuted;
    });
  }

  return (
    <div
      className={muted ? styles.active : styles.inactive}
      onClick={toggleMute}
    />
  );
}
