import { HeadingUIElement } from "./fields/Heading";
import { ImageUIElement } from "./fields/Image";
import { TextFieldUIElement } from "./fields/TextField";

export type ElementsType = "TextField" | "Heading" | "Image";

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
    Image: ImageUIElement
}

export type UIElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes? : Record<string , any>
}
