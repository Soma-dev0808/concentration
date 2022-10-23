const lang = {
    GAME_TITLE: '♣🃏 Concentration 🃏♠️',
    CONGRATS: {
        TITLE: 'Congratulations',
        EMOJI1: '😎',
        EMOJI2: '🏁',
    },
    GAME_OVER: {
        TITLE: 'Game Over',
        EMOJI1: '🏴‍☠️',
        EMOJI2: '🏴‍☠️',
    },
    POST_RESULT: {
        TITLE: 'Post Result',
        EMOJI1: '🏆',
        EMOJI2: '🏆',
    },
    STATUS_MESSAGE: {
        MATCH: 'Match!',
        WRONG: 'Wrong!',
        NO_STATUS: '',
    } as const,
    DIFFICULTY_TAB: {
        EASY_MODE: {
            label: 'Easy',
            orderNum: 1
        },
        NORMAL_MODE: {
            label: 'Normal',
            orderNum: 2
        },
        HARD_MODE: {
            label: 'Hard',
            orderNum: 3
        }
    }
};

const { DIFFICULTY_TAB } = lang;
type DifficultTabKeys = keyof typeof DIFFICULTY_TAB;

export type { DifficultTabKeys };

export default lang;