const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Inicio.vue") },
      { path: "/help", component: () => import("pages/HelpItem.vue") },
      { path: "/newrecipe", component: () => import("pages/NuevaReceta.vue") },
      { path: "/misrecetas", component: () => import("pages/MisRecetas.vue") },
      {
        path: "/calcu",
        component: () => import("pages/CalculadoraProporciones.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
