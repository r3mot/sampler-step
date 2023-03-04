import { useState } from "react";

const inactive = {
  background: "transparent",
  color: "rgb(150, 148, 148)",
  borderColor: "rgb(150, 148, 148)",
};

const active = {
  background: "rgb(32, 192, 255)",
  color: "black",
  borderColor: "black",
};

export const MuteButton = (sampler) => {
  const [isMuted, setIsMuted] = useState(false);
  const [message, setMessage] = useState("MUTE");

  const mute = () => {
    sampler.sampler._volume.mute = !sampler.sampler._volume.mute;
    setIsMuted((prevState) => {
      return !prevState;
    });

    isMuted ? setMessage("MUTE") : setMessage("UNMUTE");
  };

  return (
    <button style={isMuted ? active : inactive} onClick={mute}>
      {message}
    </button>
  );
};
