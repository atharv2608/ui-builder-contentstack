import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UIElementInstance } from "../../UIElements";
import useBuilder from "@/hooks/useBuilder";

function Height({
    selectedCanvasComponent
}:{
    selectedCanvasComponent: UIElementInstance
}) {

  const { elements, setElements} = useBuilder();
  return (
    <div>
      <Label htmlFor="height" className="text-sm font-medium text-gray-700">
        Height
      </Label>
      <Input
        id="height"
        type="number"
        value={selectedCanvasComponent?.extraAttributes?.height || 300}
        onChange={(e) =>{
          if (
            selectedCanvasComponent &&
            selectedCanvasComponent.extraAttributes
          ) {
            // Dynamically update the height of the image
            const selectedElement = elements.find(
              (element) => element.id === selectedCanvasComponent.id
            );
            if (selectedElement && selectedElement.extraAttributes) {
              const newExtraAttributes = {
                ...selectedElement.extraAttributes,
                height: e.target.value,
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

export default Height;
