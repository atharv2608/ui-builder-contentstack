import { useDrag } from "react-dnd";

type Block = {
  id: number;
  icon: React.ElementType;
  label: string;
};

interface BlockProps {
  block: Block;
}

function Block({ block }: BlockProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "component",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag}
      className={`flex flex-col items-center justify-center p-4  rounded-lg  transition-colors shadow-sm hover:cursor-move ${
        isDragging ? " bg-indigo-600" : "bg-white"
      } `}
    >
      <block.icon
        className={`w-8 h-8 mb-2 ${
          isDragging ? " text-white" : "text-indigo-600"
        }`}
      />
      <span
        className={`text-sm font-medium text-center  ${
          isDragging ? " text-white" : "text-gray-900"
        }`}
      >
        {block.label}
      </span>
    </div>
  );
}

export default Block;
