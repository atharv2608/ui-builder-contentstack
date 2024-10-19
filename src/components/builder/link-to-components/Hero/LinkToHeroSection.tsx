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

  useEffect(() => {
    const fetchEntries = async () => {
      if (selectedContentType) {
        const fetchedEntries = await fetchEntry(
          selectedContentType as ContentTypeNames
        );

        setEntries(fetchedEntries as any);
      }
    };

    fetchEntries();
  }, [selectedContentType]);
  const [selectedTitle, setSelectedTitle] = useState<string>();
  const [selectedImage, setSelectedImage] = useState<string>();
  const [selectedSubtitle, setSelectedSubtitle] = useState<string>();

  const onTitleValueChange = (value: string) => {
    setSelectedTitle(value);
    if (selectedCanvasComponent && selectedCanvasComponent.content) {
      const entry = entries?.entries[0];
      if (!entry) {
        toast.warn("No entry found");
        return;
      }

      if (
        typeof entry[value as keyof typeof entry] === "object" &&
        entry[value as keyof typeof entry] !== null &&
        "href" in (entry[value as keyof typeof entry] as any)
      ) {
        toast.error("Cannot link this schema to component");
        setSelectedTitle("");
        return;
      }
      const newConent = {
        ...selectedCanvasComponent.content,
        title: entry[value as keyof typeof entry] || "",
      };

      const newElement = {
        ...selectedCanvasComponent,
        content: newConent,
      };
      const newElements = elements.map((element) =>
        element.id === selectedCanvasComponent.id ? newElement : element
      );
      setElements(newElements as UIElementInstance[]);
    }
  };

  const onSubtitleValueChange = (value: string) => {
    setSelectedSubtitle(value);
    if (selectedCanvasComponent && selectedCanvasComponent.content) {
      const entry = entries?.entries[0];
      if (!entry) {
        toast.warn("No entry found");
        return;
      }

      if (
        typeof entry[value as keyof typeof entry] === "object" &&
        entry[value as keyof typeof entry] !== null &&
        "href" in (entry[value as keyof typeof entry] as any)
      ) {
        toast.error("Cannot link this schema to component");
        setSelectedTitle("");
        return;
      }
      const newConent = {
        ...selectedCanvasComponent.content,
        subtitle: entry[value as keyof typeof entry] || "",
      };

      const newElement = {
        ...selectedCanvasComponent,
        content: newConent,
      };
      const newElements = elements.map((element) =>
        element.id === selectedCanvasComponent.id ? newElement : element
      );
      setElements(newElements as UIElementInstance[]);
    }
  };

  const onImageValueChange = (value: string) => {
    setSelectedImage(value);
    if (selectedCanvasComponent && selectedCanvasComponent.content) {
      const entry = entries?.entries[0];
      if (!entry) {
        toast.warn("No entry found");
        return;
      }
    
      if (
        typeof entry[value as keyof typeof entry] === "object" &&
        entry[value as keyof typeof entry] !== null &&
        "href" in (entry[value as keyof typeof entry] as any)
      ) {
        const newContent = {
          ...selectedCanvasComponent.content,
          image: (entry[value as keyof typeof entry] as { href: string }).href, // Cast to ensure TypeScript knows it has 'href'
        };
        const newElement = {
          ...selectedCanvasComponent,
          content: newContent,
        };

        const newElements = elements.map((element) =>
          element.id === selectedCanvasComponent.id ? newElement : element
        );
        setElements(newElements as UIElementInstance[]);
      } else {
        toast.error("No image URL found in entry");
        setSelectedImage("");
        return;
      }
  }
}


  return (
    <div className="space-y-3">
      <div>
        <Label
          htmlFor="component-link"
          className="text-sm font-medium text-gray-700 mb-2 block"
        >
          Select  Title
        </Label>
        <Select value={selectedTitle} onValueChange={onTitleValueChange}>
          <SelectTrigger className="border-black">
            <SelectValue placeholder="Select a schema" />
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
      <div>
        <Label
          htmlFor="component-link"
          className="text-sm font-medium text-gray-700 mb-2 block"
        >
          Select Section Image
        </Label>
        <Select value={selectedImage} onValueChange={onImageValueChange}>
          <SelectTrigger className="border-black">
            <SelectValue placeholder="Select a schema" />
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
      <div>
        <Label
          htmlFor="component-link"
          className="text-sm font-medium text-gray-700 mb-2 block"
        >
          Select Subtitle
        </Label>
        <Select value={selectedSubtitle} onValueChange={onSubtitleValueChange}>
          <SelectTrigger className="border-black">
            <SelectValue placeholder="Select a schema" />
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
    </div>
  );
}

export default LinkToHeroSection;
