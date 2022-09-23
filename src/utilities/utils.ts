import lang from './lang';
import { DESIGN_CONST } from '../feature/cardDesignSlice';
import { COLORS_CONST } from '../feature/cardColorSlice';

import type { Designs } from '../feature/cardDesignSlice';
import type { Colors } from '../feature/cardColorSlice';
import {
    GameSetting,
    ConcentrationCore,
    Cards,
    CardStatusesArray,
    Overlay,
    Message,
    ReadyStatus,
} from '../feature/gameSlice';
import { CARD_COUNT, GAME_COUNT, GAME_MODE } from './gameSetting';
import type { GameModeType } from './gameSetting';

type InitCards = (setting: GameSetting) => ConcentrationCore;

type IndexNumbers = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

const DESIGNS = {
    [DESIGN_CONST.DESIGN_DEFAULT]: Array("♡", "♡", "♢", "♢", "♤", "♤", "♧", "♧", "♥", "♥"),
    [DESIGN_CONST.DESIGN_FACE]: Array("😀", "😀", "😇", "😇", "😎", "😎", "😱", "😱", "🤧", "🤧"),
    [DESIGN_CONST.DESIGN_ANIMAL]: Array("🐻", "🐻", "🐨", "🐨", "🐥", "🐥", "🐒", "🐒", "🐯", "🐯")
};

const HARD_MODE_DESIGNS = {
    [DESIGN_CONST.DESIGN_DEFAULT]: Array("♣️", "♣️", "♠️", "♠️"),
    [DESIGN_CONST.DESIGN_FACE]: Array("😄", "😄", "😌", "😌"),
    [DESIGN_CONST.DESIGN_ANIMAL]: Array("🦁", "🦁", "🐣", "🐣")
};

// Get card design;
const getCardDesign = (design: Designs, isHardMode: boolean) =>
    isHardMode
        ? [...DESIGNS[design], ...HARD_MODE_DESIGNS[design]]
        : DESIGNS[design];

const getCardNumber = (difficulty: GameModeType) => CARD_COUNT[difficulty]; // If you change here, please change types also

// Game initialization
const initCards: InitCards = ({ design, difficulty }) => {
    const isHardMode = difficulty === 'hard';
    const cardTypes: Array<string> = getCardDesign(design, isHardMode);
    const cardShuffled = shuffle(cardTypes);
    let status = Array(getCardNumber(difficulty)).fill(0);

    // Change count depends on difficulty.
    const count = GAME_COUNT[difficulty];

    return {
        cards: cardShuffled,
        status,
        stsRollBackIdx: { 'firstPick': -1, 'secondPick': -1 },
        ready: -1,
        count,
        timer: null,
        run: false,
        result: '',
        message: lang.STATUS_MESSAGE.NO_STATUS,
        overlay: 'overlay'
    };
};

type Shuffle = (arr: Cards) => Cards;
// Shuffle cards
const shuffle: Shuffle = ([...arr]) => {
    for (let i = arr.length - 1; i >= 0; i--) {
        const randomNum = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[randomNum]] = [arr[randomNum], arr[i]];
    }

    return arr;
};

// Event for clicking a card
const clickCardEvent = (state: ConcentrationCore, idx: IndexNumbers) => {
    const { status, run, ready, cards, timer, stsRollBackIdx } = state;

    // Click already selected card.
    if (status[idx] !== 0) return;

    // If game is not started yet.
    if (!run) return;

    const sts = status.slice();
    let _stsRollBackIdx = { ...stsRollBackIdx };
    let _ready: ReadyStatus = -1;
    let _message: Message = lang.STATUS_MESSAGE.NO_STATUS;
    let _result: string = "";
    let _overlay: Overlay = "";
    let _run: boolean = run;

    // card pick is disabled.
    if (ready === -2) {
        return;
    }
    // First pick
    else if (ready === -1) {
        sts[idx] = 1;
        _ready = idx;
    }
    // Second pick
    else if (ready !== idx) {
        sts[idx] = 1;

        // Check if 2nd pick matches with 1st pick,
        if (cards[ready] === cards[idx]) {
            _message = lang.STATUS_MESSAGE.MATCH;
            // Change status to 'matched'
            sts[ready] = 2;
            sts[idx] = 2;

            if (isFinish(sts)) {
                _message = lang.STATUS_MESSAGE.NO_STATUS;
                _run = false;
                _result = lang.CONGRATS.TITLE;
                _overlay = 'overlay overlay-end';
                timer && clearInterval(timer);
            }
        } else {
            // Picked wrong card
            _message = lang.STATUS_MESSAGE.WRONG;
            // disable until card status is reset
            _ready = -2;

            // set _stsRollBackIdx to reset cards picked after milli seconds.
            _stsRollBackIdx.firstPick = ready;
            _stsRollBackIdx.secondPick = idx;

            // Update cards status to change the UI of cards.
            sts[idx] = 3;
            sts[ready] = 3;
        }
    }

    return {
        status: sts,
        stsRollBackIdx: _stsRollBackIdx,
        ready: _ready,
        message: _message,
        run: _run,
        result: _result,
        overlay: _overlay
    };
};

type IsFinish = (sts: CardStatusesArray) => boolean;
// Check if game is finished
const isFinish: IsFinish = (sts) => {
    return !sts.some((s) => s !== 2);
};

type CountDown = (state: ConcentrationCore) => Partial<ConcentrationCore>;
// Check count and if it's 0, finish game. If it's more than 1, update count.
const countDown: CountDown = (state) => {
    let nextCount = state.count - 1;
    if (nextCount < 1) {
        // Reset setInterval
        state.timer && clearInterval(state.timer);
        return {
            message: lang.STATUS_MESSAGE.NO_STATUS,
            count: 0,
            run: false,
            result: lang.GAME_OVER.TITLE,
            overlay: 'overlay overlay-end'
        };
    }
    return {
        count: nextCount,
    };
};

// Get button color
const getButtonColor = (color: Colors): string => {
    let colorStyle = '';
    switch (color) {
        case COLORS_CONST.COLOR_BLUE:
            colorStyle = 'blue';
            break;
        case COLORS_CONST.COLOR_RED:
            colorStyle = 'red';
            break;
        default:
            COLORS_CONST.COLOR_BLACK;
            colorStyle = 'black';
    }

    return colorStyle;
};

// Get emoji of card desgin.
const getButtonEmoji = (design: string): string => {
    let emoji = '';
    switch (design) {
        case DESIGN_CONST.DESIGN_FACE:
            emoji = '😀';
            break;
        case DESIGN_CONST.DESIGN_ANIMAL:
            emoji = '🐻';
            break;
        default:
            DESIGN_CONST.DESIGN_DEFAULT;
            emoji = '♤';
    }

    return emoji;
};

// Get difficult based on passed color. Blue: normal, Red: Hard, Black: easy.
const getDifficulty = (color: string): GameModeType => {
    let difficulty: GameModeType = GAME_MODE.NORMAL;
    switch (color) {
        case COLORS_CONST.COLOR_BLUE:
            difficulty = GAME_MODE.NORMAL;
            break;
        case COLORS_CONST.COLOR_RED:
            difficulty = GAME_MODE.HARD;
            break;
        default:
            COLORS_CONST.COLOR_BLACK;
            difficulty = GAME_MODE.EASY;
    }

    return difficulty;
};

export {
    initCards,
    shuffle,
    clickCardEvent,
    countDown,
    getButtonEmoji,
    getButtonColor,
    getDifficulty,
};

export type { IndexNumbers };