import { configureStore } from "@reduxjs/toolkit";
import contentTypeSlice from "@/redux/slices/contentTypesSlice";
import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "@/redux/slices/productSlice";
import blogSlice from "@/redux/slices/blogSlice";
import teamSlice from "@/redux/slices/teamSlice";
const reducers = combineReducers({
  contentTypes: contentTypeSlice,
  products: productSlice,
  blogs: blogSlice,
  team: teamSlice,
});
const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
