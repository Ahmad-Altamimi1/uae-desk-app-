import { useUserStore } from "@/store/useStroeUser";
import { PermissionTypes } from "../utils/type";
import Cookies from "js-cookie";

export function useHasPermission(): (permissionToCheck: PermissionTypes) => boolean {
  const { user } = useUserStore();

  let userPermissions: PermissionTypes[] = [];

  if (user?.permissions) {
    userPermissions = user.permissions;
  } else {
    const cookiePermissions = Cookies.get("permissions");
    if (cookiePermissions) {
      try {
        userPermissions = JSON.parse(cookiePermissions);
      } catch (error) {
        console.error("Invalid permissions cookie format", error);
      }
    }
  }
const hasPermission = (permissionToCheck: PermissionTypes) => {
  return userPermissions.includes(permissionToCheck);
};
return hasPermission;
}
