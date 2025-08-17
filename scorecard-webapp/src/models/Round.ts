export interface RoundHole {
  number: number;
  par: number;
  strokes: number;
}

export interface Round {
  id: number;
  course_id?: number | null;
  name: string;
  played_at: string;
  holes: RoundHole[];
  total_par: number;
  total_strokes: number;
}

export interface SaveRoundRequest {
  course_id?: number;
  name: string;
  holes: RoundHole[];
}
