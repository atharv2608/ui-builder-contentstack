import { Heading1 } from "lucide-react";
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
import { Parser } from "html-to-react";
import useBuilder from "@/hooks/useBuilder";
import { useEffect } from "react";
import { fetchFreshEntries } from "@/services/fetchAndUpdateFreshTextContent";

export let defaultHeadingStyles = {
  tag: "h1",
  fontSize: "32",
  fontWeight: "400",
  textAlign: "left" as "left" | "right" | "center" | "justify",
};

let content = {
  text: "Heading",
};
const type: ElementsType = "Heading";
export const HeadingUIElement: UIElement = {
  type: "Heading",
  construct: (id: string) => ({
    id,
    type,
    styles: defaultHeadingStyles,
    content,
    elementCategory: "text",
  }),
  buttonElement: {
    icon: Heading1,
    label: "Heading",
  },
  canvasComponent: CanvasComponent,
  UIComponent: () => <div>UI Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};

export type CustomeInstance = UIElementInstance & {
  styles: typeof defaultHeadingStyles;
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
    <div className={`flex flex-col gap-2 w-full`}>
      <span className="absolute bottom-0 text-sm right-5 opacity-40">
        Component ID: {element.id}
      </span>
      <h1
        className={`text-3xl ${element.styles?.className}`}
        style={{
          color: element.styles.color,
          fontSize: `${element.styles?.fontSize}px`,
          fontWeight: element.styles.fontWeight,
          textAlign: element.styles.textAlign,
        }}
      >
        {htmlParser.parse(element.content.text)}
      </h1>
    </div>
  );
}
