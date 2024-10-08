import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import SidebarButtonElement from "./SidebarButtonElement";
import { UIElements } from "./UIElements";

import { Dispatch, SetStateAction } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
interface PropTypes {
  setSelectedContentType: Dispatch<SetStateAction<string>>;
}
function LeftSidebar({ setSelectedContentType }: PropTypes) {
  const contentTypesArray = useSelector(
    (state: RootState) => state.contentTypes.contentTypes
  );
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-white overflow-y-auto h-full">
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
      <div className="flex flex-wrap gap-5 justify-center ">
        <SidebarButtonElement uiElement={UIElements.TextField} />
        <SidebarButtonElement uiElement={UIElements.Heading} />
        <SidebarButtonElement uiElement={UIElements.Image} />
      </div>
    </aside>
  );
}

export default LeftSidebar;
