import { Box } from "lucide-react";
import {
  ElementsType,
  UIElement,
  UIElementInstance,
  UIElements,
} from "../UIElements";
import { useDndMonitor, useDroppable, useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
const extraAttributes = {
  label: "Flex Box",
  helperText: "Helper Text",
  required: false,
};
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
    label: "Flex Box",
  },
  canvasComponent: CanvasComponent,
  UIComponent: () => <div>UI Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};

type CustomInstance = UIElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function CanvasComponent({
  elementInstance,
}: {
  elementInstance: UIElementInstance;
}) {
  const [flexElements, setFlexElements] = useState<UIElementInstance[]>([]);

  const { setNodeRef: setFlexNodeRef, isOver: isFlexOver } = useDroppable({
    id: `flex-container-${elementInstance.id}`,
    data: { isFlexDropArea: true },
  });

  const addElement = (index: number, element: UIElementInstance) => {
    setFlexElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setFlexElements((prev) => prev.filter((element) => element.id !== id));
  };

  // Handle drag and drop for elements inside Flex
  useDndMonitor({
    onDragEnd(event) {
      const { active, over } = event;
      if (!active || !over) return;

      const isCanvasButtonElement =
        active?.data?.current?.isCanvasButtonElement;
      const isDroppingOverFlexArea = over?.data?.current?.isFlexDropArea;

      if (isCanvasButtonElement && isDroppingOverFlexArea) {
        const type = active?.data?.current?.type;
        const newElement = UIElements[type as ElementsType].construct(
          Math.floor(Math.random() * 10001).toString()
        );
        addElement(flexElements.length, newElement);
        return;
      }
    },
  });

  const element = elementInstance as CustomInstance;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className="flex p-4 rounded-md border-dashed border-2 border-gray-300"
        ref={setFlexNodeRef}
      >
        {!isFlexOver && flexElements.length === 0 && (
          <p className="text-xl text-muted-foreground flex-grow text-center">
            Drop here
          </p>
        )}
        {flexElements.length > 0 && (
          <div className="flex flex-col text-black w-full gap-2">
            {flexElements.map((element) => (
              <FlexElementWrapper
                key={element.id}
                element={element}
                removeElement={removeElement}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FlexElementWrapper({
  element,
  removeElement,
}: {
  element: UIElementInstance;
  removeElement: (id: string) => void;
}) {
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const { setNodeRef: setTopRef } = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfCanvasElement: true,
    },
  });
  const { setNodeRef: setBottomRef } = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfCanvasElement: true,
    },
  });

  const { setNodeRef: setDragRef, listeners, attributes } = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isCanvasElement: true,
    },
  });

  if (!element) return null;

  const FlexElement = UIElements[element.type].canvasComponent;

  return (
    <div
      ref={setDragRef}
      {...listeners}
      {...attributes}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <div
        ref={setTopRef}
        className="absolute w-full h-1/2 rounded-t-md"
      ></div>
      <div
        ref={setBottomRef}
        className="absolute w-full bottom-0 h-1/2 rounded-b-md"
      ></div>
      {mouseIsOver && (
        <Button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 border rounded-md bg-red-500"
          variant="outline"
          onClick={() => removeElement(element.id)}
        >
          <Trash className="h-6 w-6" />
        </Button>
      )}
      <FlexElement elementInstance={element} />
    </div>
  );
}
