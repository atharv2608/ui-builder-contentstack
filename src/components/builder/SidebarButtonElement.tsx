import { UIElement } from "./UIElements";
import { Button } from "../ui/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
function SidebarButtonElement({ uiElement }: { uiElement: UIElement }) {
  const { label, icon: Icon } = uiElement.buttonElement;
  const draggable = useDraggable({
    id: `canvas-btn-${uiElement.type}`,
    data: {
      type: uiElement.type,
      isCanvasButtonElement: true,
    },
  });
  return (
    <Button
      className={cn(
        "flex flex-col gap-2 h-[100px] w-[100px] cursor-grab bg-white border border-black",
        draggable.isDragging && "ring-2 ring-primary border-none"
      )}
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 w-8 text-indigo-500 cursor-grab" />
      <p className="text-xs text-indigo-500">{label}</p>
    </Button>
  );
}

export function SidebarButtonElementDragOverlay({
  uiElement,
}: {
  uiElement: UIElement;
}) {
  const { label, icon: Icon } = uiElement.buttonElement;
  const draggable = useDraggable({
    id: `canvas-btn-${uiElement.type}`,
    data: {
      type: uiElement.type,
      isCanvasButtonElement: true,
    },
  });
  return (
    <Button className="flex flex-col gap-2 h-[100px] w-[100px] cursor-grab">
      <Icon className="h-8 w-8 text-indigo-500 cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}

export default SidebarButtonElement;
