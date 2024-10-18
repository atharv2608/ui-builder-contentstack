import { Ban, LayoutGrid, Newspaper } from "lucide-react";
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "@/redux/slices/blogSlice";
import { Blog } from "@/types";
import useBuilder from "@/hooks/useBuilder";
let styles = {
  type: "blogsGrid",
  layout: {
    gridTemplateColumns: {
      default: "2fr",
      cols: "2",
    },
    gap: "8px",
    padding: "16px",
    alignItems: "center",
    justifyItems: "center",
  },
};

let content = {
  blogs: [] as Blog[],
};
const type: ElementsType = "BlogsGrid";
export const BlogsGridUIElement: UIElement = {
  type: "BlogsGrid",
  construct: (id: string) => ({
    id,
    type,
    styles,
    elementCategory: "grid",
    content,
  }),
  buttonElement: {
    icon: LayoutGrid,
    label: "Blog Grid",
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

  const { blogsInGrid } = useBuilder();

  if (blogsInGrid) element.content.blogs = blogsInGrid;
  let cols = element?.styles?.layout.gridTemplateColumns.cols;
  return (
    <div className={`flex flex-col gap-2 w-full items-center justify-center`}>
      <span className="absolute bottom-2 text-sm right-5 opacity-40">
        Component ID: {element.id}
      </span>
      {blogsInGrid.length === 0 ? (
        <div className="flex w-full items-center justify-center p-2">
          <h1 className="text-3xl text-center text-indigo-500 font-bold">
            Please select blogs
          </h1>
        </div>
      ) : (
        <div
          className={`grid gap-8 mb-6 lg:mb-16 ${
            cols == "1"
              ? "md:grid-cols-1"
              : cols == "2"
              ? "md:grid-cols-2"
              : "md:grid-cols-3"
          }`}
        >
          {blogsInGrid.map((blog) => (
            <div
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow flex flex-col"
              key={blog._metadata.uid}
            >
              <a href="#">
                <img
                  className="rounded-t-lg"
                  src={blog.cover_image.href}
                  alt=""
                />
              </a>
              <div className="p-5 flex flex-col flex-grow">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {blog.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700">
                  Author: {blog.author}
                </p>
                <a
                  href="#"
                  className="mt-auto  items-center px-3 py-2 text-sm font-medium  text-white bg-indigo-500 text-center rounded-lg flex justify-center"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function BlogsGridDragOverlay() {
  return (
    <div className="w-full h-[120px] bg-gray-400 opacity-80 rounded-md shadow-md flex justify-between p-2 items-center">
      <h1 className="text-3xl font-bold text-black text-center w-full">
        Blogs Grid
      </h1>
    </div>
  );
}
