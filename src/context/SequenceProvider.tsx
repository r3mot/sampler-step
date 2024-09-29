import { Sampler, Sequence, Volume } from "tone";
import {
  FaderInternal,
  SampleInternal,
  SamplerInternal,
  SequenceInternal,
  StepInternal,
} from "@/types";
import {
  createContext,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { samples } from "@/data/samples";

interface SequenceContextProps {
  samplers: RefObject<SamplerInternal[]>;
  steps: RefObject<StepInternal[]>;
  faders: RefObject<FaderInternal[]>;
  sequence: RefObject<SequenceInternal>;
  numBeats: number;
  setNumBeats: React.Dispatch<React.SetStateAction<number>>;
  samples: SampleInternal[];
  currentStep: number;
}

export const SequenceContext = createContext<SequenceContextProps | undefined>(
  undefined
);

export function SequenceContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [numBeats, setNumBeats] = useState(16);
  const [currentStep, setCurrentStep] = useState(-1);
  const samplers = useRef<SamplerInternal[]>([]);
  const steps = useRef<StepInternal[]>([]);
  const faders = useRef<FaderInternal[]>([]);
  const sequence = useRef<SequenceInternal>(null);

  const showSteps = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  const initSamplers = useCallback(() => {
    return samples.map((sample) => ({
      id: sample.id,
      sampler: new Sampler({
        urls: { ["C4"]: sample.path },
      }),
    }));
  }, []);

  const initSequence = useCallback(() => {
    return new Sequence(
      (time, step) => {
        samplers.current.forEach((sample) => {
          if (steps.current[sample.id][step]?.checked) {
            sample.sampler.triggerAttack("C4", time);
          }
        });
        showSteps(step);
      },
      [...Array(numBeats).keys()],
      "8n"
    );
  }, [numBeats, showSteps]);

  const initFaders = useCallback(() => {
    return samplers.current.map((sampler) => {
      const fader = new Volume(-12).toDestination();
      sampler.sampler.connect(fader);
      return fader;
    });
  }, []);

  useEffect(() => {
    samplers.current = initSamplers();
    sequence.current = initSequence();
    faders.current = initFaders();

    return () => {
      sequence?.current?.dispose();
      samplers.current.forEach((sampler) => sampler.sampler.dispose());
    };
  }, [initSamplers, initSequence, initFaders]);

  return (
    <SequenceContext.Provider
      value={{
        numBeats,
        setNumBeats,
        samplers,
        faders,
        steps,
        sequence,
        samples,
        currentStep,
      }}
    >
      {children}
    </SequenceContext.Provider>
  );
}
