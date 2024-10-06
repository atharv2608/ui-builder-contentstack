import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import { useState } from "react";
import { SidebarButtonElementDragOverlay } from "./SidebarButtonElement";
import { ElementsType, UIElement, UIElements } from "./UIElements";

function DragOverlayWrapper() {
    const [draggedItem, setDraggedItem]= useState<Active | null>(null);
    useDndMonitor({
        onDragStart: (event)=>{
            setDraggedItem(event.active);
        },
        onDragCancel: ()=>{
            setDraggedItem(null);
        },
        onDragEnd: ()=>{
            setDraggedItem(null);
        }
    })

    if(!draggedItem) return null;
    let node = <div>No drag overlay</div>
    const isSidebarButtonElement = draggedItem?.data?.current?.isCanvasButtonElement;
    if(isSidebarButtonElement){
        const type = draggedItem?.data?.current?.type as ElementsType;
        node = <SidebarButtonElementDragOverlay uiElement={UIElements[type]}/>
    }
  return (
    
    <DragOverlay>
        {node}
    </DragOverlay>
  )
}

export default DragOverlayWrapper