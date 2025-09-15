import { getCurrentUser, updateCurrentUser } from "@/services/user.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useCurrentUser = () => {
  return useQuery(["currentUser"], getCurrentUser, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    retry: false,
  });
};

export const useUserUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCurrentUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
      console.log("si");
    },
  });
};
