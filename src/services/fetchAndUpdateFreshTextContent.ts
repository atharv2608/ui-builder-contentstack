
import { UIElementInstance } from "@/components/builder/UIElements";
import { Dispatch, SetStateAction } from "react";
import { ContentTypeNames, fetchEntry } from "./fetchEntry";

export const fetchFreshEntries = async (element: UIElementInstance, elements: UIElementInstance[], setElements: Dispatch<SetStateAction<UIElementInstance[]>>) => {
    const response = await fetchEntry(
      element.linkedContentTypeUID as ContentTypeNames
    );
    if (response) {
      const entry = response.entries[0];
      if (element.linkedSchemaID && element.linkedSchemaID in entry) {
        const updatedText =
          entry[element.linkedSchemaID as keyof typeof entry];

        const newContent = {
          ...element.content,
          text: updatedText,
        };

        element.content = newContent;
        const curretElement = elements.find((e) => e.id === element.id);
        const newElement = {
          ...curretElement,
          content: newContent,
        };
        const newElements = elements.map((e) =>
          e.id === element.id ? newElement : e
        );
        setElements(newElements as UIElementInstance[]);
      } else {
        console.error("Schema ID does not exist on the entry");
      }
    }
  };