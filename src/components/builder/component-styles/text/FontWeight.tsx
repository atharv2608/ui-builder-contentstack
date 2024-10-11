import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";
import { UIElementInstance } from "../../UIElements";
import useBuilder from "@/hooks/useBuilder";

function FontWeight({
  fontWeight,
  setFontWeight,
  selectedCanvasComponent,
}: {
  fontWeight: string;
  setFontWeight: Dispatch<SetStateAction<string>>;
  selectedCanvasComponent: UIElementInstance;
}) {
  const { elements, setElements } = useBuilder();
  return (
    <div>
      <Label
        htmlFor="font-weight"
        className="text-sm font-medium text-gray-700"
      >
        Font Weight
      </Label>
      <Input
        id="font-weight"
        type="number"
        max={900}
        min={100}
        step={100}
        value={fontWeight}
        onChange={(e) => {
          setFontWeight(e.target.value);
          if (
            selectedCanvasComponent &&
            selectedCanvasComponent.extraAttributes
          ) {
            const selectedElement = elements.find(
              (element) => element.id === selectedCanvasComponent.id
            );
            if (selectedElement && selectedElement.extraAttributes) {
              const newExtraAttributes = {
                ...selectedElement.extraAttributes,
                fontWeight: `${e.target.value}`,
              };
              const newElement = {
                ...selectedElement,
                extraAttributes: newExtraAttributes,
              };
              const newElements = elements.map((element) =>
                element.id === selectedCanvasComponent.id ? newElement : element
              );
              setElements(newElements);
            }
          }
        }}
        className="mt-1"
      />
    </div>
  );
}

export default FontWeight;
