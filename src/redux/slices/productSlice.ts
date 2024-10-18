import { fetchEntry } from "@/services/fetchEntry";
import { Product } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    products: [] as Product[],
    isLoading: false, 
    error: null as string | null,
}

export const fetchProducts = createAsyncThunk(
    "entries/products",
    async(): Promise<Product[]> => {
        try {
            const response = await fetchEntry("product");
            return response?.entries[0].products as Product[];
        } catch (error) {
            console.error("Failed to fetch products:", error);
            throw error; 
        }
    }
)


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || "An error occurred";
        });
    },
})

export default productsSlice.reducer;