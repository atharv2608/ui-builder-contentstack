import { useState } from "react";
import { useDrop, useDrag } from "react-dnd";
import { ComponentItemType, CanvasComponent } from "@/types";
import CanvasItem from "./CanvasItem";

// Main Canvas component with drag and drop reordering
function Canvas() {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "component",
    drop: (item: ComponentItemType) => addComponentToCanvas(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const components: CanvasComponent[] = [
    { id: 1, name: "Heading", type: "h1" },
    { id: 2, name: "Subheading", type: "h2" },
    { id: 3, name: "Textbox", type: "span" },
    { id: 4, name: "Textarea", type: "p" },
    { id: 5, name: "Image", type: "img" },
  ];

  const [componentsOnCanvas, setComponentsOnCanvas] = useState<CanvasComponent[]>([]);

  const addComponentToCanvas = (id: number) => {
    const component = components.find((component) => component.id === id);
    setComponentsOnCanvas((prev) => [...prev, component as CanvasComponent]);
  };

  const removeComponentFromCanvas = (id: number) => {
    setComponentsOnCanvas((prev) => prev.filter((component) => component.id !== id));
  };

  const moveComponent = (dragIndex: number, hoverIndex: number) => {
    const updatedComponents = [...componentsOnCanvas];
    const [draggedComponent] = updatedComponents.splice(dragIndex, 1);
    updatedComponents.splice(hoverIndex, 0, draggedComponent);
    setComponentsOnCanvas(updatedComponents);
  };

  return (
    <div className="min-h-screen width-[50%] bg-gray-200 p-5 space-y-4" ref={drop}>
      {componentsOnCanvas.map((component, index) => (
        <CanvasItem
          key={component.id}
          component={component}
          index={index}
          moveComponent={moveComponent}
          removeComponent={removeComponentFromCanvas}
        />
      ))}
    </div>
  );
}

export default Canvas;
