import { cn } from "@/lib/utils";
import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { ElementsType, UIElementInstance, UIElements } from "./UIElements";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import useBuilder from "@/hooks/useBuilder";
import { fetchVisualEntries } from "@/services/fetchVisualsEntry";

function Canvas() {
  const { setSelectedComponent, addElement, setElements, elements, selectedComponent, setSelectedSchema, setVisualEntries, visualEntries , selectedContentType} =
    useBuilder();
    const [newElements, setNewElements] = useState<UIElementInstance[]>([]);

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

      const isDroppingOverCanvasArea = over?.data?.current?.isCanvasDropArea;
      if (isCanvasButtonElement && isDroppingOverCanvasArea) {
        const type = active?.data?.current?.type;
        const newElement = UIElements[type as ElementsType].construct(
          Math.floor(Math.random() * 10001).toString()
        );
        addElement(elements.length, newElement);
        return;
      }
      const isDroppingOverCanvasElementTopHalf =
        over?.data?.current?.isTopHalfCanvasElement;

      const isDroppingOverCanvasElementBottomHalf =
        over?.data?.current?.isBottomHalfCanvasElement;

      const isDroppingOverCanvasElement =
        isDroppingOverCanvasElementTopHalf ||
        isDroppingOverCanvasElementBottomHalf;

      const droppingSidebarButtonOverCanvasElement =
        isCanvasButtonElement && isDroppingOverCanvasElement;

      if (droppingSidebarButtonOverCanvasElement) {
        const type = active?.data?.current?.type;
        const newElement = UIElements[type as ElementsType].construct(
          Math.floor(Math.random() * 10001).toString()
        );
        const overId = over?.data?.current?.elementId;
        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) {
          throw new Error("Element not found");
        }
        let indexForNewElement = overElementIndex;
        if (isDroppingOverCanvasElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }
        addElement(indexForNewElement, newElement);
        return;
      }

      const isDraggingCanvasElement = active?.data?.current?.isCanvasElement;
      const draggingCanvasElementOverAnotherCanvasElement =
        isDroppingOverCanvasElement && isDraggingCanvasElement;

      if (draggingCanvasElementOverAnotherCanvasElement) {
        const activeId = active?.data?.current?.elementId;
        const overId = over?.data?.current?.elementId;

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        );
        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("Element not found");
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);
        let newIndex = overElementIndex;
        if (isDroppingOverCanvasElementBottomHalf) {
          newIndex = overElementIndex + 1;
        }
        addElement(newIndex, activeElement);
      }
    },
  });

  const removeElement = (id: string) => {
    if(selectedComponent === id){
      setSelectedComponent("");
      setSelectedSchema("");
    }
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

    // Function to load elements based on selected content type and visual entries
    const loadElementsFromVisualEntries = () => {
      if (visualEntries && selectedContentType) {
        const entry = visualEntries.entries.find(
          (e) => e.title === selectedContentType
        );
        
        // Check if entry and its ui_json exist, and if components is an array
        if (entry && entry.ui_json && Array.isArray(entry.ui_json.components)) {
          const parsedElements: UIElementInstance[] = entry.ui_json.components.map(
            (jsonElement: any) => ({
              id: jsonElement.id,
              type: jsonElement.type,
              extraAttributes: jsonElement.attributes,
            })
          );
          setElements(parsedElements);
        } else {
          setElements([]); // No entry found or no UI JSON, set to empty
        }
      }
    };
    
    
  
    // Fetch visual entries on load and when selectedContentType changes
    useEffect(() => {
      async function fetchData() {
        try {
          const fetchedResponse = await fetchVisualEntries(); // This returns the full Axios response
          const fetchedEntries = fetchedResponse.data; // Extract the data from the response
          setVisualEntries(fetchedEntries); // Now set the visual entries state
        } catch (error) {
          console.error("Error fetching visual entries:", error);
          // Handle error accordingly
          setVisualEntries(null); // Optionally set to null or handle as needed
        }
      }
    
      fetchData();
    }, [setVisualEntries]);
    
  
    // Populate elements when visual entries or selectedContentType changes
    useEffect(() => {
      loadElementsFromVisualEntries();
    }, [visualEntries, selectedContentType]);
  return (
    <div className="flex w-full h-full">

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
                  onClickEvent={() => setSelectedComponent(element.id)}
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
      {/* <RightSidebar /> */}
    </div>
  );
}

function CanvasElementWrapper({
  element,
  removeElement,
  onClickEvent,
}: {
  element: UIElementInstance;
  removeElement: (id: string) => void;
  onClickEvent: () => void;
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
      onClick={onClickEvent}
      className="relative min-h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
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
        <div>
          <div className="absolute right-0 ">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
            >
              <Trash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-xl  font-bold text-indigo-500">Click to Select or Drag to move</p>
          </div>
        </div>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[7px] bg-black rounded-b-none"></div>
      )}

      <div
        className={cn(
          "flex w-full min-h-[120px] items-center rounded-md  px-4 py-2 pointer-events-none opacity-100 shadow-lg",
          mouseIsOver && "opacity-30"
        )}
        style={{
          backgroundColor: element?.extraAttributes?.backgroundColor || "#fff"
        }}
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
