import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import useBuilder from "@/hooks/useBuilder";
  import { useEffect, useState, useCallback } from "react";
  import { UIElementInstance } from "../../UIElements";
  import { Label } from "@/components/ui/label";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "@/redux/slices/blogSlice";
  
  function LinkToBlog({
    selectedCanvasComponent,
  }: {
    selectedCanvasComponent: UIElementInstance;
  }) {
    const { elements, setElements } = useBuilder();
    const [selectedBlogTitle, setSelectedBlogTitle] = useState<string>(""); 
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchBlogs());
    }, [dispatch]);
    const { blogs } = useSelector(
      (state: RootState) => state.blogs
    );
  

    useEffect(()=>{
      if (selectedCanvasComponent && selectedCanvasComponent.content) {
        if(selectedCanvasComponent.content.title) {
          setSelectedBlogTitle(selectedCanvasComponent.content.title);
        }
      } else{
        setSelectedBlogTitle("");
      }
    }, [selectedCanvasComponent])
  
    // // Handle blog selection
    const handleBlogChange = useCallback((value: string) => {
      const blog = blogs.find(blog => blog.title === value);
      setSelectedBlogTitle(value); // Update local state
      if (selectedCanvasComponent  && blog) {
        const newContent = {
          ...selectedCanvasComponent?.content,
          title: blog.title,
          cover_image: blog.cover_image.href,
          blog_content: blog.blog_content,
          author: blog.author,
          published_date: blog.published_date
        };
        const newElement = {
          ...selectedCanvasComponent,
          content: newContent,
        };
        const newElements = elements.map((element) =>
          element.id === selectedCanvasComponent.id ? newElement : element
        );

        setElements(newElements as UIElementInstance[]);
      }
    }, [elements, selectedCanvasComponent, blogs, setElements]);
  
    return (
      <div>
         <Label
                htmlFor="blog-select"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Select a blog from the list
              </Label>
              <Select onValueChange={handleBlogChange} value={selectedBlogTitle}>
  
          <SelectTrigger className="w-[180px] border-black">
            <SelectValue placeholder="Select a blog" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Blogs</SelectLabel>
              {blogs.map((blog) => (
                <SelectItem
                  key={blog._metadata.uid}
                  value={blog.title}
                >
                  {blog.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  }
  
  export default LinkToBlog;
  