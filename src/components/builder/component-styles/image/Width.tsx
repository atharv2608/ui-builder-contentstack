import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UIElementInstance } from "../../UIElements";
import useBuilder from "@/hooks/useBuilder";
import { useState, useEffect, useCallback } from "react";

function Width({
  selectedCanvasComponent,
}: {
  selectedCanvasComponent: UIElementInstance;
}) {
  const { elements, setElements } = useBuilder();

  // Local state for width
  const [width, setWidth] = useState<number>(
    selectedCanvasComponent?.styles?.width || 300
  );

  // Sync the local state with the selected component's width
  useEffect(() => {
    if (selectedCanvasComponent?.styles?.width) {
      setWidth(selectedCanvasComponent.styles.width);
    } else {
      setWidth(600); // Default width
    }
  }, [selectedCanvasComponent]);

  // Function to handle width changes
  const handleWidthChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newWidth = Number(e.target.value);
      setWidth(newWidth); // Update local state

      // Find the selected element and update its width
      const updatedElements = elements.map((element) =>
        element.id === selectedCanvasComponent.id
          ? {
              ...element,
              styles: {
                ...element.styles,
                width: newWidth,
              },
            }
          : element
      );

      // Update the elements in the global state
      setElements(updatedElements);
    },
    [selectedCanvasComponent.id, elements, setElements]
  );

  return (
    <div>
      <Label htmlFor="width" className="text-sm font-medium text-gray-700">
        Width
      </Label>
      <Input
        id="width"
        type="number"
        value={width} // Use local state for value
        onChange={handleWidthChange} // Handle changes using callback
        className="mt-1"
      />
    </div>
  );
}

export default Width;
