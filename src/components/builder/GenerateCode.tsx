import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useBuilder from "@/hooks/useBuilder"; // Adjust the import path as necessary
import { SetStateAction, useCallback, Dispatch, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function GenerateCode({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) {
  const { generatedJson } = useBuilder(); // This should have your UI JSON
  const [generatedCode, setGeneratedCode] = useState<string>("");

  useEffect(() => {
    // Reset the generated code every time the dialog is opened
    if (open) {
      setGeneratedCode(""); // Clear previous code when dialog opens

      const fetchGeneratedCode = async () => {
        if (generatedJson) {
          try {
            // Stringify the generatedJson safely and pass it to the AI prompt
            const jsonString = JSON.stringify(generatedJson, null, 2);

            const prompt = `Treat the given JSON as a server-driven UI JSON and based on the component content in it, generate a beautiful page in React. Make a component render function to render different components Generate only the React code ,No explanations, just pure React component code: \n\n ${jsonString}`;
            
            // Call the AI model with the prompt
            const result = await model.generateContentStream(prompt);

            let codeStream = "";
            for await (const chunk of result.stream) {
              const chunkText = await chunk.text(); // Await text() to resolve the promise
              codeStream += chunkText;
              setGeneratedCode((prev) => prev + chunkText); // Append each chunk to the state
            }
          } catch (error) {
            console.error("Error fetching generated code: ", error);
            toast.error("Failed to generate code. Please try again.");
          }
        }
      };

      fetchGeneratedCode(); // Trigger the AI code generation process
    }
  }, [open, generatedJson]);

  const onCopyClick = useCallback(() => {
    navigator.clipboard.writeText(generatedCode);
    toast.success("Code copied to clipboard!");
  }, [generatedCode]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[900px] bg-white text-black">
        <DialogHeader>
          <DialogTitle>AI Generated Code</DialogTitle>
          <DialogDescription>
            This is the AI-generated React code for the JSON structure of your UI.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-96">
          <pre className="whitespace-pre-wrap break-words p-4 bg-gray-100 rounded">
            {generatedCode || "// Waiting for AI to generate code..."}
          </pre>
        </div>
        <DialogFooter>
          <Button onClick={onCopyClick}>
            <Copy className="mr-2" /> Copy Code
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default GenerateCode;
