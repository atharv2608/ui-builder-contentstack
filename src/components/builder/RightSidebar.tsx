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
import { ContentType } from "@/types";
import useBuilder from "@/hooks/useBuilder";
import FontSize from "./component-styles/text/FontSize";
import { UIElementInstance } from "./UIElements";
import FontColor from "./component-styles/text/FontColor";
import BackgroundColor from "./component-styles/text/BackgroundColor";
import FontWeight from "./component-styles/text/FontWeight";
import Height from "./component-styles/image/Height";
import LinkToProduct from "./link-to-components/product/LinkToProduct";
import Width from "./component-styles/image/Width";
import { Button } from "../ui/button";
import { useCallback, useEffect } from "react";
import LinkToBlog from "./link-to-components/blog/LinkToBlog";
import GridColumns from "./component-styles/grid/GridColumns";
import AlignText from "./component-styles/text/AlignText";
import LinkToHeroSection from "./link-to-components/Hero/LinkToHeroSection";
import LinkComponent from "./link-to-components/LinkComponent";
import { defaultHeroSectionContent } from "./canvas-components/HeroSection";

export default function RightSidebar() {
  const {
    selectedContentType,
    elements,
    selectedComponent,
    setSelectedComponent,
    setElements,
    setSelectedSchema,
  } = useBuilder();

  useEffect(() => {
    setSelectedComponent("");
    setSelectedSchema("");
  }, [selectedContentType]);

  const selectedCanvasComponent = elements.find(
    (element) => element.id === selectedComponent
  );

  const contentType: ContentType | undefined = useSelector(
    (state: RootState) => state.contentTypes.contentTypes
  ).find((contentType: ContentType) => contentType.uid === selectedContentType);

  const handleReset = useCallback(() => {
    if (selectedCanvasComponent && selectedCanvasComponent.styles) {
      // Find the selected element
      let resetStyles = {};
      let resetContent = {};

      // Reset styles based on the component type
      switch (selectedCanvasComponent.type) {
        case "Heading":
        case "TextField":
        case "Paragraph":
        case "SubHeading":
          resetStyles = {
            color: "#000000", // Default black color
            fontSize: selectedCanvasComponent.type === "Heading" ? "32" : "16", // Adjust font size based on type
            fontWeight: "400", // Default font weight
            backgroundColor: "#ffffff", // Default white background
          };
          break;

        case "Image":
          resetStyles = {
            height: "400", // Reset height for image
            width: "600", // Reset width for image
          };
          break;

        case "Product":
          resetContent = {
            productName: "Product Name",
            productDescription: "Product Description",
            productImage:
              "https://eu-images.contentstack.com/v3/assets/blta0fb2d378b73e901/bltdd5f470eea949f9f/670fd8311509f334c28c79e3/default-product.jpg",
            productPrice: "Price",
          };
          break;

        case "Blog":
          resetContent = {
            title: "Blog Title",
            cover_image:
              "https://eu-images.contentstack.com/v3/assets/blta0fb2d378b73e901/blt6ddf1e7a6b41751b/670fad1a273b107659129d13/default-cover-image.jpg",
            blog_content:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora maiores possimus repudiandae asperiores eaque esse, facere officiis ratione suscipit iste doloribus sapiente laudantium facilis recusandae animi totam quas veniam itaque",
            author: "author",
            published_date: "1970-01-01T00:00:00.000Z",
          };
          break;
        
        case "HeroSection": 
          resetContent = {
            ...defaultHeroSectionContent
          }
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
          ...resetStyles, // Merge with the existing attributes
        },
        content: {
          ...selectedCanvasComponent.content,
          ...resetContent,
        },
      };

      // Update the elements array with the new element
      const newElements = elements.map((element) =>
        element.id === selectedCanvasComponent.id ? newElement : element
      );
      setElements(newElements);
    }
  }, [selectedCanvasComponent]);

 

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
            <div
              className={`${
                ["Product", "Blog", "HeroSection"].includes(
                  selectedCanvasComponent?.type as string
                )
                  ? "hidden"
                  : ""
              }`}
            >
              <LinkComponent selectedCanvasComponent={selectedCanvasComponent as UIElementInstance} contentType={contentType as ContentType} />
            </div>
            {
              selectedCanvasComponent?.type === "HeroSection" && (
                <LinkToHeroSection contentType={contentType as ContentType} selectedCanvasComponent={selectedCanvasComponent as UIElementInstance} />
              )
            }
            {selectedCanvasComponent?.type === "Product" && (
              <LinkToProduct
                selectedCanvasComponent={selectedCanvasComponent}
              />
            )}
            {selectedCanvasComponent?.type === "Blog" && (
              <LinkToBlog selectedCanvasComponent={selectedCanvasComponent} />
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
            {selectedCanvasComponent?.elementCategory === "text" && (
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

                <AlignText
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

            {selectedCanvasComponent?.elementCategory === "grid" && (
              <GridColumns selectedCanvasComponent={selectedCanvasComponent} />
            )}
          </div>
        </div>
      </div>
      {selectedCanvasComponent && (
        <div className="flex justify-between ">
          <Button onClick={handleReset} className="bg-indigo-500 text-white">
            {selectedCanvasComponent.elementCategory === "text"
              ? "Reset Styles"
              : selectedCanvasComponent.elementCategory === "blog"
              ? "Reset Blog"
              : selectedCanvasComponent.elementCategory === "product"
              ? "Reset Product"
              : "Reset"}
          </Button>
        </div>
      )}
    </div>
  );
}
