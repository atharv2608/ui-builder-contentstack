import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UIElementInstance } from "../../UIElements";
import useBuilder from "@/hooks/useBuilder";
import { useState, useEffect, useCallback } from "react";

function FontSize({
  selectedCanvasComponent,
}: {
  selectedCanvasComponent: UIElementInstance;
}) {
  const { elements, setElements } = useBuilder();

  // Local state for font size
  const [fontSize, setFontSize] = useState<string>(
    selectedCanvasComponent?.extraAttributes?.fontSize ||
      (selectedCanvasComponent?.type === "Heading" ? "32" : "16")
  );

  // Sync the local state with the selected component's font size
  useEffect(() => {
    if (selectedCanvasComponent?.extraAttributes?.fontSize) {
      setFontSize(selectedCanvasComponent.extraAttributes.fontSize);
    } else {
      setFontSize(
        selectedCanvasComponent?.type === "Heading" ? "32" : "16"
      ); // Default font size
    }
  }, [selectedCanvasComponent]);

  // Function to handle font size changes
  const handleFontSizeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newFontSize = e.target.value;
    setFontSize(newFontSize); // Update the local state

    // Find the selected element and update its font size
    const updatedElements = elements.map((element) =>
      element.id === selectedCanvasComponent.id
        ? {
            ...element,
            extraAttributes: {
              ...element.extraAttributes,
              fontSize: newFontSize,
            },
          }
        : element
    );

    // Update the elements in the global state
    setElements(updatedElements);
  }, [selectedCanvasComponent.id, elements, setElements]);

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
        value={fontSize} // Use local state for value
        onChange={handleFontSizeChange} // Handle changes using callback
        className="mt-1"
      />
    </div>
  );
}

export default FontSize;
