import { useEffect, useState } from "react";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { Button } from "@/components/ui/button"; // Adjust the path based on your setup
import { UIElementInstance } from "../../UIElements";
import useBuilder from "@/hooks/useBuilder";
import { Label } from "@/components/ui/label";

function AlignText({
  selectedCanvasComponent,
}: {
  selectedCanvasComponent: UIElementInstance;
}) {
  const [alignment, setAlignment] = useState("left");
  const { elements, setElements } = useBuilder();

  useEffect(() => {
    if (selectedCanvasComponent?.styles?.textAlign) {
      setAlignment(selectedCanvasComponent?.styles?.textAlign);
    }
  }, [selectedCanvasComponent]);
  const handleAlignmentChange = (newAlignment: string) => {
    setAlignment(newAlignment);
    const updatedElements = elements.map((element) =>
      element.id === selectedCanvasComponent.id
        ? {
            ...element,
            styles: {
              ...element.styles,
              textAlign: newAlignment,
            },
          }
        : element
    );

    // Update the elements in the global state
    console.log("Aligh updated elements:", updatedElements)
    setElements(updatedElements);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="text-align" className="text-sm font-medium text-gray-700">
        Text Align
      </Label>
      <div className="flex space-x-2">
        {/* Align Left */}
        <Button
          variant={alignment === "left" ? "default" : "outline"}
          onClick={() => handleAlignmentChange("left")}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>

        {/* Align Center */}
        <Button
          variant={alignment === "center" ? "default" : "outline"}
          onClick={() => handleAlignmentChange("center")}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>

        {/* Align Right */}
        <Button
          variant={alignment === "right" ? "default" : "outline"}
          onClick={() => handleAlignmentChange("right")}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default AlignText;
