import { Pilcrow } from "lucide-react"; // If you have an icon for paragraph
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
import { Parser } from "html-to-react";
import useBuilder from "@/hooks/useBuilder";
import { useEffect } from "react";
import { fetchFreshEntries } from "@/services/fetchAndUpdateFreshTextContent";

// Default attributes for the paragraph
const styles = {
  tag: "p",
 fontSize: "16"
};

const type: ElementsType = "Paragraph";
let content = {
  text: "Paragraph",
}
export const ParagraphUIElement: UIElement = {
  type: "Paragraph",
  construct: (id: string) => ({
    id,
    type,
    styles,
    content,
    elementCategory: "text"
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
  styles: typeof styles;
  content: typeof content;
};

function CanvasComponent({
  elementInstance,
}: {
  elementInstance: UIElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const htmlParser = Parser();
  const {elements, setElements}= useBuilder()
  useEffect(() => {
    if (element.linkedContentTypeUID && element.linkedSchemaID) {
      
      fetchFreshEntries(element, elements, setElements);
    }
  }, []);
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="absolute bottom-0 text-sm right-5 opacity-40">
        Component ID: {element.id}
      </span>
      <p
        style={{
          color: element?.styles?.color || "black",
          fontSize: `${element.styles?.fontSize}px` || "16px",
          fontWeight: element?.styles?.fontWeight || "400",
          textAlign: element?.styles?.textAlign || "left"
        }}
      >
        {htmlParser.parse(element.content.text)}
      </p>
    </div>
  );
}
