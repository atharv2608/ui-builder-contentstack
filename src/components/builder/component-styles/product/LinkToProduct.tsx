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
import { fetchProducts, Product } from "@/services/fetchProducts";
import { useEffect, useState, useCallback } from "react";
import { UIElementInstance } from "../../UIElements";
import { Label } from "@/components/ui/label";
import { SourceTextModule } from "vm";

function LinkToProduct({
  selectedCanvasComponent,
}: {
  selectedCanvasComponent: UIElementInstance;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const { elements, setElements } = useBuilder();
  const [selectedProductName, setSelectedProductName] = useState<string | undefined>(undefined); 

  const selectedElement = elements.find(
    (element) => element.id === selectedCanvasComponent.id
  );

  // Fetch products from the API
  const getProducts = async () => {
    try {
      const response = await fetchProducts();
      setProducts(response || []); 
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    getProducts();
  }, []);

  // // Reset selectedProductName when selectedCanvasComponent changes
  // useEffect(() => {
  //   if (selectedElement && selectedElement.styles) {
  //     // If the selected element has a product linked, show that product
  //     setSelectedProductName(selectedElement?.styles?.productName || undefined);
  //   } else {
  //     // Otherwise, reset to show the placeholder
  //     setSelectedProductName(undefined);
  //   }
  // }, [selectedCanvasComponent]);

  useEffect(()=>{
    if (selectedCanvasComponent && selectedCanvasComponent.styles) {
      if(selectedCanvasComponent.styles.productName) {
        setSelectedProductName(selectedCanvasComponent.styles.productName);
      } else{
        setSelectedProductName(undefined);
      }
    } 
  }, [selectedCanvasComponent])

  // // Handle product selection
  const handleProductChange = useCallback((value: string) => {
    const product = products.find(product => product.product_name === value);
    setSelectedProductName(value); // Update local state

    if (selectedElement && selectedElement.styles && product) {
      const newStyles = {
        ...selectedElement.styles,
        productName: product.product_name,
        productDescription: product.product_description,
        productImage: product.product_image.href,
        productPrice: product.product_price,
      };
      const newElement = {
        ...selectedElement,
        styles: newStyles,
      };
      const newElements = elements.map((element) =>
        element.id === selectedCanvasComponent.id ? newElement : element
      );
      setElements(newElements);
    }
  }, [elements, selectedCanvasComponent.id, selectedElement, products, setElements]);

  return (
    <div>
       <Label
              htmlFor="product-select"
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Select a product from the list
            </Label>
            <Select onValueChange={handleProductChange} value={selectedProductName}>

        <SelectTrigger className="w-[180px] border-black">
          <SelectValue placeholder="Select a product" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Products</SelectLabel>
            {products.map((product) => (
              <SelectItem
                key={product.product_name}
                value={product.product_name}
              >
                {product.product_name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default LinkToProduct;
