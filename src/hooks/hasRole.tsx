import { useUserStore } from "@/store/useStroeUser";
import { RoleTypes } from "../utils/type";
import Cookies from "js-cookie";
import { log } from "node:console";

export function useHasRole(): (roleToCheck: RoleTypes) => boolean {
  const { user } = useUserStore();

  let userRole: string | undefined = user?.user?.roles[0].code;
  console.log("userRole",userRole);
   
  if (!userRole) {
    const cookieRole = Cookies.get("role");
    if (cookieRole) {
      try {
        userRole = JSON.parse(cookieRole);
      } catch (error) {
        console.error("Invalid role cookie format", error);
      }
    }
  }
console.log("userRole", userRole);
  const hasRole = (roleToCheck: RoleTypes) => {
    return userRole === roleToCheck; 
  };

  return hasRole;
}
