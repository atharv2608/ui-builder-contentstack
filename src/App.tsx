

import { useDispatch } from "react-redux";
import { fetchContentTypes } from "@/redux/slices/contentTypesSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import Page from "./components/builder/Page";
import BuilderContextProvider from "./context/BuilderContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContentTypes());
  }, [dispatch]);
  return (
  <BuilderContextProvider>
    <ToastContainer autoClose={2000} limit={2} pauseOnHover={false}/>

    <Page />
  </BuilderContextProvider>)
}
