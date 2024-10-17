import { SquareUser } from "lucide-react";
import { ElementsType, UIElement, UIElementInstance } from "../UIElements";
import { useCallback, useEffect, useState } from "react";
import { fetchEntry } from "@/services/fetchEntry";
let styles = {
  type: "teamGrid",
  layout: {
    gridTemplateColumns: {
      default: "1fr",
      md: "1fr 1fr",
    },
    gap: "8px",
    padding: "16px",
    alignItems: "center",
    justifyItems: "center",
  },
};

let content = {
  team_members: [] as Team[],
};
const type: ElementsType = "TeamGrid";
export const TeamGridUIElement: UIElement = {
  type: "TeamGrid",
  construct: (id: string) => ({
    id,
    type,
    styles,
    elementCategory: "teamGrid",
    content,
  }),
  buttonElement: {
    icon: SquareUser,
    label: "Team Grid",
  },
  canvasComponent: CanvasComponent,
  UIComponent: () => <div>UI Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};

type CustomeInstance = UIElementInstance & {
  styles: typeof styles;
  content: typeof content;
};

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
function CanvasComponent({
  elementInstance,
}: {
  elementInstance: UIElementInstance;
}) {
  const element = elementInstance as CustomeInstance;

  const [team, setTeam] = useState<Team[]>([]);

  const fetchTeam = useCallback(async () => {
    const response = await fetchEntry("about_us");

    const teamData = response?.entries[0].team_members as Team[];

    // Set the fetched team data to the state
    setTeam(teamData);

    // Directly update the elementInstance content with the fetched team data
    element.content.team_members = teamData;
  }, []);
  useEffect(() => {
    fetchTeam();
  }, []);
  return (
    <div className={`flex flex-col gap-2 w-full items-center justify-center`}>
      <span className="absolute bottom-2 text-sm right-5 opacity-40">
        Component ID: {element.id}
      </span>

      <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
        {team.map((member) => (
          <div
            className="items-center bg-gray-50 rounded-lg shadow sm:flex"
            key={member._metadata.uid}
          >
            <div>
              <img
                className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                src={member.image_url.href}
                alt={member.image_url.title}
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 ">
                <span>{member.member_name}</span>
              </h3>
              {/* <span className="text-gray-500 ">CEO & Web Developer</span> */}
              <p className="mt-3 mb-4 font-light text-gray-500 ">
                {member.member_description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
