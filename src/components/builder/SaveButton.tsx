import { Loader2Icon, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import useBuilder from "@/hooks/useBuilder";
import { createContentEntry, UIJson } from "@/services/createEntry";
import { useState } from "react";
import { updateEntry } from "@/services/updateEntry";
import { toast } from "react-toastify";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

function SaveButton() {
  const {  generatedJson, selectedContentType } = useBuilder();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const visualEntries = useSelector(
    (state: RootState) => state.visuals.visuals
  );
  const onSaveClick = async () => {
    setIsLoading(true);
    if (visualEntries && selectedContentType) {
      const entry = visualEntries.find((e) => e.title === selectedContentType);

      if (entry) {
        try {
          const response = await updateEntry(
            generatedJson as UIJson,
            entry.uid
          );
          if (response.status === 200) {
            toast.success("Entry updated successfully");
            setOpen(false);
          }
        } catch (error) {
          toast.error("Error updating entry");
          console.error("Error updating entry", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          const response = await createContentEntry(
            selectedContentType,
            generatedJson as UIJson
          );
          if (response.status === 201) {
            toast.success("Entry created successfully");
            setOpen(false);
          }
        } catch (error) {
          toast.error("Error creating entry");
          console.error("Error creating entry", error);
        } finally {
          setIsLoading(false);
          setOpen(false);
        }
      }
    }
    setIsLoading(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {" "}
      {/* Manage open state */}
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="gap-2 bg-white text-indigo-500"
          disabled={!selectedContentType }
        >
          <Save className="h-4 w-4" /> Save
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white text-black">
        <DialogHeader>
          <DialogTitle>
            This action will save UI JSON to development environment
          </DialogTitle>
          <DialogDescription>Preview the JSON before saving</DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-96"></div>
        <DialogFooter>
          <Button
            variant={"outline"}
            className="gap-2 bg-white text-indigo-500"
            disabled={!selectedContentType || isLoading}
            onClick={onSaveClick}
          >
            {isLoading ? (
              <Loader2Icon className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Save className="h-4 w-4" /> Save
              </>
            )}{" "}
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {" "}
            {/* Close dialog on click */}
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SaveButton;
