import { useEffect, useState } from "react";
import {
  Image as ImageIcon,
  Heading1,
  Heading2,
  LetterText,
  Text,
  LayoutPanelTop,
} from "lucide-react";
import { fetchContentType, ContentType } from "@/services/fetchContentType";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Block from "./Block";
const blocks = [
  { id: 1, icon: Heading1, label: "Heading" },
  { id: 2, icon: Heading2, label: "Subheading" },
  { id: 3, icon: Text, label: "Textbox" },
  { id: 4, icon: LetterText, label: "Textarea" },
  { id: 5, icon: ImageIcon, label: "Image" },
  { id: 6, icon: LayoutPanelTop, label: "Section" },
];

export default function LeftSidebar() {
  const [selectedContentType, setSelectedContentType] = useState("");
  const [contentTypesArray, setContentTypesArray] = useState<ContentType[]>([]);
  useEffect(() => {
    const fetchContent = async () => {
      const response = await fetchContentType();
      setContentTypesArray(response?.content_types ?? []);
    };
    fetchContent();
  }, []);

  return (
    <div className="w-64 h-screen bg-gray-100 border-r p-4 flex flex-col">
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
                {contentTypesArray.map((contentType) => (
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

      <div className="grid grid-cols-2 gap-4">
        {blocks.map((block, index) => (
          <Block block={block} key={index} />
        ))}
      </div>
    </div>
  );
}
