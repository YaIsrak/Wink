import { IconType } from "react-icons";
import { GoBell, GoBellFill, GoHome, GoHomeFill } from "react-icons/go";
import { IoPaperPlane, IoPaperPlaneOutline } from "react-icons/io5";

export const navbarItems: {
  label: string;
  href: string;
  icon: IconType;
  fillIcon: IconType;
}[] = [
  {
    label: "Home",
    href: "/explore",
    icon: GoHome,
    fillIcon: GoHomeFill,
  },
  {
    label: "Notification",
    href: "/notification",
    icon: GoBell,
    fillIcon: GoBellFill,
  },
  {
    label: "Message",
    href: "/message",
    icon: IoPaperPlaneOutline,
    fillIcon: IoPaperPlane,
  },
];
