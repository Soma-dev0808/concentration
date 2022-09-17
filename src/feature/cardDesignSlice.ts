import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/configureStore';

const DESIGN_CONST = {
    DESIGN_DEFAULT: 'default',
    DESIGN_ANIMAL: 'animal',
    DESIGN_FACE: 'face'
} as const;

type Designs = typeof DESIGN_CONST[keyof typeof DESIGN_CONST];

interface CardDesignState {
    design: Designs,
}

const initialState: CardDesignState = {
    design: 'default',
};

export const cardDesignSlice = createSlice({
    name: 'cardDesign',
    initialState,
    reducers: {
        setDesign: (state, action: PayloadAction<Designs>) => {
            state.design = action.payload;
        }
    }
});


const { setDesign } = cardDesignSlice.actions;
type SetDesign = typeof setDesign;

const selectCardDesign = (state: RootState) => state.cardDesign.design;

export { setDesign, selectCardDesign, DESIGN_CONST };
export type { Designs, SetDesign };
export default cardDesignSlice.reducer;