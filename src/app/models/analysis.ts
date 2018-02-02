export interface Analysis {
  recordJob: string;
  luceneQuery: string;
  maxHits: number;
  uuid: string;
}

export interface QueryResult {
  error: String;
  documents: Doc[];
  uuid: String;
}

export interface Doc {
  id: number;
  payload: String;
  source: String;
}
