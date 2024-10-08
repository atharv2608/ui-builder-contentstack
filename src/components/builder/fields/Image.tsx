import { Image } from "lucide-react";
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
const extraAttributes = {
  label: "Image",
  altText: "Image",
  required: false,
};
const type: ElementsType = "Image";
export const ImageUIElement: UIElement = {
  type: "Image",
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  buttonElement: {
    icon: Image,
    label: "Image",
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
    
      <div >
        <img src="/public/default.jpg" alt={element?.extraAttributes?.altText} />
      </div>
    
  );
}
