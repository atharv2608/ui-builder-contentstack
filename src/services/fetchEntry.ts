import axios from "axios";

export type ContentTypeNames = "home_page" | "product" | "about_us" | "blog_entry" | "visuals";

export type HomePageEntry = {
    uid: string;
    heading: string;
    hero_image: {
        title: string,
        href:   string,
    };
    highlights: string;
    overview: string;
    sub_heading: string;
    title: string;
    [key: string]: unknown;
};

export type ProductEntry = {
    uid: string;
    title: string;
    product_name: string;
    product_description: string;
    product_price: string;
    product_image: string | null;
};

export type Entry = HomePageEntry | ProductEntry;

type EntryResponse = {
    entries: Entry[];
};

export const fetchEntry = async (contentType: ContentTypeNames): Promise<EntryResponse | undefined> => {
    try {
        const response = await axios.get<EntryResponse>(
            `https://eu-cdn.contentstack.com/v3/content_types/${contentType}/entries`,  
            {
                headers: {
                    api_key: import.meta.env.VITE_CONTENTSTACK_API_KEY as string,
                    access_token: import.meta.env.VITE_CONTENTSTACK_DELIVERY_TOKEN as string,
                },
            }
        );
      
        return response.data;
    } catch (error) {
        console.error("Error while fetching the entries: ", error);
        return undefined;
    }
};
