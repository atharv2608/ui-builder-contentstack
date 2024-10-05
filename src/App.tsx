import { Canvas, LeftSidebar, RightSidebar } from "./components";
import { theme } from "./theme";
import "./App.css";
import { Button } from "./components/ui/button";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchContentTypes } from "@/redux/slices/contentTypesSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
export default function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContentTypes());
  }, [dispatch]);

  const [selectedContentType, setSelectedContentType] = useState("");
  console.log("Selected Content type: ",selectedContentType)
  return (
    <>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className={` text-white p-4 bg-[${theme.primaryColor}] flex`}>
          <h1 className="text-2xl font-bold mr-auto">
            UI Builder ContentStack
          </h1>
          <Button
            className={` bg-white text-[#6c5ce7] flex space-x-2 hover:bg-gray-200`}
          >
            <a href={window.location.href} target="_blank">
              New Tab
            </a>
            <SquareArrowOutUpRightIcon size={15} />
          </Button>
        </header>

        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-64 overflow-y-auto bg-gray-100 border-r overflow-x-hidden custom-scrollbar">
            <LeftSidebar setSelectedContentType={setSelectedContentType} />
          </div>

          {/* Canvas */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <Canvas />
          </div>

          {/* Right Sidebar */}
          <div className="w-64 overflow-y-auto bg-gray-100 border-l overflow-x-hidden hide-scrollbar">
            <RightSidebar selectedContentType={selectedContentType} />
          </div>
        </div>
      </div>
    </>
  );
}
