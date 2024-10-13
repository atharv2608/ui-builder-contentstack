import { Pilcrow } from "lucide-react"; // If you have an icon for paragraph
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
import { Parser } from "html-to-react";

// Default attributes for the paragraph
const extraAttributes = {
  color: "#000000",
  fontSize: "16",
  fontWeight: "400",
  backgroundColor: "#ffffff",
  label: "This is a paragraph", // Default label for the paragraph
};

const type: ElementsType = "Paragraph";

export const ParagraphUIElement: UIElement = {
  type: "Paragraph",
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  buttonElement: {
    icon: Pilcrow, // Use an appropriate icon for paragraph if available
    label: "Paragraph",
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
  const element = elementInstance as CustomInstance;
  const htmlParser = Parser();
  
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="absolute bottom-0 text-sm right-5 opacity-40">
        Component ID: {element.id}
      </span>
      <p
        style={{
          color: element?.extraAttributes?.color || "black",
          fontSize: `${element.extraAttributes?.fontSize}px` || "16px",
          fontWeight: element?.extraAttributes?.fontWeight || "400",
        }}
      >
        {htmlParser.parse(element?.extraAttributes?.label) || "Default paragraph text goes here."}
      </p>
    </div>
  );
}
