import axios, { AxiosResponse } from "axios";

export interface UIJson {
  page: string;
  components: Array<{
    id: string;
    type: string;
    attributes: Record<string, any>;
  }>;
}

interface EntryResponse {
  notice: string;
  entry: {
    title: string;
    ui_json: UIJson;
    locale: string;
    uid: string;
    created_by: string;
    updated_by: string;
    created_at: string;
    updated_at: string;
    _version: number;
    tags: string[];
    _in_progress: boolean;
  };
}

export const createContentEntry = async (
  content_type: string,
  ui_json: UIJson
): Promise<AxiosResponse<EntryResponse>> => {
  const url = `https://eu-api.contentstack.com/v3/content_types/visuals/entries`;

  try {
    const response = await axios.post<EntryResponse>(
      url,
      {
        entry: {
          title: content_type,
          ui_json: ui_json,
        },
      },
      {
        headers: {
          authorization: import.meta.env.VITE_MANAGEMENT_TOKEN,
          api_key: import.meta.env.VITE_CONTENTSTACK_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    // Check for successful creation (201)
    return response;
  } catch (error) {
    console.error("Error creating entry:", error);
    throw error;
  }
};
