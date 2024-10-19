import axios from "axios";

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
        console.error("Error publishing entry:", error);
        throw error;
    }

}