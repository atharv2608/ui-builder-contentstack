import { Heading } from "lucide-react";
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
const extraAttributes = {
  label: "Heading",
  helperText: "Helper Text",
  required: false,
  placeHolder: "Value",
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
    <div className="flex flex-col gap-2 w-full">
      <h1 className="text-3xl">{element?.extraAttributes?.label}</h1>
    </div>
  );
}
