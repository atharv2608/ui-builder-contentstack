import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ContentTypeNames } from "@/services/fetchEntry";
import { ContentType } from "@/types";
import useBuilder from "@/hooks/useBuilder";
import { fetchEntry } from "@/services/fetchEntry";
import FontSize from "./component-styles/text/FontSize";
import { UIElementInstance } from "./UIElements";
import FontColor from "./component-styles/text/FontColor";
import BackgroundColor from "./component-styles/text/BackgroundColor";
import FontWeight from "./component-styles/text/FontWeight";
import Height from "./component-styles/image/Height";
import LinkToProduct from "./component-styles/product/LinkToProduct";
import Width from "./component-styles/image/Width";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { EntryResponse } from "@/services/fetchEntry";

export default function RightSidebar() {
  const {
    selectedContentType,
    elements,
    selectedComponent,
    setSelectedComponent,
    setElements,
    selectedSchema,
    setSelectedSchema,
  } = useBuilder();

  const [entries, setEntries] = useState<EntryResponse | undefined>(undefined);

  useEffect(() => {
    const fetchEntries = async () => {
      if(selectedContentType){

        const fetchedEntries = await fetchEntry(
          selectedContentType as ContentTypeNames
        );
        
        setEntries(fetchedEntries as EntryResponse);
      }
    };

    fetchEntries();
  }, [selectedContentType]);

  useEffect(()=>{
    setSelectedComponent("");
    setSelectedSchema("")
  }, [selectedContentType]);

  const selectedCanvasComponent = elements.find(
    (element) => element.id === selectedComponent
  );

  const contentType: ContentType | undefined = useSelector(
    (state: RootState) => state.contentTypes.contentTypes
  ).find((contentType: ContentType) => contentType.uid === selectedContentType);

  const handleReset = () => {
    if (selectedCanvasComponent && selectedCanvasComponent.styles) {
      // Find the selected element
      let newStyles = {};

      // Reset styles based on the component type
      switch (selectedCanvasComponent.type) {
        case "Heading":
        case "TextField":
        case "Paragraph":
          newStyles = {
            color: "#000000", // Default black color
            fontSize: selectedCanvasComponent.type === "Heading" ? "32" : "16", // Adjust font size based on type
            fontWeight: "400", // Default font weight
            backgroundColor: "#ffffff", // Default white background
          };
          break;

        case "Image":
          newStyles = {
            height: "200px", // Reset height for image
            width: "300px", // Reset width for image
          };
          break;

        case "Product":
          newStyles = {
            productName: "Product Name",
            productDescription: "Product Description",
            productImage:
              "https://cdn.leonardo.ai/users/fe39703b-08bb-495c-94db-eed1dda61cc4/generations/6ffbf7cd-8d07-4e03-aba7-eebd28ed086e/Leonardo_Phoenix_A_minimalist_composition_featuring_a_sleek_mo_1.jpg",
            productPrice: "Price",
          };
          break;

        default:
          // If no type matches, leave styles unchanged or add default reset behavior
          break;
      }

      // Create the new element with updated attributes
      const newElement = {
        ...selectedCanvasComponent,
        styles: {
          ...selectedCanvasComponent.styles,
          ...newStyles, // Merge with the existing attributes
        },
      };

      // Update the elements array with the new element
      const newElements = elements.map((element) =>
        element.id === selectedCanvasComponent.id ? newElement : element
      );
      setElements(newElements);
    }
  };
  

  const onSchemaValueChange = async (value: any) => {
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
            src: (
              entry[value as keyof typeof entry] as { href: string }
            ).href, // Cast to ensure TypeScript knows it has 'href'
          };
          const newElement = {
            ...selectedCanvasComponent,
            linkedContentTypeUID: selectedContentType,
            linkedSchemaID: value,
            styles: newStyles,
          };


          console.log("New element: ", newElement);
          const newElements = elements.map((element) =>
            element.id === selectedCanvasComponent.id
              ? newElement
              : element
          );
          setElements(newElements as UIElementInstance[]);
        } else {
          toast.error("No image URL found in entry");
          setSelectedSchema("");
          return;
        }
      } else if (
        selectedCanvasComponent &&
        selectedCanvasComponent.styles
      ) {
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
          element.id === selectedCanvasComponent.id
            ? newElement
            : element
        );
        setElements(newElements as UIElementInstance[]);
      }
    }
  }

  return (
    <div className="w-full  flex flex-col flex-grow gap-2 border-l-2 border-muted p-4  overflow-y-auto h-full">
      <div className="">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Data Link Tab</h2>
          <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
            <Label
              htmlFor="component-select"
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Component
            </Label>
            <Select
              value={selectedComponent}
              onValueChange={setSelectedComponent}
            >
              <SelectTrigger className="border-black">
                <SelectValue placeholder="Select a component" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Components on Canvas</SelectLabel>
                  {elements.map((element) => (
                    <SelectItem value={element.id} key={element.id}>
                      {`${element.type}-${element.id}`}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className={`${["Product", "Blog"].includes(selectedCanvasComponent?.type as string) ? "hidden" : ""}`}>
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
                      disabled={s.uid === "products" || s.uid === "blogs"}
                    >
                      {s.uid}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            </div>

            {selectedCanvasComponent?.type === "Product" && (
              <LinkToProduct
                selectedCanvasComponent={selectedCanvasComponent}
              />
            )}
          </div>
        </div>

        <Separator className="my-4" />

        <div>
          <h2 className="text-lg font-semibold mb-2">Styling</h2>
          <p className="text-sm text-gray-600 mb-4">
            Selected component: {selectedComponent}
          </p>

          <div className="space-y-4">
            {["TextField", "Heading", "Paragraph"].includes(
              selectedCanvasComponent?.type as string
            ) && (
              <div>
                <FontSize
                  selectedCanvasComponent={
                    selectedCanvasComponent as UIElementInstance
                  }
                />

                <FontWeight
                  selectedCanvasComponent={
                    selectedCanvasComponent as UIElementInstance
                  }
                />

                <FontColor
                  selectedCanvasComponent={
                    selectedCanvasComponent as UIElementInstance
                  }
                />

                <BackgroundColor
                  selectedCanvasComponent={
                    selectedCanvasComponent as UIElementInstance
                  }
                />
              </div>
            )}
            {selectedCanvasComponent?.type === "Image" && (
              <>
                <Height selectedCanvasComponent={selectedCanvasComponent} />
                <Width selectedCanvasComponent={selectedCanvasComponent} />
              </>
            )}
            
          </div>
        </div>
      </div>
      <div className="flex justify-between ">
        <Button onClick={handleReset} className="bg-indigo-500 text-white">
          Reset styles
        </Button>
      </div>
    </div>
  );
}
