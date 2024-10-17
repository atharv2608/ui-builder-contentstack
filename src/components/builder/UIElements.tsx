import { ContentTypeNames } from "@/services/fetchEntry";
import { HeadingUIElement } from "./fields/Heading";
import { ImageUIElement } from "./fields/Image";
import { ParagraphUIElement } from "./fields/Paragraph";
import { ProductUIElement } from "./fields/Product";
import { TextFieldUIElement } from "./fields/TextField";
import { BlogUIElement } from "./fields/Blog";
import { SubHeadingUIElement } from "./fields/SubHeading";
import { TeamGridUIElement } from "./fields/TeamCard";

export type ElementsType = "TextField" | "Heading" | "SubHeading" | "Image" | "Product" | "Paragraph" | "Blog" | "TeamGrid";

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
    TeamGrid: TeamGridUIElement
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
