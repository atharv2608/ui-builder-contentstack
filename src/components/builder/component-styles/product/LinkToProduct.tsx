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
import { useEffect, useState } from "react";
import { UIElementInstance } from "../../UIElements";

function LinkToProduct({
  selectedCanvasComponent,
}: {
  selectedCanvasComponent: UIElementInstance;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const { elements, setElements } = useBuilder();

  const selectedElement = elements.find(
    (element) => element.id === selectedCanvasComponent.id
  ); 
  async function getProducts() {
    try {
      const response = await fetchProducts();
      setProducts(response || []); // In case the response is undefined, set it to an empty array
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  // Fetch products when the component mounts
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Select onValueChange={(value)=>{
        const product = products.find(product => product.product_name === value);
        if (selectedElement && selectedElement.extraAttributes && product) {
          const newExtraAttributes = {
            ...selectedElement.extraAttributes,
            productName: product.product_name,
            productDescription: product.product_description,
            productImage: product.product_image.href,
            productPrice: product.product_price
          };
          const newElement = {
            ...selectedElement,
            extraAttributes: newExtraAttributes,
          };
          const newElements = elements.map((element) =>
            element.id === selectedCanvasComponent.id ? newElement : element
          );
          setElements(newElements);
        }
      }}>
        <SelectTrigger className="w-[180px]">
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
