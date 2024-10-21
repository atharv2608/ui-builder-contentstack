export interface Schema{
  data_type: File,
  display_name: string,
  uid: string,
  mandatory: Boolean
}

export interface ContentType {
  title: string;
  uid: string;
  schema: Schema[]
  [key: string]: unknown;
}

export type ComponentItemType = {
  id: number
}

export type CanvasComponent = {
  id: number,
  name: string, 
  type: string
}

export type HomePageEntry = {
  uid: string;
  title: string;
  subtitle: string;
  hero_image: {
      title: string,
      href:   string,
  };
  highlights: string;
  overview: string;
  [key: string]: unknown;
};

export type Product = {
  _metadata: {
          uid: string;
  },
  product_name: string;
  product_description: string;
  product_price: string;
  product_image: {
      title: string;
      href: string;
  }
};

export type ProductEntry = {
  title: string;
  product_page_overview: string;
  products: Product[]
}

export type Team = {
  member_name: string;
  _metadata: {
    uid: string;
  };
  member_description: string;
  image_url: {
    title: string;
    href: string;
  };
}; 

export type AboutUsEntry = {
  uid: string;
  about_subtitle: string;
  company_information: string;
  history: string;
  mission: string;
  team_members: Team[]


}

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

export type BlogEntry = {
  uid: string;
  title: string;
  sub_title: string;
  blogs_description: string;
  blogs: Blog[];
}


/*--------------------Visuals ------------------------------*/
export type StyleObject = {
    [key: string]: string | number | undefined | StyleObject;
};

export type Content = 
  | { blogs: Blog[] }
  | { products: Product[] }
  | { team_members: Team[] }
  | { [key: string]: any }

export type UI_JSON = {
    page: string,
    components: [
        {
            id: string,
            type: string,
            styles: StyleObject,
            elementCategory: string,
            content?: Content,
            linkedContentTypeUID?: string,
            linkedSchemaID?: string
        }
    ]
}
export type Visuals = {
    uid: string;
    title: string,
    ui_json: UI_JSON
}

export type VisualsEntryResponse = {
    entries: Visuals[]
}


