import axios from "axios";


export interface ContentType {
  title: string;  
  uid: string;   
  [key: string]: unknown; 
}


interface FetchContentTypesResponse {
  content_types: ContentType[];               
  [key: string]: unknown;        
}


export const fetchContentType = async (): Promise<FetchContentTypesResponse | undefined> => {
  try {
    const response = await axios.get<FetchContentTypesResponse>(
      "https://eu-cdn.contentstack.com/v3/content_types",
      {
        headers: {
          api_key: import.meta.env.VITE_CONTENTSTACK_API_KEY as string,
          access_token: import.meta.env.VITE_CONTENTSTACK_DELIVERY_TOKEN as string,
        },
      }
    );

    
    return response.data;

  } catch (error) {
    console.error("Error while fetching all the content types: ", error);
    return undefined;
  }
};
