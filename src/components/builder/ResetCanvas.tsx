import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {  useState } from "react";
import { ResetIcon } from "@radix-ui/react-icons";
import useBuilder from "@/hooks/useBuilder";
function ResetCanvas() {
  
  // State to manage dialog open/close
  const [open, setOpen] = useState(false);
  const {setElements, setSelectedComponent, setSelectedSchema} = useBuilder();

  const resetCanvas = ()=>{
    // Reset elements array to empty
    setElements([]);
    setSelectedComponent("");
    setSelectedSchema("");
    // Close dialog
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}> {/* Manage open state */}
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white text-indigo-500" onClick={() => setOpen(true) }> <ResetIcon className="h-4 w-4 mr-2" /> Reset</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-white text-black">
        <DialogHeader>
          <DialogTitle>Reset Canvas</DialogTitle>
          <DialogDescription>
            Are you sure you want to reset?
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter>
          <Button type="submit" variant="outline" className="text-white bg-red-500" onClick={resetCanvas}> {/* Close dialog on click */}
            Reset
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}> {/* Close dialog on click */}
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ResetCanvas;
