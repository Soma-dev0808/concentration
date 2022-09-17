import { AppDispatch, AppGetState } from "../app/configureStore";
import { COLORS_CONST, setColor } from '../feature/cardColorSlice';
import { DESIGN_CONST, setDesign } from '../feature/cardDesignSlice';

const changeColor = () => {
    return (dispatch: AppDispatch, getState: AppGetState) => {
        const color = getState().cardColor.color;
        const {
            COLOR_BLUE,
            COLOR_RED,
            COLOR_BLACK
        } = COLORS_CONST;

        switch (color) {
            case COLOR_BLUE:
                dispatch(setColor(COLOR_RED));
                break;
            case COLOR_RED:
                dispatch(setColor(COLOR_BLACK));
                break;
            default:
                dispatch(setColor(COLOR_BLUE));
        }
    };
};

const changeDesign = () => {
    return (dispatch: AppDispatch, getState: AppGetState) => {
        const design = getState().cardDesign.design;

        const {
            DESIGN_DEFAULT,
            DESIGN_ANIMAL,
            DESIGN_FACE
        } = DESIGN_CONST;

        switch (design) {
            case DESIGN_DEFAULT:
                dispatch(setDesign(DESIGN_ANIMAL));
                break;
            case DESIGN_ANIMAL:
                dispatch(setDesign(DESIGN_FACE));
                break;
            default:
                dispatch(setDesign(DESIGN_DEFAULT));
        }
    };
};

export { changeColor, changeDesign };