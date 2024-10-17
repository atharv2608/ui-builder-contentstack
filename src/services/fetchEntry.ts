import axios from "axios";
import { AboutUsEntry, BlogEntry, HomePageEntry, ProductEntry } from "@/types";

export type ContentTypeNames = "home_page" | "product" | "about_us" | "blogs";


export type EntryMap = {
    home_page: HomePageEntry;
    product: ProductEntry;
    about_us: AboutUsEntry; // You can add specific types for other content types
    blogs: BlogEntry;
};


export type EntryResponse<T> = {
    entries: T[];
};

export const fetchEntry = async <T extends ContentTypeNames>(
    contentType: T
): Promise<EntryResponse<EntryMap[T]> | undefined> => {
    try {
        const response = await axios.get<EntryResponse<EntryMap[T]>>(
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
