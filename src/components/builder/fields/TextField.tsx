import { Text } from "lucide-react";
import { ElementsType, UIElement } from "../UIElements";

const type: ElementsType = "TextField";
export const TextFieldUIElement: UIElement = {
    type: "TextField",
    construct: (id: string)=>({
        id,
        type,
        extraAttributes:{
            label: "Text Field",
            helperText: "Helper Text",
            required: false,
            placeHolder: "Value"
        }
    }),
    buttonElement: {
        icon: Text,
        label: "Text field"
    },
    canvasComponent: () => <div>Canvas Component</div>,
    UIComponent : () => <div>UI Component</div>,
    propertiesComponent:  () => <div>Properties Component</div>,
}