import "./App.css";

import { useDispatch } from "react-redux";
import { fetchContentTypes } from "@/redux/slices/contentTypesSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import Page from "./components/builder/page";
export default function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContentTypes());
  }, [dispatch]);
  return <Page />;
}
