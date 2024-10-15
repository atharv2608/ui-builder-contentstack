import { Heading } from "lucide-react";
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
let styles = {
  tag: "h1"
};
const type: ElementsType = "Heading";
export const HeadingUIElement: UIElement = {
  type: "Heading",
  construct: (id: string) => ({
    id,
    type,
    styles,
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
  styles: typeof styles;
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
        className={`text-3xl ${element.styles?.className}`}
        style={{
          color: element?.styles?.color || "black",
          fontSize: `${element.styles?.fontSize}px` || "32px",
          fontWeight: element?.styles?.fontWeight || "400",
        }}
      >
        {element?.styles?.label || "Heading"}
      </h1>
    </div>
  );
}
