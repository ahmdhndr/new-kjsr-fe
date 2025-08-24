import { IconType } from "react-icons/lib";

// export type IconType = (props: SVGProps<SVGSVGElement>) => React.JSX.Element;

export type Menu = {
  title: string;
  url: string;
  icon?: IconType;
  children?: Menu[];
};

export type NavDashboard = {
  general: Menu[];
  admin: Menu[];
};
