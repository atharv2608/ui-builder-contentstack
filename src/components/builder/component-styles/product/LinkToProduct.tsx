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
import { useEffect, useState, useCallback } from "react";
import { UIElementInstance } from "../../UIElements";
import { Label } from "@/components/ui/label";
import { Product } from "@/types";
import { fetchEntry } from "@/services/fetchEntry";

function LinkToProduct({
  selectedCanvasComponent,
}: {
  selectedCanvasComponent: UIElementInstance;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const { elements, setElements } = useBuilder();
  const [selectedProductName, setSelectedProductName] = useState<string | undefined>(undefined); 



  // Fetch products from the API
  const getProducts = async () => {
    try {
      const response = await fetchEntry("product");
      setProducts(response?.entries[0].products || []); 
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    getProducts();
  }, []);


  useEffect(()=>{
    if (selectedCanvasComponent && selectedCanvasComponent.content) {
      if(selectedCanvasComponent.content.productName) {
        setSelectedProductName(selectedCanvasComponent.content.productName);
      } else{
        setSelectedProductName(undefined);
      }
    } 
  }, [selectedCanvasComponent])

  // // Handle product selection
  const handleProductChange = useCallback((value: string) => {
    const product = products.find(product => product.product_name === value);
    setSelectedProductName(value); // Update local state

    if (selectedCanvasComponent && product) {
      const newContent = {
        ...selectedCanvasComponent.content,
        productName: product.product_name,
        productDescription: product.product_description,
        productImage: product.product_image.href,
        productPrice: product.product_price,
      };
      const newElement = {
        ...selectedCanvasComponent,
        content: newContent,
      };
      const newElements = elements.map((element) =>
        element.id === selectedCanvasComponent.id ? newElement : element
      );
      setElements(newElements as UIElementInstance[]);
    }
  }, [elements, selectedCanvasComponent, products, setElements]);

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
