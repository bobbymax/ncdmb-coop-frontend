export const items = [
  {
    name: "Members Area",
    path: "/dashboard/loans",
    isDropdown: true,
    postion: 1,
    children: [
      {
        name: "Request",
        path: "/dashboard/loan/requests",
        isDropdown: false,
        children: [],
      },
      {
        name: "Liquidate",
        path: "/dashboard/loan/liquidate",
        isDropdown: false,
        children: [],
      },
    ],
  },
  {
    name: "Administration",
    path: "/dashboard/test",
    isDropdown: true,
    postion: 2,
    children: [
      {
        name: "Modules",
        path: "/dashboard/administration/modules",
        isDropdown: false,
        children: [],
      },
    ],
  },
  {
    name: "Secretariat",
    path: "/dashboard/secretariat",
    isDropdown: true,
    postion: 3,
    children: [
      {
        name: "Loans",
        path: "/dashboard/secretariat/loans",
        isDropdown: false,
        children: [],
      },
    ],
  },
];
