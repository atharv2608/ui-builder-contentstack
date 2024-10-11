import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UIElementInstance } from "../../UIElements";
import useBuilder from "@/hooks/useBuilder";

function BackgroundColor({
  selectedCanvasComponent,
}: {
  selectedCanvasComponent: UIElementInstance;
}) {

    const {elements, setElements} = useBuilder();
  return <div>
  <Label
    htmlFor="color"
    className="text-sm font-medium text-gray-700"
  >
    Background Color
  </Label>
  <Input
    id="color"
    type="color"
    value={selectedCanvasComponent?.extraAttributes?.backgroundColor || "#ffffff"}
    onChange={(e) => {
      if (
        selectedCanvasComponent &&
        selectedCanvasComponent.extraAttributes
      ) {
        // Dynamically update the color
        const selectedElement = elements.find(
          (element) => element.id === selectedCanvasComponent.id
        );
        if (
          selectedElement &&
          selectedElement.extraAttributes
        ) {
          const newExtraAttributes = {
            ...selectedElement.extraAttributes,
            backgroundColor: e.target.value,
          };
          const newElement = {
            ...selectedElement,
            extraAttributes: newExtraAttributes,
          };
          const newElements = elements.map((element) =>
            element.id === selectedCanvasComponent.id
              ? newElement
              : element
          );
          setElements(newElements);
        }
      }
    }}
    className="mt-1 h-10"
  />
</div>
}

export default BackgroundColor;
