import { Label } from "@/components/ui/label";
import { fetchBlogs } from "@/redux/slices/blogSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useBuilder from "@/hooks/useBuilder";
import { Blog } from "@/types";
import { toast } from "react-toastify";
import { Loader2Icon } from "lucide-react";

function SelectBogs() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const blogs = useSelector((state: RootState) => state.blogs.blogs);
  const isLoading = useSelector((state: RootState) => state.blogs.isLoading);
  const error = useSelector((state: RootState) => state.blogs.error);

  const { setBlogsInGrid , visualEntries} = useBuilder();
  useEffect(() => {
    if (error) {
      toast.error("Error fetching blogs");
    }
  }, [error]);
  const onCheckedChange = (checked: boolean, blog: Blog) =>{
    if(checked){
        setBlogsInGrid((prev) => {
            return [...prev, blog]
        })
    } else{
        setBlogsInGrid((prev)=> {
            return prev.filter(selectedBlog =>{
                return selectedBlog._metadata.uid !== blog._metadata.uid
            })
        } )
    }
  }
  return (
    <>
      <div className="space-y-4 w-full border border-black rounded-md p-4">
      <Label
              htmlFor="blogs-select"
              className="text-sm font-medium text-indigo-500 mb-2 block"
            >
              Select Blogs
            </Label>
        {isLoading ? <div className="flex items-center text-gray-400">
            Loading <Loader2Icon className="h-4 w-4 animate-spin ml-2" />
        </div>: (
            <>
            {blogs.map(blog => 
                <div className="flex items-center space-x-2" key={blog._metadata.uid}>
                <Checkbox id={blog._metadata.uid} onCheckedChange={(checked: boolean) => onCheckedChange(checked, blog)}/>
                <label
                  htmlFor={blog.title}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                  {blog.title}
                </label>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default SelectBogs;
