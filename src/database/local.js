export const menu = [
  { label: "About uz", link: "/about" },
  {
    label: "League",
    submenu: [
      { label: "Norte", link: "/league/norte" },
      {
        label: "Sur",
        submenu: [
          { label: "TNB", link: "/league/sur/tnb" },
          { label: "Liga Benito", link: "/league/sur/ligabenito" },
        ],
      },
      { label: "Poniente", link: "/league/poniente" },
      { label: "Oriente", link: "/league/oriente" },
    ],
  },
  {
    label: "Comunidad",
    submenu: [
      { label: "Equipos", link: "/comunidad/equipos" },
      { label: "Jugadores", link: "/comunidad/jugadores" },
      { label: "Arbitros", link: "/comunidad/arbitros" },
      { label: "Coaches", link: "/comunidad/coaches" },
    ],
  },
];
