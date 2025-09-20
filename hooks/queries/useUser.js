import {
  createUser,
  deleteUser,
  getAllUsers,
  getCurrentUser,
  updateCurrentUser,
  updateUser,
} from "@/services/user.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useCurrentUser = () => {
  return useQuery(["currentUser"], getCurrentUser, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    retry: false,
  });
};

export const useCurrentUserUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCurrentUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useUserCreate = () => {
  const queryClient = useQueryClient();
  return useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allUser"]);
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useAllUsers = () => {
  return useQuery(["allUser"], getAllUsers, {
    onError: (error) => {
      return error;
    },
  });
};

export const useUserDelete = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allUser"]);
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useUserUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allUser"]);
    },
    onError: (error) => {
      return error;
    },
  });
};
