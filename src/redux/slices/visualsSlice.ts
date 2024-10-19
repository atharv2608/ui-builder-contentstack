
import { Visuals, VisualsEntryResponse } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  visuals: [] as Visuals[],
  isLoading: false,
  error: null as string | null,
};
const url =
  "https://eu-cdn.contentstack.com/v3/content_types/visuals/entries?locale=en-us&include_fallback=true&include_branch=false";

export const fetchVisuals = createAsyncThunk(
  "fetch/visuals",
  async (): Promise<Visuals[]> => {
    try {
      const response = await axios.get<VisualsEntryResponse>(url, {
        headers: {
          api_key: import.meta.env.VITE_CONTENTSTACK_API_KEY as string,
          access_token: import.meta.env
            .VITE_CONTENTSTACK_DELIVERY_TOKEN as string,
        },
      });
      return response.data.entries;
    } catch (error) {
      console.error("Failed to fetch visuals:", error);
      throw error;
    }
  }
);

const visualsSlice = createSlice({
  name: "visuals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVisuals.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchVisuals.fulfilled, (state, action) => {
      state.isLoading = false;
      state.visuals = action.payload;
    });
    builder.addCase(fetchVisuals.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "An error occurred";
    });
  },
});

export default visualsSlice.reducer;
