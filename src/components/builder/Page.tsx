import Layout from "./Layout";
import Canvas from "./Canvas";
import DragOverlayWrapper from "./DragOverlayWrapper";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { ResetIcon } from "@radix-ui/react-icons";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { UIElementInstance } from "./UIElements";
import { useState } from "react";
import BuilderContentProvider from "@/context/BuilderContext";
import BuilderContextProvider from "@/context/BuilderContext";
function Page() {
  const [elements, setElements] = useState<UIElementInstance[]>([]);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, //in px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);
  return (
    <Layout>
      <BuilderContextProvider>
        <DndContext sensors={sensors}>
          <main className="flex flex-col w-full">
            <nav className="flex justify-between border-b-2 p-4 gap-3 items-center bg-indigo-500">
              <h2 className="truncate font-bold text-2xl text-white">
                <span className=" mr-2">UI Builder Contentstack</span>
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  variant={"outline"}
                  className="gap-2 bg-white text-indigo-500"
                >
                  <Save className="h-4 w-4" /> Save
                </Button>
                <Button
                  variant={"outline"}
                  className="gap-2 bg-white text-indigo-500"
                >
                  <ResetIcon className="h-4 w-4" /> Reset
                </Button>
              </div>
            </nav>
            <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto min-h-screen bg-accent">
              <Canvas elements={elements} setElements={setElements} />
            </div>
          </main>
          <DragOverlayWrapper elements={elements} />
        </DndContext>
      </BuilderContextProvider>
    </Layout>
  );
}

export default Page;
