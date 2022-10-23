import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/configureStore";
import { getScores, postScores } from "../utilities/firebase";

import { db, ScoreListType } from "../utilities/firebaseConfig";
import { getDifficulty } from "../utilities/utils";

interface UserSCoresState {
    isFetching: boolean,
    scoreList: Array<ScoreListType>;
    error: any;
    isShowScoreListModal: boolean;
};

const initialState: UserSCoresState = {
    isFetching: false,
    scoreList: [],
    error: null,
    isShowScoreListModal: false
};

const fetchUserScores = createAsyncThunk<{ scoreList: Array<ScoreListType>; }>(
    "userScores/FetchAllScores",
    async () => {
        const response = await getScores(db);
        return { scoreList: response };
    }
);

const postUserScore = createAsyncThunk<void, { username: string, score: number; }, { state: RootState; }>(
    "userScores/PostUserScore",
    async ({ username, score }, { getState }) => {
        await postScores(db, {
            username,
            score,
            difficulty: getDifficulty(getState().cardColor.color)
        });
    }
);

export const userScoreSlice = createSlice({
    name: 'userScores',
    initialState,
    reducers: {
        toggleScoreListModal: (state, action: PayloadAction<{ isShow?: boolean; }>) => {
            const isShow = action.payload?.isShow !== undefined
                ? action.payload.isShow
                : !state.isShowScoreListModal;
            if (state.isShowScoreListModal) {
                state.scoreList = [];
                state.error = null;
            }
            state.isShowScoreListModal = isShow;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetchUserScores
            .addCase(fetchUserScores.pending, (state) => {
                state.isFetching = true;
                state.scoreList = [];
                state.error = null;
            })
            .addCase(fetchUserScores.fulfilled, (state, action) => {
                state.isFetching = false;
                state.scoreList = action.payload.scoreList;
            })
            .addCase(fetchUserScores.rejected, (state, action) => {
                state.isFetching = false;
                state.error = action.error;
            })
            // postUserScore
            .addCase(postUserScore.pending, (state) => {
                state.isFetching = true;
                state.error = null;
            })
            .addCase(postUserScore.fulfilled, (state) => {
                state.isFetching = false;
            })
            .addCase(postUserScore.rejected, (state, action) => {
                state.isFetching = false;
                state.error = action.error;
            });
    }
});

const { toggleScoreListModal } = userScoreSlice.actions;
type ToggleScoreListModal = typeof toggleScoreListModal;

const selectUserScores = (state: RootState) => state.userScores;

export { selectUserScores, fetchUserScores, toggleScoreListModal, postUserScore };
export type { ToggleScoreListModal };
export default userScoreSlice.reducer;
