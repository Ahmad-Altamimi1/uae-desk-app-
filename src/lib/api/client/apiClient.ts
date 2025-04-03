import { BASE_URL } from "@/constants";
import { createApiClient } from "./clientConfig";
import { ApiRoute, createHomeRoute } from "../routes";
import { createActivityRoute } from "../routes/activitiesRoute";
import { createMenuRoute } from "../routes/menuRoute";
import { createEventsRoute } from "../routes/eventsRoute";

export const baseApi = createApiClient({
  baseURL: BASE_URL ?? "",
  apiName: "",
});

export const apiRoutes: ApiRoute = {
  homeRoute: createHomeRoute(baseApi),
  activityRoute: createActivityRoute(baseApi),
  menuRoute: createMenuRoute(baseApi),
  eventsRoute: createEventsRoute(baseApi),
};
