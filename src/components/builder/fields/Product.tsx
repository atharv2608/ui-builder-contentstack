import { Box } from "lucide-react";
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
import { Card, CardContent } from "@/components/ui/card";
let extraAttributes = {
  type: "product",
  productName: "Product Name",
  productDescription: "Product Description",
  productImage: "https://cdn.leonardo.ai/users/fe39703b-08bb-495c-94db-eed1dda61cc4/generations/6ffbf7cd-8d07-4e03-aba7-eebd28ed086e/Leonardo_Phoenix_A_minimalist_composition_featuring_a_sleek_mo_1.jpg",
  productPrice: "Price"
  
};
const type: ElementsType = "Product";
export const ProductUIElement: UIElement = {
  type: "Product",
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
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
  extraAttributes: typeof extraAttributes;
};

function CanvasComponent({
  elementInstance,
}: {
  elementInstance: UIElementInstance;
}) {
  const element = elementInstance as CustomeInstance;
  return (
    <div className={`flex flex-col gap-2 w-full`}>
       <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/3">
            <img
              src={element?.extraAttributes?.productImage}
              alt={"name"}
              className="w-full h-48 sm:h-full object-cover"
            />
          </div>
          <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{element?.extraAttributes?.productName}</h2>
              <p className="text-muted-foreground mb-4">{element?.extraAttributes?.productDescription}</p>
            </div>
            <div className="text-xl font-semibold">{element?.extraAttributes?.productPrice}</div>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}
