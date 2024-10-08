import { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ContentType } from '@/types';

interface PropTypes{
  selectedContentType: string,
}
export default function RightSidebar({selectedContentType}: PropTypes) {
  const [selectedComponent, setSelectedComponent] = useState('button');
  const [fontSize, setFontSize] = useState('16');
  const [color, setColor] = useState('#000000');
  const [height, setHeight] = useState('40');
  const [width, setWidth] = useState('100');

  const contentType: ContentType | undefined= useSelector(
    (state: RootState) => state.contentTypes.contentTypes
  ).find(contentType => contentType.uid === selectedContentType);
  
  const handleSave = () => {
    // Implement save functionality
    console.log('Saving...');
  };

  const handleReset = () => {
    // Implement reset functionality
    setFontSize('16');
    setColor('#000000');
    setHeight('40');
    setWidth('100');
  };

  return (
    <div className="w-[400px]  flex flex-col flex-grow gap-2 border-l-2 border-muted p-4  overflow-y-auto h-full">
      <div className="flex-1">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Data Link Tab</h2>
          <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
            <Label htmlFor="component-select" className="text-sm font-medium text-gray-700 mb-2 block">
              Component
            </Label>
            <Select value={selectedComponent} onValueChange={setSelectedComponent}>
              <SelectTrigger id="component-select">
                <SelectValue placeholder="Select component" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="button">Button</SelectItem>
                <SelectItem value="input">Input</SelectItem>
                <SelectItem value="select">Select</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="component-select" className="text-sm font-medium text-gray-700 mb-2 block">
              Link To
            </Label>
            <Select>
            <SelectTrigger >
              <SelectValue placeholder="Select a schema" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Schemas</SelectLabel>
                {contentType?.schema?.map(s =>
                  <SelectItem value={s.uid} key={s.uid}>{s.uid}</SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          </div>
        </div>

        <Separator className="my-4" />

        <div>
          <h2 className="text-lg font-semibold mb-2">Styling</h2>
          <p className="text-sm text-gray-600 mb-4">Selected component: {selectedComponent}</p>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="font-size" className="text-sm font-medium text-gray-700">Font Size</Label>
              <Input
                id="font-size"
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="color" className="text-sm font-medium text-gray-700">Color</Label>
              <Input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="mt-1 h-10"
              />
            </div>
            <div>
              <Label htmlFor="height" className="text-sm font-medium text-gray-700">Height</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="width" className="text-sm font-medium text-gray-700">Width</Label>
              <Input
                id="width"
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={() => console.log('JSON Preview')}
          >
            JSON Preview
          </Button>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <Button onClick={handleSave}>Save</Button>
        <Button variant="outline" onClick={handleReset}>Reset</Button>
      </div>
    </div>
  );
}
