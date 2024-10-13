import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UIElementInstance } from "../../UIElements";
import useBuilder from "@/hooks/useBuilder";
import { useState, useEffect, useCallback } from "react";

function FontWeight({
  selectedCanvasComponent,
}: {
  selectedCanvasComponent: UIElementInstance;
}) {
  const { elements, setElements } = useBuilder();

  // Local state for font weight
  const [fontWeight, setFontWeight] = useState<string>(
    selectedCanvasComponent?.extraAttributes?.fontWeight || "100"
  );

  // Sync the local state with the selected component's font weight
  useEffect(() => {
    if (selectedCanvasComponent?.extraAttributes?.fontWeight) {
      setFontWeight(selectedCanvasComponent.extraAttributes.fontWeight);
    } else {
      setFontWeight("100"); // Default to font-weight 100
    }
  }, [selectedCanvasComponent]);

  // Function to handle font weight changes
  const handleFontWeightChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newFontWeight = e.target.value;
    setFontWeight(newFontWeight); // Update local state

    // Find the selected element and update its font weight
    const updatedElements = elements.map((element) =>
      element.id === selectedCanvasComponent.id
        ? {
            ...element,
            extraAttributes: {
              ...element.extraAttributes,
              fontWeight: newFontWeight,
            },
          }
        : element
    );

    // Update the elements in the global state
    setElements(updatedElements);
  }, [selectedCanvasComponent.id, elements, setElements]);

  return (
    <div>
      <Label htmlFor="font-weight" className="text-sm font-medium text-gray-700">
        Font Weight
      </Label>
      <Input
        id="font-weight"
        type="number"
        max={900}
        min={100}
        step={100}
        value={fontWeight} // Use local state for value
        onChange={handleFontWeightChange} // Handle changes using callback
        className="mt-1"
      />
    </div>
  );
}

export default FontWeight;
