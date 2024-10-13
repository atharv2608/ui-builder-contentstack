import { useState } from "react";
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
import { fetchProducts } from "@/services/fetchProducts";
import LinkToProduct from "./component-styles/product/LinkToProduct";
import Width from "./component-styles/image/Width";
import { Button } from "../ui/button";

export default function RightSidebar() {
  const {
    selectedContentType,
    elements,
    selectedComponent,
    setSelectedComponent,
    setElements,
  } = useBuilder();
  const selectedCanvasComponent = elements.find(
    (element) => element.id === selectedComponent
  );
  fetchProducts();

  const contentType: ContentType | undefined = useSelector(
    (state: RootState) => state.contentTypes.contentTypes
  ).find((contentType: ContentType) => contentType.uid === selectedContentType);
  
  const handleSave = () => {
    // Implement save functionality
    console.log("Saving...");
  };

  const handleReset = () => {
    if (selectedCanvasComponent && selectedCanvasComponent.extraAttributes) {
      // Find the selected element
        let newExtraAttributes = {};
  
        // Reset styles based on the component type
        switch (selectedCanvasComponent.type) {
          case "Heading":
          case "TextField":
          case "Paragraph":
            newExtraAttributes = {
              color: "#000000", // Default black color
              fontSize: selectedCanvasComponent.type === "Heading" ? "32" : "16", // Adjust font size based on type
              fontWeight: "400", // Default font weight
              backgroundColor: "#ffffff", // Default white background
            };
            break;
  
          case "Image":
            newExtraAttributes = {
              height: "200px", // Reset height for image
              width: "300px",  // Reset width for image
            };
            break;

          case "Product":
            newExtraAttributes = {
              productName: "Product Name",
              productDescription: "Product Description",
              productImage: "https://cdn.leonardo.ai/users/fe39703b-08bb-495c-94db-eed1dda61cc4/generations/6ffbf7cd-8d07-4e03-aba7-eebd28ed086e/Leonardo_Phoenix_A_minimalist_composition_featuring_a_sleek_mo_1.jpg",
              productPrice: "Price"
            };
            break;
  
        
  
          default:
            // If no type matches, leave extraAttributes unchanged or add default reset behavior
            break;
        }
  
        // Create the new element with updated attributes
        const newElement = {
          ...selectedCanvasComponent,
          extraAttributes: {
            ...selectedCanvasComponent.extraAttributes,
            ...newExtraAttributes, // Merge with the existing attributes
          },
        };
  
        // Update the elements array with the new element
        const newElements = elements.map((element) =>
          element.id === selectedCanvasComponent.id ? newElement : element
        );
        setElements(newElements);
      
    }
  };
  

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
            <Label
              htmlFor="component-select"
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Link To
            </Label>
            <Select
            disabled={!selectedContentType || elements.length === 0 ||selectedCanvasComponent?.type === "Product"}
              onValueChange={async (value) => {
                const entries = await fetchEntry(
                  selectedContentType as ContentTypeNames
                );
                const entry = entries?.entries[0];
                if (!entry) {
                  console.warn("Entry is undefined");
                  alert("No entry found")
                  return;
                }
                if (
                  selectedCanvasComponent &&
                  selectedCanvasComponent.extraAttributes
                ) {
                  const selectedElement = elements.find(
                    (element) => element.id === selectedCanvasComponent.id
                  );
                  if (
                    selectedElement?.type === "Image" &&
                    selectedElement.extraAttributes
                  ) {
                    if (
                      typeof entry[value as keyof typeof entry] === "object" &&
                      entry[value as keyof typeof entry] !== null &&
                      "href" in (entry[value as keyof typeof entry] as any)
                    ) {
                      const newExtraAttributes = {
                        ...selectedElement.extraAttributes,
                        src: (
                          entry[value as keyof typeof entry] as { href: string }
                        ).href, // Cast to ensure TypeScript knows it has 'href'
                      };
                      const newElement = {
                        ...selectedElement,
                        extraAttributes: newExtraAttributes,
                      };
                      const newElements = elements.map((element) =>
                        element.id === selectedCanvasComponent.id
                          ? newElement
                          : element
                      );
                      setElements(newElements);
                    }
                  } else if (
                    selectedElement &&
                    selectedElement.extraAttributes
                  ) {
                    const newExtraAttributes = {
                      ...selectedElement.extraAttributes,
                      label: entry[value as keyof typeof entry] || "",
                    };
                    const newElement = {
                      ...selectedElement,
                      extraAttributes: newExtraAttributes,
                    };
                    const newElements = elements.map((element) =>
                      element.id === selectedCanvasComponent.id
                        ? newElement
                        : element
                    );
                    setElements(newElements);
                  }
                }
              }}
            >
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
              <Height selectedCanvasComponent={selectedCanvasComponent}/>
              <Width selectedCanvasComponent={selectedCanvasComponent} />
              </>
            )}
            {selectedCanvasComponent?.type === "Product" && (
              <LinkToProduct selectedCanvasComponent={selectedCanvasComponent}/>
            )}
          </div>

          
        </div>
      </div>
      <div className="flex justify-between ">
        <Button  onClick={handleReset} className="bg-indigo-500 text-white">
          Reset styles
        </Button>
      </div>
      
    </div>
  );
}
