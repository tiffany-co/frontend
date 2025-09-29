// hooks/queries/useAuditLog.js
import { useQuery } from "@tanstack/react-query";
import { getAuditLogs } from "@/services/auditLog.service";

export const useAuditLogs = (filters) => {
  return useQuery({
    queryKey: ["auditLogs", filters],
    queryFn: () => getAuditLogs(filters),
  });
};
