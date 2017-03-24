import { RecrepEndpointMapping } from './endpointmapping';

export interface RecrepRecordJob {
  name: string;
  description?: string;
  status?: string;
  sourceMappings: RecrepEndpointMapping[];
  timestampStart: number;
  timestampEnd: number;
  maxSizeMb: string;
  filePath: string;
};
