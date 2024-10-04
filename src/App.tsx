import { Canvas, LeftSidebar, RightSidebar } from "./components";
import { theme } from "./theme";
import "./App.css"

export default function App() {
  return (
    <>
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className={` text-white p-4 bg-[${theme.primaryColor}]`}>
        <h1 className="text-2xl font-bold text-center">UI Builder ContentStack</h1>
      </header>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 overflow-y-auto bg-gray-100 border-r overflow-x-hidden custom-scrollbar">
          <LeftSidebar />
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <Canvas />
        </div>

        {/* Right Sidebar */}
        <div className="w-64 overflow-y-auto bg-gray-100 border-l overflow-x-hidden custom-scrollbar">
          <RightSidebar />
        </div>
      </div>
    </div>
    </>
  );
}