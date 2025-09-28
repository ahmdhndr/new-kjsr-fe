import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaHandshakeSimple, FaUserGroup } from "react-icons/fa6";
import { MdEvent, MdSettings } from "react-icons/md";
import { RiArticleFill, RiHome2Fill } from "react-icons/ri";

import { NavDashboard } from "../types/menu.type";

export const navDashboard: NavDashboard = {
  general: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: RiHome2Fill,
    },
    {
      title: "Umum",
      url: "",
      children: [
        {
          title: "Acara",
          url: "/dashboard/events",
          icon: MdEvent,
        },
        {
          title: "Artikel",
          url: "/dashboard/articles",
          icon: RiArticleFill,
        },
        {
          title: "Pengaturan",
          url: "/dashboard/settings",
          icon: MdSettings,
        },
      ],
    },
  ],
  admin: [
    {
      title: "Admin Area",
      url: "",
      children: [
        {
          title: "Anggota",
          url: "/dashboard/admin/members",
          icon: FaUserGroup,
        },
        {
          title: "Review Artikel",
          url: "/dashboard/admin/review-articles",
          icon: FaUserGroup,
        },
        {
          title: "Pengajuan Akun",
          url: "/dashboard/admin/approvals",
          icon: FaHandshakeSimple,
        },
        {
          title: "Kategori",
          url: "/dashboard/admin/categories",
          icon: BiSolidCategoryAlt,
        },
      ],
    },
  ],
};
