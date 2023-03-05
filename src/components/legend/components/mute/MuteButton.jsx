import { useState } from "react";
import { useSequenceContext } from "../../../../context";
import styles from "./MuteButton.module.css";

export const MuteButton = ({ sampler, id }) => {
  const [isMuted, setIsMuted] = useState(false);
  const { steps } = useSequenceContext();

  const toggleMute = () => {
    setIsMuted(!isMuted);
    sampler._volume.mute = !sampler._volume.mute;

    steps.current[id].forEach((step) => {
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
