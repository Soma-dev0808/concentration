import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/configureStore';

const COLORS_CONST = {
    COLOR_BLUE: 'blue',
    COLOR_RED: 'red',
    COLOR_BLACK: 'black',
} as const;

type Colors = typeof COLORS_CONST[keyof typeof COLORS_CONST];

interface CardColorState {
    color: Colors;
}

const initialState: CardColorState = {
    color: COLORS_CONST.COLOR_BLUE
};

export const cardColorSlice = createSlice({
    name: 'cardColor',
    initialState,
    reducers: {
        setColor: (state, action: PayloadAction<Colors>) => {
            state.color = action.payload;
        }
    }
});

const { setColor } = cardColorSlice.actions;
type SetColor = typeof setColor;

const selectCardColor = (state: RootState) => state.cardColor.color;

export { setColor, COLORS_CONST, selectCardColor };
export type { Colors, SetColor };
export default cardColorSlice.reducer;