import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
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
import {  useCallback, useState } from "react";
import { FileJson } from "lucide-react";
import { toast } from "react-toastify";
function JSONDialog() {
  const { generatedJson } = useBuilder();
  
  // State to manage dialog open/close
  const [open, setOpen] = useState(false);

  const onCopyClick = useCallback(() =>{
    navigator.clipboard.writeText(JSON.stringify(generatedJson, null, 2));
    toast.success("JSON copied to clipboard!");
  }, [generatedJson])
  return (
    <Dialog open={open} onOpenChange={setOpen}> {/* Manage open state */}
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white text-indigo-500" onClick={() => setOpen(true) }> <FileJson className="h-4 w-4 mr-2" /> JSON Preview</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] bg-white text-black">
        <DialogHeader>
          <DialogTitle>JSON Preview</DialogTitle>
          <DialogDescription>
            This is the generated JSON structure for your UI.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-96">
          <pre className="whitespace-pre-wrap break-words p-4 bg-gray-100 rounded">
            {JSON.stringify(generatedJson, null, 2)}
          </pre>
        </div>
        <DialogFooter>
          <Button  className="bg-indigo-500 text-white" onClick={onCopyClick}> 
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}> {/* Close dialog on click */}
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default JSONDialog;
