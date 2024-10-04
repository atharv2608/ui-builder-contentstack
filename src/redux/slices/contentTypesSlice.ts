import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ContentType } from "@/types";
interface FetchContentTypesResponse {
  content_types: ContentType[];
  [key: string]: unknown;
}
const initialState = {
  contentTypes: [] as ContentType[],
  isLoading: false,
  error: null as string | null, 
};



export const fetchContentTypes = createAsyncThunk(
  "contentTypes/fetchContentTypes",
  async (): Promise<FetchContentTypesResponse | undefined> => {
    const response = await axios.get<FetchContentTypesResponse>(
      "https://eu-cdn.contentstack.com/v3/content_types",
      {
        headers: {
          api_key: import.meta.env.VITE_CONTENTSTACK_API_KEY as string,
          access_token: import.meta.env.VITE_CONTENTSTACK_DELIVERY_TOKEN as string,
        },
      }
    );

    return response.data;
  }
);

const contentTypeSlice = createSlice({
  name: "contentTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContentTypes.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchContentTypes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contentTypes = action.payload?.content_types ?? [];
      state.error = null;
    });
    builder.addCase(fetchContentTypes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "An error occurred";  // Handle undefined error messages
    });
  },
});

export default contentTypeSlice.reducer;
