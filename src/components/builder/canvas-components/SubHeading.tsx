import { Heading2 } from "lucide-react";
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
let styles = {
  tag: "h2",
  fontSize: "24"
};
const type: ElementsType = "SubHeading";
export const SubHeadingUIElement: UIElement = {
  type: "SubHeading",
  construct: (id: string) => ({
    id,
    type,
    styles,
    elementCategory: "text"
  }),
  buttonElement: {
    icon: Heading2,
    label: "Sub-heading",
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
        className={`text-2xl ${element.styles?.className}`}
        style={{
          color: element?.styles?.color || "black",
          fontSize: `${element.styles?.fontSize}px` || "24px",
          fontWeight: element?.styles?.fontWeight || "400",
          textAlign: element?.styles?.textAlign || "left"
        }}
      >
        {element?.styles?.label || "Sub Heading"}
      </h1>
    </div>
  );
}