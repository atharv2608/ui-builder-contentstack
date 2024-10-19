import { UIElementInstance } from "../../UIElements";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useBuilder from "@/hooks/useBuilder";
import { ContentTypeNames, fetchEntry } from "@/services/fetchEntry";
import { ContentType } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function LinkToHeroSection({
  selectedCanvasComponent,
  contentType,
}: {
  selectedCanvasComponent: UIElementInstance;
  contentType: ContentType;
}) {
  const { elements, setElements, selectedContentType } = useBuilder();
  const [entries, setEntries] = useState<any>(undefined);
  const [selectedFields, setSelectedFields] = useState({
    title: "",
    subtitle: "",
    image: "",
  });

  useEffect(() => {
    const fetchEntries = async () => {
      if (selectedContentType) {
        const fetchedEntries = await fetchEntry(selectedContentType as ContentTypeNames);
        setEntries(fetchedEntries as any);
      }
    };
    fetchEntries();
  }, [selectedContentType]);

  const handleValueChange = (field: "title" | "subtitle" | "image", value: string) => {
    setSelectedFields((prev) => ({ ...prev, [field]: value }));
    if (!selectedCanvasComponent || !selectedCanvasComponent.content) return;

    const entry = entries?.entries[0];
    if (!entry) {
      toast.warn("No entry found");
      return;
    }

    if (field === "image") {
      if (
        typeof entry[value as keyof typeof entry] === "object" &&
        entry[value as keyof typeof entry] !== null &&
        "href" in (entry[value as keyof typeof entry] as any)
      ) {
        updateComponentContent(field, (entry[value as keyof typeof entry] as { href: string }).href);
      } else {
        toast.error("No image URL found in entry");
        setSelectedFields((prev) => ({ ...prev, image: "" }));
      }
    } else {
      if (
        typeof entry[value as keyof typeof entry] === "object" &&
        entry[value as keyof typeof entry] !== null &&
        "href" in (entry[value as keyof typeof entry] as any)
      ) {
        toast.error("Cannot link this schema to component");
        setSelectedFields((prev) => ({ ...prev, [field]: "" }));
      } else {
        updateComponentContent(field, entry[value as keyof typeof entry] || "");
      }
    }
  };

  const updateComponentContent = (field: string, value: string) => {
    const newContent = {
      ...selectedCanvasComponent.content,
      [field]: value,
    };
    const newElement = {
      ...selectedCanvasComponent,
      content: newContent,
    };
    const newElements = elements.map((element) =>
      element.id === selectedCanvasComponent.id ? newElement : element
    );
    setElements(newElements as UIElementInstance[]);
  };

  return (
    <div className="space-y-3">
      {["title", "image", "subtitle"].map((field) => (
        <div key={field}>
          <Label
            htmlFor={`${field}-link`}
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Select {field.charAt(0).toUpperCase() + field.slice(1)}
          </Label>
          <Select
            value={selectedFields[field as keyof typeof selectedFields]}
            onValueChange={(value) => handleValueChange(field as "title" | "subtitle" | "image", value)}
          >
            <SelectTrigger className="border-black">
              <SelectValue placeholder={`Select a ${field}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Schemas</SelectLabel>
                {contentType?.schema?.map((s) => (
                  <SelectItem value={s.uid} key={s.uid}>
                    {s.uid}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}

export default LinkToHeroSection;
