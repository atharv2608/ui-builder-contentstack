import { Grid2X2Icon } from "lucide-react";
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
import { useCallback, useEffect, useState } from "react";
import { fetchEntry } from "@/services/fetchEntry";
import { Product } from "@/types";
let styles = {
  type: "productsGrid",
  layout: {
    gridTemplateColumns: {
      default: "2fr",
      cols: "2",
    },
    gap: "8px",
    padding: "16px",
    alignItems: "center",
    justifyItems: "center",
  },
};

let content = {
  products: [] as Product[],
};
const type: ElementsType = "ProductsGrid";
export const ProductsGridUIElement: UIElement = {
  type: "ProductsGrid",
  construct: (id: string) => ({
    id,
    type,
    styles,
    elementCategory: "grid",
    content,
  }),
  buttonElement: {
    icon: Grid2X2Icon,
    label: "Product Grid",
  },
  canvasComponent: CanvasComponent,
  UIComponent: () => <div>UI Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};

type CustomeInstance = UIElementInstance & {
  styles: typeof styles;
  content: typeof content;
};

function CanvasComponent({
  elementInstance,
}: {
  elementInstance: UIElementInstance;
}) {
  const element = elementInstance as CustomeInstance;

  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    const response = await fetchEntry("product");

    const productsData = response?.entries[0].products as Product[];

    // Set the fetched product data to the state
    setProducts(productsData as Product[]);

    // Directly update the elementInstance content with the fetched product data
    element.content.products = productsData;
  }, []);
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className={`flex flex-col gap-2 w-full items-center justify-center`}>
      <span className="absolute bottom-2 text-sm right-5 opacity-40">
        Component ID: {element.id}
      </span>

      <div
        className={`grid gap-8 mb-6 lg:mb-16 md:grid-cols-${element?.styles?.layout.gridTemplateColumns.cols}`}
      >
        {products.map((product) => (
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg shadow-indigo-200">
            <a href="#">
              <img
                className="p-8 rounded-t-lg"
                src={product.product_image.href}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                  {product.product_name}
                </h5>
              </a>
              <div className="flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">
                  5.0
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  Rs. {product.product_price}
                </span>
                {/* <a
                  href="#"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Add to cart
                </a> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductsGridDragOverlay() {
  return (
    <div className="w-full h-[120px] bg-gray-400 opacity-80 rounded-md shadow-md flex justify-between p-2 items-center">
      <h1 className="text-3xl font-bold text-black text-center w-full">
        Products Grid
      </h1>
    </div>
  );
}
