import { RecrepEndpointMapping } from './endpointmapping';

export interface RecrepReplayJob {
  name: string;
  description: string;
  status: string;
  recordJobName: string;
  targetMappings: RecrepEndpointMapping[];
  speedFactor: number;
  timestampFrom: number;
  timestampTo: number;
  timestampStart: number;
  timestampEnd: number;
  duration: number;
  filePath: string;
}
