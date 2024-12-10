export type GameMode = 'standard' | 'racing' | 'sprint' | 'burst';

export interface RacingState {
  playerName: string;
  position: number;
  competitors: {
    name: string;
    position: number;
    wpm: number;
  }[];
}

export interface SprintState {
  scrollSpeed: number;
  currentPosition: number;
  textPosition: number;
}

export interface BurstState {
  score: number;
  combo: number;
  fallingWords: {
    id: string;
    word: string;
    position: number;
    speed: number;
  }[];
}

export interface GameState {
  mode: GameMode;
  racing: RacingState;
  sprint: SprintState;
  burst: BurstState;
}