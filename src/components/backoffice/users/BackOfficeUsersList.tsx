import { QUERY_ALL_USERS } from "@/graphql/user/queryAllUsers";
import { UserInterface } from "@/types/UserTypes";
import { useQuery } from "@apollo/client";
import { ThemeProvider } from "@emotion/react";
import { Box, createTheme } from "@mui/material";
import { frFR } from "@mui/x-data-grid/locales";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ColonnesTableUser } from "./ColonnesTableUser";
import { showToast } from "@/components/utils/toastHelper";
import { Toaster } from "react-hot-toast";

export const dataGridTheme = createTheme(
  {},
  frFR /* French language for the whole grid */,
);
const BackOfficeUsersList = (): React.ReactNode => {
  const { data } = useQuery<{ items: UserInterface[] }>(QUERY_ALL_USERS, {
    fetchPolicy: "cache-and-network",
  });

  const onUserDeleted = (message: string[]) => {
    showToast(message[0], message[1]);
  };

  const userColumns = ColonnesTableUser({ onUserDeleted });

  return (
    <ThemeProvider theme={dataGridTheme}>
      <Toaster />
      <Box sx={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={data?.items || []}
          columns={userColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
            columns: {
              columnVisibilityModel: {
                lastConnectionDate: false,
                createdAt: false,
                updatedAt: false,
                createdBy: false,
                updatedBy: false,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          loading={!data}
        />
      </Box>
    </ThemeProvider>
  );
};

export default BackOfficeUsersList;
