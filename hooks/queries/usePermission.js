import { useQuery } from "@tanstack/react-query";
import { getMyPermissions, getUserPermissions } from "@/services/permission.service";

// پرمیژن‌های خود کاربر
export const useMyPermissions = () => {
  return useQuery({
    queryKey: ["myPermissions"],
    queryFn: getMyPermissions,
  });
};

// پرمیژن‌های یک کاربر خاص
export const useUserPermissions = (userId) => {
  return useQuery({
    queryKey: ["userPermissions", userId],
    queryFn: () => getUserPermissions(userId),
    enabled: !!userId, // فقط وقتی userId وجود داشته باشه
  });
};
