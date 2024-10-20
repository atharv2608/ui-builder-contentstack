import { Button } from "@/components/ui/button";
import { CircleX, Code, Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useBuilder from "@/hooks/useBuilder"; // Adjust the import path as necessary
import { useCallback, useState } from "react";
import { FileJson } from "lucide-react";
import { toast } from "react-toastify";// Import your GenerateCodeDialog component
import GenerateCode from "./GenerateCode";
import { CodeBlock, dracula } from "react-code-blocks";


function JSONDialog() {
  const { generatedJson } = useBuilder();
  
  // State to manage JSON dialog open/close
  const [open, setOpen] = useState(false);
  const [codeDialogOpen, setCodeDialogOpen] = useState(false); // State for code dialog

  const onCopyClick = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(generatedJson, null, 2));
    toast.success("JSON copied to clipboard!");
  }, [generatedJson]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}> {/* Manage open state */}
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-white text-indigo-500" onClick={() => setOpen(true)}>
            <FileJson className="h-4 w-4 mr-2" /> JSON Preview
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px] bg-white text-black">
          <DialogHeader>
            <DialogTitle>JSON Preview</DialogTitle>
            <DialogDescription>
              This is the generated JSON structure for your UI. 
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto max-h-96">
          <CodeBlock
            text={JSON.stringify(generatedJson, null, 2)}
            language={"json"}
            showLineNumbers={true}
            theme={dracula}
          />  
          </div>
          <DialogFooter>
            <Button className="bg-indigo-500 text-white hover:bg-indigo-500 hover:text-white" onClick={onCopyClick}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button className="bg-indigo-500 text-white hover:bg-indigo-500 hover:text-white" onClick={() =>{
              setOpen(false);
              setCodeDialogOpen(true); 
            }}>
              <Code className="h-4 w-4 mr-2" />
              Generate Code
            </Button>
            <Button className="bg-red-500 text-white hover:bg-red-500 hover:text-white" variant="outline" onClick={() => setOpen(false)}> {/* Close dialog on click */}
              <CircleX className="h-4 w-4 mr-2" />
              Close
            </Button>
            
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Generate Code Dialog */}
      <GenerateCode open={codeDialogOpen} setOpen={setCodeDialogOpen} />
    </>
  );
}

export default JSONDialog;
