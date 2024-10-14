import axios, { AxiosResponse } from "axios";
import { UIJson } from "./createEntry";



type VisualEntry = {
    uid: string;
    title: string;
    ui_json: UIJson;
    publish_details: {
        environment: string;
      }
}
export type VisualsEntryResponse = {
    "entries": VisualEntry[]
}


export const fetchVisualEntries = async (): Promise<AxiosResponse<VisualsEntryResponse>> => {

    const url = "https://eu-cdn.contentstack.com/v3/content_types/visuals/entries?locale=en-us&include_fallback=true&include_branch=false";

    try {
        const response = await axios.get<VisualsEntryResponse>(
            url,
            {
                headers: {
                    api_key: import.meta.env.VITE_CONTENTSTACK_API_KEY as string,
                    access_token: import.meta.env.VITE_CONTENTSTACK_DELIVERY_TOKEN as string,
                }
            }
        )


        return response;
    } catch (error) {
        console.error("Error while fetching visuals: ", error);
        throw  error;
    }

}