import { Image } from "lucide-react";
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
const styles = {
  tag: "img",
  label: "Image",
  required: false,
  height: "400",
  width: "600"
};
let content = {
  src: "https://cdn.leonardo.ai/users/fe39703b-08bb-495c-94db-eed1dda61cc4/generations/6ffbf7cd-8d07-4e03-aba7-eebd28ed086e/Leonardo_Phoenix_A_minimalist_composition_featuring_a_sleek_mo_1.jpg",
  altText: "Leonardo Phoenix"
}
const type: ElementsType = "Image";
export const ImageUIElement: UIElement = {
  type: "Image",
  construct: (id: string) => ({
    id,
    type,
    styles,
    content,
    elementCategory: "image"
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
  styles: typeof styles;
  content: typeof content;
};

function CanvasComponent({
  elementInstance,
}: {
  elementInstance: UIElementInstance;
}) {
  const element = elementInstance as CustomeInstance;
  return (
    
      <div className="w-full flex justify-center p-4">
      <span className="absolute bottom-2 text-sm right-5 opacity-40">Component ID: {element.id}</span>

        <img 
          src={element.content.src as string} alt={element.content.altText}  

          style={{ 
                    height: `${element.styles?.height}px`,
                    width: element.styles?.width ? `${element.styles?.width}px` : ""
                }}
        />
      </div>
    
  );
}


export function ImageDragOverlay({elementInstance} : {elementInstance:  UIElementInstance}) {
const element = elementInstance as CustomeInstance;
  return (
    
      <div className="w-full h-[120px] bg-gray-400 opacity-80 rounded-md shadow-md flex justify-between p-2">
    

        <img src={element.content.src} alt={element.content.altText}  className="h-[100px]"/>
      </div>
    
  );
}

