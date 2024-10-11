import { Text } from "lucide-react";
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
import { Parser } from "html-to-react";
const extraAttributes = {
  color: "#000000",
  fontSize: "16",
  fontWeight: "400",
  backgroundColor: "#ffffff",
};
const type: ElementsType = "TextField";
export const TextFieldUIElement: UIElement = {
  type: "TextField",
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  buttonElement: {
    icon: Text,
    label: "Text field",
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
  const htmlParser = Parser();
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="absolute bottom-0 text-sm right-5 opacity-40">Component ID: {element.id}</span>
      <p
         style={{
          color: element?.extraAttributes?.color || "black",
          fontSize: element.extraAttributes?.fontSize || "16px",
          fontWeight: element?.extraAttributes?.fontWeight || "400",
        }}
      >
        {htmlParser.parse(element?.extraAttributes?.label) || "Text Goes here"}
      </p>
    </div>
  );
}
