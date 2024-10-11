import { Heading } from "lucide-react";
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
let extraAttributes = {
  required: false,
};
const type: ElementsType = "Heading";
export const HeadingUIElement: UIElement = {
  type: "Heading",
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  buttonElement: {
    icon: Heading,
    label: "Heading",
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
  const element = elementInstance as CustomeInstance;
  return (
    <div className={`flex flex-col gap-2 w-full`}>
      <span className="absolute bottom-0 text-sm right-5 opacity-40">
        Component ID: {element.id}
      </span>
      <h1
        className={`text-3xl ${element.extraAttributes?.className}`}
        style={{
          color: element?.extraAttributes?.color || "black",
          fontSize: `${element.extraAttributes?.fontSize}px` || "32px",
          fontWeight: element?.extraAttributes?.fontWeight || "400",
        }}
      >
        {element?.extraAttributes?.label || "Heading"}
      </h1>
    </div>
  );
}
