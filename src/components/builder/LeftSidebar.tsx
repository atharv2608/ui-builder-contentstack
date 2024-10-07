import SidebarButtonElement from "./SidebarButtonElement";
import { UIElements } from "./UIElements"
function LeftSidebar() {
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-white overflow-y-auto h-full">
        Elements
        <div className="flex flex-wrap gap-5 justify-center ">

        <SidebarButtonElement uiElement={UIElements.TextField}/>
        <SidebarButtonElement uiElement={UIElements.Heading}/>
        </div>
    </aside>
  )
}

export default LeftSidebar;