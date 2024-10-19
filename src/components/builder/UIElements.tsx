import { ContentTypeNames } from "@/services/fetchEntry";
import { HeadingUIElement } from "./canvas-components/Heading";
import { ImageUIElement } from "./canvas-components/Image";
import { ParagraphUIElement } from "./canvas-components/Paragraph";
import { ProductUIElement } from "./canvas-components/Product";
import { TextFieldUIElement } from "./canvas-components/TextField";
import { BlogUIElement } from "./canvas-components/Blog";
import { SubHeadingUIElement } from "./canvas-components/SubHeading";
import { TeamGridUIElement } from "./canvas-components/TeamGrid";
import { BlogsGridUIElement } from "./canvas-components/BlogsGrid";
import { ProductsGridUIElement } from "./canvas-components/ProductsGrid";
import { HeroSectionUIElement } from "./canvas-components/HeroSection";

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
