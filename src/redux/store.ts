import { configureStore } from "@reduxjs/toolkit";
import contentTypeSlice from "@/redux/slices/contentTypesSlice";
import { combineReducers } from "@reduxjs/toolkit";

const reducers = combineReducers({
  contentTypes: contentTypeSlice,
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
