import { Ban, SquareUser } from "lucide-react";
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeam } from "@/redux/slices/teamSlice";
import { Team } from "@/types";
let styles = {
  type: "teamGrid",
  layout: {
    gridTemplateColumns: {
      default: "2fr",
      cols: "2"
    },
    gap: "8px",
    padding: "16px",
    alignItems: "center",
    justifyItems: "center",
  },
};

let content = {
  team_members: [] as Team[],
};
const type: ElementsType = "TeamGrid";
export const TeamGridUIElement: UIElement = {
  type: "TeamGrid",
  construct: (id: string) => ({
    id,
    type,
    styles,
    elementCategory: "grid",
    content,
  }),
  buttonElement: {
    icon: SquareUser,
    label: "Team Grid",
  },
  canvasComponent: CanvasComponent,
  UIComponent: () => <div>UI Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};

type CustomeInstance = UIElementInstance & {
  styles: typeof styles;
  content: typeof content;
};

function CanvasComponent({
  elementInstance,
}: {
  elementInstance: UIElementInstance;
}) {
  const element = elementInstance as CustomeInstance;

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  const {team, isLoading, error} = useSelector((state: RootState) => state.team);
  if(element.content.team_members.length === 0){
    if(team){
      element.content.team_members = team || [];
    }
  }
  if (error) {
    return (
      <div className={`flex flex-col gap-2 w-full items-center justify-center`}>
        <div className="flex w-full items-center justify-center p-2">
          <h1 className="text-3xl text-center text-red-500 font-bold">
            Error Loading Team Members
          </h1>
          <Ban className="text-red-500 h-8 w-8 animate-spin ml-4" />
        </div>
      </div>
    );
  }



  let cols = element?.styles?.layout.gridTemplateColumns.cols 

  return (
    <div className={`flex flex-col gap-2 w-full items-center justify-center`}>
      <span className="absolute bottom-2 text-sm right-5 opacity-40">
        Component ID: {element.id}
      </span>

     {isLoading ? (<div className="flex w-full items-center justify-center p-2">
          <h1 className="text-3xl text-center text-indigo-500 font-bold">
            Loading Team
          </h1>
          <SquareUser className="animate-spin text-indigo-500 h-8 w-8 ml-4" />
        </div>): (
           <div
           className={`grid gap-8 mb-6 lg:mb-16 ${cols == "1" ? "md:grid-cols-1" : cols == "2" ? "md:grid-cols-2" : "md:grid-cols-3" }`}
         >
           {team.map(member => (
             <div className="items-center bg-gray-50 rounded-lg shadow sm:flex" key={member._metadata.uid}>
             <div>
               <img
                 className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                 src={member.image_url.href}
                 alt={member.image_url.title}
               />
             </div>
             <div className="p-5">
               <h3 className="text-xl font-bold tracking-tight text-gray-900 ">
                 <span >{member.member_name}</span>
               </h3>
               {/* <span className="text-gray-500 ">CEO & Web Developer</span> */}
               <p className="mt-3 mb-4 font-light text-gray-500 ">
                 {member.member_description}
               </p>
             </div>
           </div>
           ))}
           
         </div>
        )}
    </div>
  );
}

export function TeamGridDragOverlay() {
  return (
    <div className="w-full h-[120px] bg-gray-400 opacity-80 rounded-md shadow-md flex justify-between p-2 items-center">
      <h1 className="text-3xl font-bold text-black text-center w-full">
        Team Grid
      </h1>
    </div>
  );
}