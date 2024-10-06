import { useDrop, useDrag } from "react-dnd";
import { CanvasComponent } from "@/types";
import { Button } from "./ui/button";
import { X } from "lucide-react";

// Component for rendering and handling reordering logic for individual canvas items
export default function CanvasItem({
  component,
  index,
  moveComponent,
  removeComponent,
}: {
  component: CanvasComponent;
  index: number;
  moveComponent: (dragIndex: number, hoverIndex: number) => void;
  removeComponent: (id: number) => void;
}) {
  const [{ isDragging }, drag] = useDrag({
    type: "movingComponent",
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "movingComponent",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveComponent(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))} // Both drag and drop refs applied
      className={`relative border-2 border-gray-400 p-2 ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="mr-auto">
        {component.type === "h1" && <h1 className="text-4xl">This is a heading tag</h1>}
        {component.type === "h2" && <h2 className="text-2xl">This is a subheading tag</h2>}
        {component.type === "span" && (
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit voluptas a architecto ad delectus labore aliquid ab
            sapiente eaque minus.
          </span>
        )}
        {component.type === "p" && (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto explicabo aperiam molestiae, dolore natus sit
            ducimus incidunt perferendis sed cumque quaerat commodi ipsa nisi earum, quisquam numquam sapiente, culpa
            consequuntur necessitatibus eligendi maiores atque.
          </p>
        )}
        {component.type === "img" && (
          <img
            src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
            alt="Placeholder"
            className="w-full h-[400px]"
          />
        )}
      </div>
      <Button
        variant="destructive"
        size="icon"
        className="absolute top-1 right-1 w-4 h-4"
        onClick={() => removeComponent(component.id)}
      >
        <X className="w-2 h-2" />
      </Button>
    </div>
  );
}