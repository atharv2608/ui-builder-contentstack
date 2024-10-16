import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { SidebarButtonElementDragOverlay } from "./SidebarButtonElement";
import { ElementsType, UIElementInstance, UIElements } from "./UIElements";
import useBuilder from "@/hooks/useBuilder";
import { ImageDragOverlay } from "./fields/Image";
import { BlogDragOverlay } from "./fields/Blog";

function DragOverlayWrapper() {
  const {elements} = useBuilder();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;
  let node = <div>No drag overlay</div>;
  const isSidebarButtonElement =
    draggedItem?.data?.current?.isCanvasButtonElement;
  if (isSidebarButtonElement) {
    const type = draggedItem?.data?.current?.type as ElementsType;
    node = <SidebarButtonElementDragOverlay uiElement={UIElements[type]} />;
  }
  const isCanvasElement = draggedItem.data?.current?.isCanvasElement;
  const type = draggedItem?.data?.current?.type
  if (isCanvasElement && type === "Image") {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((el) =>el.id === elementId) as UIElementInstance;
    node = <ImageDragOverlay elementInstance={element} />
  }
  if (isCanvasElement && type === "Blog") {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((el) =>el.id === elementId) as UIElementInstance;
    node = <BlogDragOverlay elementInstance={element} />
  }
  else if(isCanvasElement){
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((el) =>el.id === elementId);
    if(!element)node = <div>Element not found!</div>
    else{
      const CanvasElementComponent = UIElements[element.type].canvasComponent;

      node =(
      <div className="bg-gray-400 flex border rounded-md min-h-[120px]  w-full py-2 px-4 opacity-80 pointer-events-none">

        <CanvasElementComponent  elementInstance={element} />
      </div> )
    }
  }
  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
