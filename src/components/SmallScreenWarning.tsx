import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

export function SmallScreenWarning({
  isHeightSmall,
}: {
  isHeightSmall: boolean;
}) {
  const [open, setOpen] = useState(isHeightSmall);

  // Update the open state whenever isHeightSmall changes
  useEffect(() => {
    setOpen(isHeightSmall);
  }, [isHeightSmall]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-white text-black">
        <DialogHeader>
          <DialogTitle>Please open builder in large screen</DialogTitle>
          <DialogDescription>
            For a better experience, open the UI JSON builder in a new tab.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit" className="text-white bg-indigo-500">
            <a href={window.location.href} target="_blank">
              New Window
            </a>
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
