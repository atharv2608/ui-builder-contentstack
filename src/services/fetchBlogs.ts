import axios from "axios";

export type Blog = {
    _metadata: {
        uid: string;
    }
    title: string;
    cover_image: {
        title: string;
        href: string;
    };
    blog_content: string;
    author: string;
    published_date: string;
};

export const fetchBlogs = async (): Promise<Blog[] | undefined> => {
    try {
        const response = await axios.get<{
            entries: Array<{
                blogs: Blog[];
            }>;
        }>(`https://eu-cdn.contentstack.com/v3/content_types/blogs/entries`, {
            headers: {
                api_key: import.meta.env.VITE_CONTENTSTACK_API_KEY as string,
                access_token: import.meta.env.VITE_CONTENTSTACK_DELIVERY_TOKEN as string,
            },
        });

        // Assuming there is at least one entry, and 'blogs' is the array we need
        const blogs = response.data.entries.flatMap(entry => entry.blogs);
        return blogs;
    } catch (error) {
        console.error("Error while fetchingblogs: ", error);
        return undefined;
    }
};
