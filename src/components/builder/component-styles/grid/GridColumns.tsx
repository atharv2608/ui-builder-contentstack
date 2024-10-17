import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UIElementInstance } from "../../UIElements";
import { useEffect, useState } from "react";
import useBuilder from "@/hooks/useBuilder";
import { Label } from "@/components/ui/label";
function GridColumns({
  selectedCanvasComponent,
}: {
  selectedCanvasComponent: UIElementInstance;
}) {

  const [column, setColumn] = useState(selectedCanvasComponent?.styles?.layout?.gridTemplateColumns?.cols);
  const {elements, setElements} = useBuilder()


  useEffect(()=> {
    setColumn(selectedCanvasComponent?.styles?.layout?.gridTemplateColumns?.cols)
  }, [selectedCanvasComponent])
  const onSelectValueChange = (value: string) => {
    setColumn(value);
    if (selectedCanvasComponent && selectedCanvasComponent.styles) {
      selectedCanvasComponent.styles.layout.gridTemplateColumns.cols = value

      const updatedElement = elements.map(element =>
        element.id === selectedCanvasComponent.id ? 
        {
          ...element,
          styles:{
            ...element.styles,
            layout: {
              ...element?.styles?.layout,
              gridTemplateColumns: {
                cols: value
              },
            },
          }
        } : element
      );

      setElements(updatedElement);
    }
  };
  return (
    <div>
      <Label
                htmlFor="grid-columns"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Number of Grid Columns
              </Label>
      <Select value={column} onValueChange={onSelectValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Number of columns" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Columns</SelectLabel>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default GridColumns;
