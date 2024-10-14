import axios from "axios";

export type Product = {
    product_name: string;
    product_description: string;
    product_price: string;
    product_image: {
        title: string;
        href: string;
    };
};

export const fetchProducts = async (): Promise<Product[] | undefined> => {
    try {
        const response = await axios.get<{
            entries: Array<{
                products: Product[];
            }>;
        }>(`https://eu-cdn.contentstack.com/v3/content_types/product/entries`, {
            headers: {
                api_key: import.meta.env.VITE_CONTENTSTACK_API_KEY as string,
                access_token: import.meta.env.VITE_CONTENTSTACK_DELIVERY_TOKEN as string,
            },
        });

        // Assuming there is at least one entry, and 'products' is the array we need
        const products = response.data.entries.flatMap(entry => entry.products);
        return products;
    } catch (error) {
        console.error("Error while fetching the entries: ", error);
        return undefined;
    }
};
