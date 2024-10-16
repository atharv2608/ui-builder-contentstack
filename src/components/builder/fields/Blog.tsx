import { CalendarIcon, Newspaper, UserIcon } from "lucide-react";
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
let styles = {
  type: "blog",
};
const type: ElementsType = "Blog";
export const BlogUIElement: UIElement = {
  type: "Blog",
  construct: (id: string) => ({
    id,
    type,
    styles,
  }),
  buttonElement: {
    icon: Newspaper,
    label: "Blog",
  },
  canvasComponent: CanvasComponent,
  UIComponent: () => <div>UI Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};

type CustomeInstance = UIElementInstance & {
  styles: typeof styles;
};

function CanvasComponent({
  elementInstance,
}: {
  elementInstance: UIElementInstance;
}) {
  const element = elementInstance as CustomeInstance;
  return (
    <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-md overflow-hidden">
      <span className="absolute bottom-0 text-sm right-5 opacity-40">
        Component ID: {element.id}
      </span>
      <div>
        <div className="flex items-center justify-center">
          <img
            className=" w-[60%] object-cover"
            src={
              element?.content?.cover_image ||
              "https://eu-images.contentstack.com/v3/assets/blta0fb2d378b73e901/blt6ddf1e7a6b41751b/670fad1a273b107659129d13/default-cover-image.jpg"
            }
            alt={element?.content?.cover_image?.title || "title"}
          />
        </div>
        <div className="p-8">
          <h2 className="block mt-1 text-2xl leading-tight font-bold text-foreground">
            {element?.content?.title || "Blog Title"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {element?.content?.blog_content ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora maiores possimus repudiandae asperiores eaque esse, facere officiis ratione suscipit iste doloribus sapiente laudantium facilis recusandae animi totam quas veniam itaque"}
            .
          </p>
          <div className="mt-4 flex items-center">
            <UserIcon className="h-5 w-5 text-muted-foreground mr-2" />
            <span className="text-sm text-muted-foreground">
              {element?.content?.author || "author"}
            </span>
          </div>
          <div className="mt-2 flex items-center">
            <CalendarIcon className="h-5 w-5 text-muted-foreground mr-2" />
            <time
              className="text-sm text-muted-foreground"
              dateTime={"publishDate"}
            >
              {new Date("2024-10-15T09:57:15.000Z").toLocaleDateString(
                "en-GB",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}


export function BlogDragOverlay({elementInstance} : {elementInstance:  UIElementInstance}) {
  const element = elementInstance as CustomeInstance;
    return (
      
        <div className="w-full h-[120px] bg-gray-400 opacity-80 rounded-md shadow-md flex justify-between p-2">
      
  
          <img src={"https://eu-images.contentstack.com/v3/assets/blta0fb2d378b73e901/blt6ddf1e7a6b41751b/670fad1a273b107659129d13/default-cover-image.jpg"} alt={element?.styles?.altText}  className="h-[100px]"/> 

          <h2>Leave to drop</h2>
        </div>
      
    );
  }
  