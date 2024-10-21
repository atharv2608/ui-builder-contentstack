import { ContentTypeNames } from "@/services/fetchEntry";
import { HeadingUIElement,
    ImageUIElement,
    ParagraphUIElement,
    ProductUIElement,
    BlogUIElement,
    SubHeadingUIElement,
    TeamGridUIElement,
    BlogsGridUIElement,
    ProductsGridUIElement,
    HeroSectionUIElement,
    TextFieldUIElement
} from "./canvas-components"

export type ElementsType = "TextField" | "Heading" | "SubHeading" | "Image" | "Product" | "Paragraph" | "Blog" | "TeamGrid" | "BlogsGrid" |"ProductsGrid" | "HeroSection";

export type UIElement = {
    type: ElementsType,
    construct: (id: string) => UIElementInstance;
    buttonElement: {
        icon: React.ElementType,
        label: string
    }
    canvasComponent: React.FC<{
        elementInstance: UIElementInstance;
    }>;
    UIComponent:  React.FC
    propertiesComponent: React.FC;
}

type UIElementsTypes = {
    [key in ElementsType]: UIElement
}

export const UIElements: UIElementsTypes = {
    TextField: TextFieldUIElement,
    Heading: HeadingUIElement,
    Image: ImageUIElement,
    Product: ProductUIElement,
    Paragraph: ParagraphUIElement,
    Blog: BlogUIElement,
    SubHeading: SubHeadingUIElement,
    TeamGrid: TeamGridUIElement,
    BlogsGrid : BlogsGridUIElement,
    ProductsGrid: ProductsGridUIElement,
    HeroSection: HeroSectionUIElement
}

export type UIElementInstance = {
    id: string;
    type: ElementsType;
    elementCategory: string; 
    styles? : Record<string , any>;
    linkedContentTypeUID?: ContentTypeNames;
    linkedSchemaID?: string;
    content?: Record<string , any>;
}
