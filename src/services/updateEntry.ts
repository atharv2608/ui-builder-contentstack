import axios, { AxiosResponse } from "axios";
import { EntryResponse, UIJson } from "./createEntry";
import { publishEntry } from "./publishEntry";

export const updateEntry = async (
    ui_json: UIJson,
    uid: string
  ): Promise<AxiosResponse<EntryResponse>> => {
    const url = `https://eu-api.contentstack.com/v3/content_types/visuals/entries/${uid}`;
  
    try {
      const response = await axios.put<EntryResponse>(
        url,
        {
          entry: {
            ui_json: ui_json,
          },
        },
        {
          headers: {
            authorization: import.meta.env.VITE_MANAGEMENT_TOKEN as string,
            api_key: import.meta.env.VITE_CONTENTSTACK_API_KEY as string,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Update status: ", response.data.entry.uid);
      if(response.status === 200){
        try {
          await publishEntry(response.data.entry.uid);
        } catch (error) {
          console.error("Error publishing entry: ", error);
        }
  
      }
      return response;
    } catch (error) {
      console.error("Error updating entry:", error);
      throw error;
    }
  };