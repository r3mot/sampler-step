import { Sampler, Sequence, Volume } from "tone";

export type SamplerInternal = {
  id: number;
  sampler: Sampler;
};

export type SampleInternal = {
  id: number;
  name: string;
  path: string;
  color: string;
};
export type Samplers = SamplerInternal[];
export type StepInternal = HTMLInputElement[];
export type StepsInternal = StepInternal[];
export type FaderInternal = Volume;
export type SequenceInternal = Sequence<number> | null;
