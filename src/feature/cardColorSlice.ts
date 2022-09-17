import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/configureStore';

type Colors = 'blue' | 'red' | 'black';

interface CardColorState {
    color: Colors;
}

const initialState: CardColorState = {
    color: 'blue'
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

export const { setColor } = cardColorSlice.actions;

export const selectCardColor = (state: RootState) => state.cardColor.color;

export default cardColorSlice.reducer;