import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UIElementInstance } from "../../UIElements";
import useBuilder from "@/hooks/useBuilder";
import { useState, useEffect, useCallback } from "react";

function FontColor({
  selectedCanvasComponent,
}: {
  selectedCanvasComponent: UIElementInstance;
}) {
  const { elements, setElements } = useBuilder();

  // Initialize color state based on selected component's current color
  const [color, setColor] = useState<string>(
    selectedCanvasComponent?.styles?.color || "#000000"
  );

  // Sync color state when the selected component changes
  useEffect(() => {
    if (selectedCanvasComponent?.styles?.color) {
      setColor(selectedCanvasComponent.styles.color);
    } else {
      setColor("#000000"); // Default color if no color is set
    }
  }, [selectedCanvasComponent]);

  // Update the color of the selected element only
  const handleColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor); // Update local state immediately

    // Find the selected element and update its color only
    const updatedElements = elements.map((element) =>
      element.id === selectedCanvasComponent.id
        ? {
            ...element,
            styles: {
              ...element.styles,
              color: newColor,
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
      <Label htmlFor="color" className="text-sm font-medium text-gray-700">
        Color
      </Label>
      <Input
        id="color"
        type="color"
        value={color} // Use the local color state
        onChange={handleColorChange}
        className="mt-1 h-10"
      />
    </div>
  );
}

export default FontColor;
