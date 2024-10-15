import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UIElementInstance } from "../../UIElements";
import useBuilder from "@/hooks/useBuilder";
import { useState, useEffect, useCallback } from "react";

function Height({
  selectedCanvasComponent,
}: {
  selectedCanvasComponent: UIElementInstance;
}) {
  const { elements, setElements } = useBuilder();

  // Local state for height
  const [height, setHeight] = useState<number>(
    selectedCanvasComponent?.styles?.height || 300
  );

  // Sync the local state with the selected component's height
  useEffect(() => {
    if (selectedCanvasComponent?.styles?.height) {
      setHeight(selectedCanvasComponent.styles.height);
    } else {
      setHeight(400); // Default height
    }
  }, [selectedCanvasComponent]);

  // Function to handle height changes
  const handleHeightChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = Number(e.target.value);
    setHeight(newHeight); // Update local state

    // Find the selected element and update its height
    const updatedElements = elements.map((element) =>
      element.id === selectedCanvasComponent.id
        ? {
            ...element,
            styles: {
              ...element.styles,
              height: newHeight,
            },
          }
        : element
    );

    // Update the elements in the global state
    setElements(updatedElements);
  }, [selectedCanvasComponent.id, elements, setElements]);

  return (
    <div>
      <Label htmlFor="height" className="text-sm font-medium text-gray-700">
        Height
      </Label>
      <Input
        id="height"
        type="number"
        value={height} // Use local state for value
        onChange={handleHeightChange} // Handle changes using callback
        className="mt-1"
      />
    </div>
  );
}

export default Height;
