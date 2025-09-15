import { getCurrentUser } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  return useQuery(["currentUser"], getCurrentUser, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    retry: false,
  });
};
