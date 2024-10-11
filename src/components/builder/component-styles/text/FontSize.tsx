import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";
import { UIElementInstance } from "../../UIElements";
import useBuilder from "@/hooks/useBuilder";

function FontSize({
  fontSize,
  setFontSize,
  selectedCanvasComponent,
}: {
  fontSize: string;
  setFontSize: Dispatch<SetStateAction<string>>;
  selectedCanvasComponent: UIElementInstance;
}) {
  const { elements, setElements } = useBuilder();
  return (
    <div>
      <Label htmlFor="font-size" className="text-sm font-medium text-gray-700">
        Font Size
      </Label>
      <Input
        id="font-size"
        type="number"
        max={80}
        min={1}
        value={
          selectedCanvasComponent?.extraAttributes?.fontSize ||
          (selectedCanvasComponent?.type === "Heading" ? "32" : "16") ||
          "16"
        }
        onChange={(e) => {
          setFontSize(e.target.value);

          if (
            selectedCanvasComponent &&
            selectedCanvasComponent.extraAttributes
          ) {
            // Dynamically update the font-size
            const selectedElement = elements.find(
              (element) => element.id === selectedCanvasComponent.id
            );
            if (selectedElement && selectedElement.extraAttributes) {
              const newExtraAttributes = {
                ...selectedElement.extraAttributes,
                fontSize: `${e.target.value}`,
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

export default FontSize;
