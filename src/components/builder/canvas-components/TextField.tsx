import { Text } from "lucide-react";
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
import { Parser } from "html-to-react";
import useBuilder from "@/hooks/useBuilder";
import { useEffect } from "react";
import { fetchFreshEntries } from "@/services/fetchAndUpdateFreshTextContent";
const styles = {
 tag: "span",
 fontSize: "16"
};
let content = {
  text: "Textfield"
}
const type: ElementsType = "TextField";
export const TextFieldUIElement: UIElement = {
  type: "TextField",
  construct: (id: string) => ({
    id,
    type,
    styles,
    content,
    elementCategory: "text"
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
  styles: typeof styles;
  content: typeof content;

};

function CanvasComponent({
  elementInstance,
}: {
  elementInstance: UIElementInstance;
}) {
  const element = elementInstance as CustomeInstance;
  const htmlParser = Parser();
  const {elements, setElements}= useBuilder()
  useEffect(() => {
    if (element.linkedContentTypeUID && element.linkedSchemaID) {
      
      fetchFreshEntries(element, elements, setElements);
    }
  }, []);
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="absolute bottom-0 text-sm right-5 opacity-40">Component ID: {element.id}</span>
      <span
         style={{
          color: element?.styles?.color || "black",
          fontSize: `${element.styles?.fontSize}px` || "16px",
          fontWeight: element?.styles?.fontWeight || "400",
          textAlign: element?.styles?.textAlign || "left"
        }}
      >
        {htmlParser.parse(element.content.text)}
      </span>
    </div>
  );
}
