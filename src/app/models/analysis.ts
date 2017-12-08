export interface Analysis {
  recordJob: string;
  luceneQuery: string;
  maxHits: number;
}

export interface QueryResult {
  error: String;
  documents: Doc[];
}

export interface Doc {
  id: number;
  payload: String;
  source: String;
}
