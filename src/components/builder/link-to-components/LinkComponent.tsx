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
import { UIElementInstance } from "../UIElements";
import { ContentType } from "@/types";
import { toast } from "react-toastify";
import { useCallback } from "react";

function LinkComponent({
  selectedCanvasComponent,
  contentType,
}: {
  selectedCanvasComponent: UIElementInstance;
  contentType: ContentType;
}) {
  const {
    selectedSchema,
    selectedContentType,
    elements,
    setElements,
    setSelectedSchema,
    entries,
  } = useBuilder();

  const onSchemaValueChange = useCallback(
    async (value: any) => {
      setSelectedSchema(value);

      const entry = entries?.entries[0];
      if (!entry) {
        toast.warn("No entry found");
        return;
      }
      if (selectedCanvasComponent && selectedCanvasComponent.styles) {
        if (
          selectedCanvasComponent?.type === "Image" &&
          selectedCanvasComponent.styles
        ) {
          if (
            typeof entry[value as keyof typeof entry] === "object" &&
            entry[value as keyof typeof entry] !== null &&
            "href" in (entry[value as keyof typeof entry] as any)
          ) {
            const newStyles = {
              ...selectedCanvasComponent.styles,
              src: (entry[value as keyof typeof entry] as { href: string })
                .href, // Cast to ensure TypeScript knows it has 'href'
            };
            const newElement = {
              ...selectedCanvasComponent,
              linkedContentTypeUID: selectedContentType,
              linkedSchemaID: value,
              styles: newStyles,
            };

            const newElements = elements.map((element) =>
              element.id === selectedCanvasComponent.id ? newElement : element
            );
            setElements(newElements as UIElementInstance[]);
          } else {
            toast.error("No image URL found in entry");
            setSelectedSchema("");
            return;
          }
        } else if (selectedCanvasComponent && selectedCanvasComponent.styles) {
          if (
            typeof entry[value as keyof typeof entry] === "object" &&
            entry[value as keyof typeof entry] !== null &&
            "href" in (entry[value as keyof typeof entry] as any)
          ) {
            toast.error("Cannot link image to this component");
            setSelectedSchema("");
            return;
          }
          const newStyles = {
            ...selectedCanvasComponent.styles,
            label: entry[value as keyof typeof entry] || "",
          };
          const newElement = {
            ...selectedCanvasComponent,
            linkedContentTypeUID: selectedContentType,
            linkedSchemaID: value as string,
            styles: newStyles,
          };
          const newElements = elements.map((element) =>
            element.id === selectedCanvasComponent.id ? newElement : element
          );
          setElements(newElements as UIElementInstance[]);
        }
      }
    },
    [
      entries,
      selectedCanvasComponent,
      selectedContentType,
      elements,
      setElements,
      setSelectedSchema,
    ]
  );
  return (
    <div>
      <Label
        htmlFor="component-link"
        className="text-sm font-medium text-gray-700 mb-2 block"
      >
        Link To
      </Label>
      <Select
        value={selectedSchema}
        disabled={
          !selectedContentType ||
          elements.length === 0 ||
          selectedCanvasComponent?.type === "Product"
        }
        onValueChange={onSchemaValueChange}
      >
        <SelectTrigger className="border-black">
          <SelectValue placeholder="Select a schema" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Schemas</SelectLabel>
            {contentType?.schema?.map((s) => (
              <SelectItem
                value={s.uid}
                key={s.uid}
                disabled={
                  s.uid === "products" ||
                  s.uid === "blogs" ||
                  s.uid === "team_members"
                }
              >
                {s.uid}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default LinkComponent;
