import { useState } from "react";

import styles from "./MuteButton.module.css";
import { useSequence } from "../../../../hooks/useSequence";

export const MuteButton = ({ sampler, id }: any) => {
  const [isMuted, setIsMuted] = useState(false);
  //@ts-ignore
  const { steps } = useSequence();

  const toggleMute = () => {
    setIsMuted(!isMuted);
    sampler._volume.mute = !sampler._volume.mute;

    steps.current[id].forEach((step: any) => {
      step.parentNode.classList.toggle(styles.muted);
    });
  };

  return (
    <div
      className={isMuted ? styles.active : styles.inactive}
      onClick={toggleMute}
    />
  );
};
