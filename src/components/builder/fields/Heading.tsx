import { Heading } from "lucide-react";
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
let extraAttributes = {
  label: "Heading",
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
    <div className={`flex flex-col gap-2 w-full ${element.extraAttributes?.className}`}>
      <span className="absolute bottom-0 text-sm right-5 opacity-40">Component ID: {element.id}</span>
      <h1 
        className={`text-3xl ${element.extraAttributes?.className}`} 
        style={{ 
                  color: element?.extraAttributes?.color || "black" ,
                  fontSize: element.extraAttributes?.fontSize || "32px",
                  backgroundColor: element?.extraAttributes?.backgroundColor || "#fff"
              }} // Apply color from extraAttributes
      >
        {element?.extraAttributes?.label}
      </h1>
    </div>
  );
}
