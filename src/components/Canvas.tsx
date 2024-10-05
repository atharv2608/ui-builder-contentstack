import { useState } from "react";
import { useDrop } from "react-dnd";

type ItemType = {
  id: number
}

type canvasComponent = {
  id: number,
  name: string, 
  type: string
}
function Canvas() {
  const[{isOver}, drop] = useDrop(()=>({
    accept: "component",
    drop: (item: ItemType) => addComponentToCanvas(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))
  const components: canvasComponent[] = [
    { id: 1, name: "Heading", type: "h1" },
    { id: 2, name: "Subheading", type: "h2" },
    { id: 5, name: "Image", type: "img" },
  ];

  
  const [componentsOnCanvas, setComponentsOnCanvas] = useState<canvasComponent[]>([])
  
  
  const addComponentToCanvas = (id: number)=>{
    const component = components.find(component => component.id === id);
    setComponentsOnCanvas((prev)=> [...prev, component as canvasComponent])
  }

  return (
    <div className="min-h-screen width-[50%] bg-gray-200 p-5 space-y-4" ref={drop}>
      {componentsOnCanvas.map((component) => (
        <div key={component.id} className="border-2 border-gray-400 p-2">
          {component.type === "h1" && (
            <h1 className="text-4xl">This is heading tag</h1>
          )}
          {component.type === "h2" && (
            <h2 className="text-2xl">This is sub heading tag</h2>
          )}
          {component.type === "img" && (
            <img
              src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
              alt="Placeholder"
              className="w-full h-[400px]"
              // width="1000px" height={"500px"}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Canvas;
