import { cn } from "@/lib/utils";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { ElementsType, UIElementInstance, UIElements } from "./UIElements";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
function Canvas({
  elements,
  setElements,
}: {
  elements: UIElementInstance[];
  setElements: React.Dispatch<React.SetStateAction<UIElementInstance[]>>;
}) {
  // const [elements, setElements] = useState<UIElementInstance[]>([]);
  const addElement = (index: number, element: UIElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };
  const droppable = useDroppable({
    id: "canvas-drop-area",
    data: {
      isCanvasDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd(event) {
      const { active, over } = event;
      if (!active || !over) return;

      const isCanvasButtonElement =
        active?.data?.current?.isCanvasButtonElement;
      if (isCanvasButtonElement) {
        const type = active?.data?.current?.type;
        const newElement = UIElements[type as ElementsType].construct(
          Math.floor(Math.random() * 10001).toString()
        );
        addElement(0, newElement);
        // console.log("New element: ", newElement);
      }
      // console.log("Drag End: ", event);
    },
  });

  const removeElement = (id: string) => {
    console.log("remove");
    setElements((prev) => prev.filter((element) => element.id !== id));
  };
  return (
    <div className="flex w-full h-full">
      <LeftSidebar />
      <div className="p-4 w-full">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-gray-300 max-w-[920px] h-full m-auto  rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary/20"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col text-black w-full gap-2 p-4">
              {elements.map((element) => (
                <CanvasElementWrapper
                  key={element.id}
                  element={element}
                  removeElement={removeElement}
                />
              ))}
            </div>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-gray-400"></div>
            </div>
          )}
        </div>
      </div>
      <RightSidebar />
    </div>
  );
}

function CanvasElementWrapper({
  element,
  removeElement,
}: {
  element: UIElementInstance;
  removeElement: (id: string) => void;
}) {
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfCanvasElement: true,
    },
  });
  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfCanvasElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isCanvasElement: true,
    },
  });

  if (draggable.isDragging) return null;
  const CanvasElement = UIElements[element.type].canvasComponent;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full bottom-0 h-1/2 rounded-b-md"
      ></div>
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              variant={"outline"}
              onClick={() => {
                console.log("called");
                removeElement(element.id);
              }}
            >
              <Trash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-sm">Drag to move</p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[7px] bg-black rounded-b-none"></div>
      )}

      <div
        className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-violet-400 px-4 py-2 pointer-events-none opacity-100",
          mouseIsOver && "opacity-30"
        )}
      >
        <CanvasElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-black rounded-t-none"></div>
      )}
    </div>
  );
}

export default Canvas;
