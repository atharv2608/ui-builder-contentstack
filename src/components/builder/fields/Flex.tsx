import { Box } from "lucide-react";
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
let extraAttributes = {};

const type: ElementsType = "Flex";
export const FlexUIElement: UIElement = {
  type: "Flex",
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  buttonElement: {
    icon: Box,
    label: "Flex",
  },
  canvasComponent: CanvasComponent,
  UIComponent: () => <div>UI Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};

type CustomeInstance = UIElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function CanvasComponent({
  elementInstance,
}: {
  elementInstance: UIElementInstance;
}) {
  const [flexElements, setFlexElements] = useState<UIElementInstance[]>([]);

  const droppable = useDroppable({
    id: "flex-drop-area",
    data: {
      isFlexDropArea: true,
    },
  });

  const element = elementInstance as CustomeInstance;
  return (
    <div
      className={`flex flex-col gap-2 w-full h-[400px]`}
      ref={droppable.setNodeRef}
    >
      {!droppable.isOver && flexElements.length === 0 && (
        <p className="text-3xl text-muted-foreground flex justify-center flex-grow items-center font-bold">
          Flex Container
        </p>
      )}

      {droppable.isOver && flexElements.length === 0 && (
        <div className="p-4 w-full">
          <div className="h-[120px] rounded-md bg-gray-400"></div>
        </div>
      )}
    </div>
  );
}
