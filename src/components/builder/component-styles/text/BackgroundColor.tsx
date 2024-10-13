import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UIElementInstance } from "../../UIElements";
import useBuilder from "@/hooks/useBuilder";
import { useState, useEffect, useCallback } from "react";

function BackgroundColor({
  selectedCanvasComponent,
}: {
  selectedCanvasComponent: UIElementInstance;
}) {
  const { elements, setElements } = useBuilder();

  // Local state for background color
  const [backgroundColor, setBackgroundColor] = useState<string>(
    selectedCanvasComponent?.extraAttributes?.backgroundColor || "#ffffff"
  );

  // Sync color state when the selected component changes
  useEffect(() => {
    if (selectedCanvasComponent?.extraAttributes?.backgroundColor) {
      setBackgroundColor(selectedCanvasComponent.extraAttributes.backgroundColor);
    } else {
      setBackgroundColor("#ffffff"); // Default color if no background color is set
    }
  }, [selectedCanvasComponent]);

  // Update the background color of the selected element only
  const handleBackgroundColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setBackgroundColor(newColor); // Update local state immediately

    // Find the selected element and update its background color only
    const updatedElements = elements.map((element) =>
      element.id === selectedCanvasComponent.id
        ? {
            ...element,
            extraAttributes: {
              ...element.extraAttributes,
              backgroundColor: newColor,
            },
          }
        : element
    );

    // Debounce the state update to avoid frequent updates and lag
    const debounceTimeout = setTimeout(() => {
      setElements(updatedElements);
    }, 300); // Adjust debounce delay as needed

    // Clear the timeout on unmount to prevent memory leaks
    return () => clearTimeout(debounceTimeout);
  }, [selectedCanvasComponent.id, elements, setElements]);

  return (
    <div>
      <Label htmlFor="backgroundColor" className="text-sm font-medium text-gray-700">
        Background Color
      </Label>
      <Input
        id="backgroundColor"
        type="color"
        value={backgroundColor} // Use the local backgroundColor state
        onChange={handleBackgroundColorChange}
        className="mt-1 h-10"
      />
    </div>
  );
}

export default BackgroundColor;
