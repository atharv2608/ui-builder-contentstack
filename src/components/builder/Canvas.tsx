import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { useDroppable } from "@dnd-kit/core";
function Canvas() {
  const droppable = useDroppable({
    id: "canvas-drop-area",
    data: {
      isCanvasDropArea: true,
    },
  });
  return (
    <div className="flex w-full h-full">
      <LeftSidebar />
      <div className="p-4 w-full">
        <div className="bg-gray-300 max-w-[920px] h-full m-auto  rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto">
          <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
            Drop here
          </p>
        </div>
      </div>
      <RightSidebar />
    </div>
  );
}

export default Canvas;
