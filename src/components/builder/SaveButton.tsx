import { Loader2Icon, Save } from "lucide-react";
import { Button } from "../ui/button";
import useBuilder from "@/hooks/useBuilder";
import { createContentEntry, UIJson } from "@/services/createEntry";
import { useState } from "react";

function SaveButton() {
  const { elements, generatedJson, selectedContentType } = useBuilder();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSaveClick = async () => {
    setIsLoading(true);
   try {
     const response = await createContentEntry(
       selectedContentType,
       generatedJson as UIJson
     );
     if (response.status === 201) {
       alert("Entry saved successfully");
     } 
   } catch (error) {
    alert("Failed to save entry");
   } finally {
     setIsLoading(false);
   }
    
    
   
  };
  return (
    <Button
      variant={"outline"}
      className="gap-2 bg-white text-indigo-500"
      disabled={!selectedContentType || elements.length === 0}
      onClick={onSaveClick}
    >
      {isLoading ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <Save className="h-4 w-4" /> Save
        </>
      )}
    </Button>
  );
}

export default SaveButton;
