import { getItems } from "@/services/items.service";
import { useQuery } from "@tanstack/react-query";

export const useAllItems = () => {
  return useQuery(["items"], getItems, {
    onError: (error) => {
      console.error("Failed to fetch items:", error);
    },
  });
};
