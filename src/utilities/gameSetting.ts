// Difficulty of game
const GAME_MODE = {
    EASY: 'easy',
    NORMAL: 'normal',
    HARD: 'hard',
} as const;
type GameModeType = typeof GAME_MODE[keyof typeof GAME_MODE];

// Game count
const GAME_COUNT = {
    [GAME_MODE.EASY]: 20,
    [GAME_MODE.NORMAL]: 15,
    [GAME_MODE.HARD]: 13,
};

// Number of cards
const CARD_COUNT = {
    [GAME_MODE.EASY]: 10,
    [GAME_MODE.NORMAL]: 10,
    [GAME_MODE.HARD]: 14,
};

export type { GameModeType };
export { GAME_COUNT, GAME_MODE, CARD_COUNT };