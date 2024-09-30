import snippet from "@/api/snippet";
import web from "@/api/web";
import { Router } from "express";

const router = Router();

const defaultRoutes = [
  {
    path: "/",
    route: web,
  },
  {
    path: "/snippet",
    route: snippet,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
