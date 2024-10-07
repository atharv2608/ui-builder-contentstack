import { Text } from "lucide-react";
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
const extraAttributes = {
  label: "Text Field",
  helperText: "Helper Text",
  required: false,
  placeHolder: "Value",
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
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>{element.extraAttributes?.label}</Label>
      <Input readOnly disabled placeholder={"Placeholder here"}/>
    </div>
  );
}