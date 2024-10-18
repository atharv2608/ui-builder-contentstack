import { fetchEntry } from "@/services/fetchEntry";
import { Blog } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    blogs: [] as Blog[],
    isLoading: false, 
    error: null as string | null,
}

export const fetchBlogs = createAsyncThunk(
    "entries/blogs",
    async(): Promise<Blog[]> => {
        try {
            const response = await fetchEntry("blogs");
            return response?.entries[0].blogs as Blog[];
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
            throw error; 
        }
    }
)


const blogsSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBlogs.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.blogs = action.payload;
        });
        builder.addCase(fetchBlogs.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || "An error occurred";
        });
    },
})

export default blogsSlice.reducer;