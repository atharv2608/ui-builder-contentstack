import { fetchEntry } from "@/services/fetchEntry";
import {  Team } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    team: [] as Team[],
    isLoading: false, 
    error: null as string | null,
}

export const fetchTeam = createAsyncThunk(
    "entries/team",
    async(): Promise<Team[]> => {
        try {
            const response = await fetchEntry("about_us");
            return response?.entries[0].team_members as Team[];
        } catch (error) {
            console.error("Failed to fetch team:", error);
            throw error; 
        }
    }
)


const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTeam.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchTeam.fulfilled, (state, action) => {
            state.isLoading = false;
            state.team = action.payload;
        });
        builder.addCase(fetchTeam.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || "An error occurred";
        });
    },
})

export default teamSlice.reducer;