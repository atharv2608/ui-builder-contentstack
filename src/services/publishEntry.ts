//This code publishes the entry to the developement environment

import axios from "axios";
import { toast } from "react-toastify";

interface PublishEntryResponse {
    notice: string;
}

export const publishEntry = async(uid: string): Promise<number> => {
    const url = ` https://eu-api.contentstack.com/v3/content_types/visuals/entries/${uid}/publish`

    try {
        const response = await axios.post<PublishEntryResponse>(
            url,
            {
                "entry": {
                    "environments": ["development"]
                }
            },
            {
                headers: {
                  authorization: import.meta.env.VITE_MANAGEMENT_TOKEN as string,
                  api_key: import.meta.env.VITE_CONTENTSTACK_API_KEY as string,
                  "Content-Type": "application/json",
                },
            }
        )
        return response.status;
    } catch (error) {
        toast.error("Error publishing entry");
        console.error("Error publishing entry:", error);
        throw error;
    }

}