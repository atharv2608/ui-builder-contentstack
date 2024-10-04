import { Canvas, LeftSidebar, RightSidebar } from "./components";

function App() {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar - 30% width */}
      <div className="w-3/10">
        <LeftSidebar />
      </div>

      {/* Canvas - 50% width */}
      <div className="flex-1">
        <Canvas />
      </div>

      {/* Right Sidebar - 20% width */}
      <div className="w-2/10">
        <RightSidebar />
      </div>
    </div>
  );
}

export default App;
