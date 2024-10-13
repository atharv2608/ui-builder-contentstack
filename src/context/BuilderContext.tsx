import { UIElementInstance } from "@/components/builder/UIElements";
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
  const [selectedContentType, setSelectedContentType] = useState<string>("home_page");
  const [selectedComponent, setSelectedComponent] = useState<string>("");
  const [generatedJson, setGeneratedJson] = useState<Record<string, any>>({});

  console.log("Elements: ", elements);

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
      components: elements.map((element) => ({
        id: element.id,
        type: element.type,
        attributes: element.extraAttributes,
      })),
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
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}
