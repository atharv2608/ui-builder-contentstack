import { Box } from "lucide-react";
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
import { Card, CardContent } from "@/components/ui/card";
let styles = {
  type: "product",
};
const type: ElementsType = "Product";
export const ProductUIElement: UIElement = {
  type: "Product",
  construct: (id: string) => ({
    id,
    type,
    styles,
    elementCategory: "product"
  }),
  buttonElement: {
    icon: Box,
    label: "Product",
  },
  canvasComponent: CanvasComponent,
  UIComponent: () => <div>UI Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};

type CustomeInstance = UIElementInstance & {
  styles: typeof styles;
};

function CanvasComponent({
  elementInstance,
}: {
  elementInstance: UIElementInstance;
}) {
  const element = elementInstance as CustomeInstance;
  return (
    <div className={`flex flex-col gap-2 w-full`}>
      <span className="absolute bottom-2 text-sm right-5 opacity-40">Component ID: {element.id}</span>

       <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/3">
            <img
              src={element?.content?.productImage || "https://eu-images.contentstack.com/v3/assets/blta0fb2d378b73e901/bltdd5f470eea949f9f/670fd8311509f334c28c79e3/default-product.jpg"}
              alt={"name"}
              className="w-full h-48 sm:h-full object-cover"
            />
          </div>
          <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{element?.content?.productName || "Product Name"}</h2>
              <p className="text-muted-foreground mb-4">{element?.content?.productDescription || "Product Description"}</p>
              <div className="text-xl font-semibold">Rs: {element?.content?.productPrice || "Product Price"}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}
