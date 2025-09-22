import { Card, CardContent, List, ListItem, ListItemText } from "@mui/material";
import {
  useMyPermissions,
  useUserPermissions,
} from "@/hooks/queries/usePermission";

function PermissionsList({ userId }) {
  const { data: userPermissions, isLoading: loadingUser } =
    useUserPermissions(userId);
  const { data: myPermissions, isLoading: loadingMy } = useMyPermissions();

  const isAdminMode = !!userId;

  if (isAdminMode && loadingUser) return <p>در حال بارگذاری مجوزها...</p>;
  if (!isAdminMode && loadingMy) return <p>در حال بارگذاری مجوزها...</p>;

  const permissions = isAdminMode ? userPermissions : myPermissions;

  return (
    <Card>
      <CardContent>
        <h4>{isAdminMode ? "مجوزهای کاربر" : "مجوزهای من"}</h4>
        <List>
          {permissions[0] ? (
            permissions.map((perm) => (
              <ListItem key={perm.id} divider>
                <ListItemText
                  primary={isAdminMode ? perm.name_fa || perm.name : perm.name}
                  secondary={isAdminMode ? perm.description : null}
                />
              </ListItem>
            ))
          ) : (
            <p>-- لیست مجوز ها خالی است</p>
          )}
        </List>
      </CardContent>
    </Card>
  );
}

export default PermissionsList;
