import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import SidebarButtonElement from "./SidebarButtonElement";
import { UIElements } from "./UIElements";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import useBuilder from "@/hooks/useBuilder";

function LeftSidebar() {
  const contentTypesArray = useSelector(
    (state: RootState) => state.contentTypes.contentTypes
  );

  const {setSelectedContentType} = useBuilder();
  return (
    <div className="flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-white overflow-y-auto h-full">
      <div className="mb-6">
        <label
          htmlFor="content-type"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Select Content Type
        </label>
        <div className="relative">
          <Select onValueChange={(value) => setSelectedContentType(value)}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select a content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Content Type</SelectLabel>
                {contentTypesArray.map((contentType: any) => (
                  <SelectItem key={contentType.uid} value={contentType.uid}>
                    {contentType.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"></div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
      <SidebarButtonElement uiElement={UIElements.TextField} />
      <SidebarButtonElement uiElement={UIElements.Paragraph} />
        <SidebarButtonElement uiElement={UIElements.Heading} />
        <SidebarButtonElement uiElement={UIElements.Image} />
        <SidebarButtonElement uiElement={UIElements.Product} />
        
      </div>
    </div>
  );
}

export default LeftSidebar;
