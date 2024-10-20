import Layout from "./Layout";
import Canvas from "./Canvas";
import DragOverlayWrapper from "./DragOverlayWrapper";
import "./../../App.css"
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import JSONDialog from "./JSONDialog";
import ResetCanvas from "./ResetCanvas";
import SaveButton from "./SaveButton";
import { useEffect, useState } from "react";
import { SmallScreenWarning } from "../SmallScreenWarning";
function Page() {
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

  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout>
      <SmallScreenWarning isHeightSmall={screenHeight < 400 || screenWidth < 800}/>
        <DndContext sensors={sensors}>
          <main className="flex flex-col w-full " >
            <nav className="flex justify-between border-b-2 p-4 gap-3 items-center bg-indigo-500">
              <h2 className="truncate font-bold text-2xl text-white">
                <span className=" mr-2">UI Builder Contentstack</span>
              </h2>
              <div className="flex items-center gap-2">
                <SaveButton />
                <ResetCanvas />

                <JSONDialog />
              </div>
            </nav>
            <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto min-h-screen bg-accent">
              <div className="w-[270px] overflow-y-auto h-screen">
                <LeftSidebar />
              </div>
              <div className="flex-grow overflow-y-auto h-screen">
                <Canvas />
              </div>
              <div className="w-64 overflow-y-auto h-screen">
                <RightSidebar />
              </div>
            </div>
          </main>
          <DragOverlayWrapper />
        </DndContext>
    </Layout>
  );
}

export default Page;
