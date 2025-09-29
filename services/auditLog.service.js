import http from "@/api/http";

export const getAuditLogs = async ({ skip = 0, limit = 100, user_id, operation, table_name }) => {
  try {
    const response = await http.get("/audit-logs/", {
      params: { skip, limit, user_id, operation, table_name },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
