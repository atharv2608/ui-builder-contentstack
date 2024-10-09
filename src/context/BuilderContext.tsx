import { UIElementInstance } from "@/components/builder/UIElements";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type BuilderContextType = {
  elements: UIElementInstance[];
  setElements: Dispatch<SetStateAction<UIElementInstance[]>>;
  selectedContentType: string;
  setSelectedContentType: Dispatch<SetStateAction<string>>;
  selectedComponent: string;
  setSelectedComponent: Dispatch<SetStateAction<string>>;

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
  const [selectedComponent, setSelectedComponent] = useState("");

  const addElement = (index: number, element: UIElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  return (
    <BuilderContext.Provider
      value={{
        elements,
        setElements,
        selectedComponent,
        setSelectedComponent,
        selectedContentType,
        setSelectedContentType,
        addElement,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}
