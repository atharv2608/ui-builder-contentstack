import Layout from "./Layout";
import Canvas from "./Canvas";
import DragOverlayWrapper from "./DragOverlayWrapper";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { ResetIcon } from "@radix-ui/react-icons";
import { DndContext } from "@dnd-kit/core";
function Page() {
  return (
    <Layout>
      <DndContext>
        <main className="flex flex-col w-full">
          <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
            <h2 className="truncate font-medium">
              <span className="text-muted-foreground mr-2">
                UI Builder Contentstack
              </span>
            </h2>
            <div className="flex items-center gap-2">
              <Button variant={"outline"} className="gap-2">
                <Save className="h-4 w-4" /> Save
              </Button>
              <Button variant={"outline"} className="gap-2">
                <ResetIcon className="h-4 w-4" /> Reset
              </Button>
            </div>
          </nav>
          <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto min-h-screen bg-accent">
              <Canvas />
          </div>
        </main>
        <DragOverlayWrapper />
      </DndContext>
    </Layout>
  );
}

export default Page;
