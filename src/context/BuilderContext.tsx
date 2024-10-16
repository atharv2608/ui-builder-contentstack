import { UIElementInstance } from "@/components/builder/UIElements";
import { VisualsEntryResponse } from "@/services/fetchVisualsEntry";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type BuilderContextType = {
  elements: UIElementInstance[];
  setElements: Dispatch<SetStateAction<UIElementInstance[]>>;
  selectedContentType: string;
  setSelectedContentType: Dispatch<SetStateAction<string>>;
  selectedComponent: string;
  setSelectedComponent: Dispatch<SetStateAction<string>>;
  selectedSchema: string;
  setSelectedSchema: Dispatch<SetStateAction<string>>;
  
  // Make visualEntries nullable
  visualEntries: VisualsEntryResponse | null;
  setVisualEntries: Dispatch<SetStateAction<VisualsEntryResponse | null>>;
  
  generatedJson: Record<string, any>;
  addElement: (id: number, element: UIElementInstance) => void;
};

export const BuilderContext = createContext<BuilderContextType | null>(null);

export default function BuilderContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<UIElementInstance[]>([]);
  const [selectedContentType, setSelectedContentType] = useState<string>("");
  const [selectedComponent, setSelectedComponent] = useState<string>("");
  const [selectedSchema, setSelectedSchema] = useState<string>("");
  const [generatedJson, setGeneratedJson] = useState<Record<string, any>>({});
  
  // Initialize visualEntries as null, and make it nullable in state
  const [visualEntries, setVisualEntries] = useState<VisualsEntryResponse | null>(null);

  // Function to add element at a specified index
  const addElement = (index: number, element: UIElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  // Function to generate the UI JSON structure
  const generateUIJson = () => {
    const json = {
      page: selectedContentType,

      components: elements.map((element)=> {
        const component: UIElementInstance = {
          id: element.id,
          type: element.type,
          styles: element.styles,
          linkedContentTypeUID: element.linkedContentTypeUID,
          linkedSchemaID: element.linkedSchemaID,
          elementCategory: element.elementCategory
        }

        if(element.content){
          component.content = element.content
        }

        return component;
      }),
    };
    return json;
  };

  // Update generated JSON whenever elements or selectedContentType changes
  useEffect(() => {
    const newJson = generateUIJson();
    setGeneratedJson(newJson);
  }, [elements, selectedContentType]);

  return (
    <BuilderContext.Provider
      value={{
        elements,
        setElements,
        selectedComponent,
        setSelectedComponent,
        selectedContentType,
        setSelectedContentType,
        generatedJson,
        addElement,
        selectedSchema,
        setSelectedSchema,
        
        // Ensure visualEntries can be null
        visualEntries,
        setVisualEntries,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}
