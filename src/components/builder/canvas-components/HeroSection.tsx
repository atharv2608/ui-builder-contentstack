import { LayoutPanelTop } from "lucide-react";
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
let styles = {
  layout: {
    display: "grid",
    maxWidth: "1280px", // max-w-screen-xl
    paddingLeft: "1rem", // px-4
    paddingRight: "1rem", // px-4
    paddingTop: "2rem", // py-8
    paddingBottom: "2rem", // py-8
    marginLeft: "auto",
    marginRight: "auto",
    gap: "4rem", // lg:gap-16 xl:gap-0
    gridTemplateColumns: "repeat(12, 1fr)", // lg:grid-cols-12
    paddingTopLg: "4rem", // lg:py-16
  },
  textContainer: {
    marginRight: "auto",
    alignSelf: "center", // place-self-center
    gridColumn: "span 7", // lg:col-span-7
  },
  title: {
    maxWidth: "42rem", // max-w-2xl
    marginBottom: "1rem", // mb-4
    fontSize: "1.875rem", // text-3xl
    fontWeight: "800", // font-extrabold
    lineHeight: "1.2", // leading-none
    letterSpacing: "-0.025em", // tracking-tight
  },
  subtitle: {
    maxWidth: "42rem", // max-w-2xl
    marginBottom: "1.5rem", // mb-6
    fontWeight: "300", // font-light
    color: "#6b7280", // text-gray-500
    fontSize: "1.125rem", // md:text-lg
    fontSizeLg: "1.25rem", // lg:text-xl
    marginBottomLg: "2rem", // lg:mb-8
  },
  imageContainer: {
    display: "none", // hidden
    marginTopLg: "0", // lg:mt-0
    gridColumnLg: "span 5", // lg:col-span-5
    displayLg: "flex", // lg:flex
  },
  image: {
    width: "100%",
    height: "auto",
  },
};
export let defaultHeroSectionContent = {
  title: "Your Title Here",
  subtitle:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, dicta!",
  image:
    "https://cdn.leonardo.ai/users/fe39703b-08bb-495c-94db-eed1dda61cc4/generations/6ffbf7cd-8d07-4e03-aba7-eebd28ed086e/Leonardo_Phoenix_A_minimalist_composition_featuring_a_sleek_mo_1.jpg",
};

const type: ElementsType = "HeroSection";
export const HeroSectionUIElement: UIElement = {
  type: "HeroSection",
  construct: (id: string) => ({
    id,
    type,
    styles,
    content: defaultHeroSectionContent,
    elementCategory: "heroSection",
  }),
  buttonElement: {
    icon: LayoutPanelTop,
    label: "Hero Section",
  },
  canvasComponent: CanvasComponent,
  UIComponent: () => <div>UI Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};

type CustomeInstance = UIElementInstance & {
  styles: typeof styles;
  content: typeof defaultHeroSectionContent;
};

function CanvasComponent({
  elementInstance,
}: {
  elementInstance: UIElementInstance;
}) {
  const element = elementInstance as CustomeInstance;
  return (
    <section className="bg-white">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-16 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none">
            {element.content.title}
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
            {element.content.subtitle}
          </p>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src={element.content.image} alt="hero-image" />
        </div>
      </div>
    </section>
  );
}

export function HeroSectionDragOverlay() {
  return (
    <div className="w-full h-[120px] bg-gray-400 opacity-80 rounded-md shadow-md flex justify-between p-2 items-center">
      <h1 className="text-3xl font-bold text-black text-center w-full">
        Hero Section
      </h1>
    </div>
  );
}
