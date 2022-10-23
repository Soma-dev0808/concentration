import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/configureStore";


interface ApiStatusState {
    isLoading: boolean,
    result: any,
    error: any,
}

const initialState: ApiStatusState = {
    isLoading: false,
    result: null,
    error: null
};

// Common use API observer slice
export const apiStatusSlice = createSlice({
    name: 'apiStatus',
    initialState,
    reducers: {
        callApi: (state) => {
            state.isLoading = true;
            state.result = initialState.result;
            state.error = initialState.error;
        },
        setResult: (state, action) => {
            state.isLoading = false;
            state.result = action.payload;
        },
        setError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const selectApiStatus = (state: RootState) => state.apiStatus;

const { callApi, setResult, setError } = apiStatusSlice.actions;

export { callApi, setResult, setError, selectApiStatus };

export default apiStatusSlice.reducer;