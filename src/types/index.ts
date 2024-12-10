export type Difficulty = 'easy' | 'medium' | 'hard';
export type Theme = 'programming' | 'literature' | 'quotes';
export type TestMode = 'practice' | 'timed';
export type GameMode = 'standard' | 'racing' | 'sprint' | 'burst';

export interface TestResult {
  wpm: number;
  accuracy: number;
  charactersTyped: number;
  mistakes: number;
  timeTaken: number;
  timestamp: number;
}

export interface TestSettings {
  duration: number;
  difficulty: Difficulty;
  theme: Theme;
  mode: TestMode;
}