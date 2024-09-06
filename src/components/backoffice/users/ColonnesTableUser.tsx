import { MUTATION_DELETE_USER } from "@/graphql/user/mutationUserDelete";
import { QUERY_ALL_USERS } from "@/graphql/user/queryAllUsers";
import { VariablesColors } from "@/styles/Variables.colors";
import { useMutation } from "@apollo/client";
import { Box, CardMedia } from "@mui/material";
import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

type ColonnesTableUserPropsType = {
  onUserDeleted: (message: string[]) => void;
};

export function ColonnesTableUser({
  onUserDeleted,
}: ColonnesTableUserPropsType): GridColDef[] {
  const { errorColor } = new VariablesColors();
  const router = useRouter();

  const [doDeleteUser] = useMutation(MUTATION_DELETE_USER, {
    refetchQueries: [QUERY_ALL_USERS],
  });

  const handleDeleteUser = async (id: number) => {
    try {
      const deleteResult = await doDeleteUser({
        variables: {
          userDeleteId: Number(id),
        },
      });
      const message = deleteResult?.data?.userDelete?.id
        ? ["success", "Utilisateur supprimé "]
        : ["error", "Error lors de la suppression de l'utilisateur"];
      onUserDeleted(message);
    } catch (error) {
      onUserDeleted(["error", "Error lors de la suppression"]);
      console.error("error", "Error lors de la suppression de l'utilisateur");
    }
  };

  const userColumns: GridColDef[] = useMemo(
    () => [
      {
        field: "Avatar",
        headerName: "",
        hide: true,
        renderCell: ({ row }) =>
          row.avatar && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <CardMedia
                component="img"
                alt={row.firstName}
                sx={{
                  maxWidth: "25px",
                  objectFit: "contain",
                  borderRadius: "1rem",
                }}
                image={`${process.env.NEXT_PUBLIC_PATH_IMAGE}${row.avatar.urlMiniature}`}
              />
            </Box>
          ),
        flex: 1,
      },
      {
        field: "firstName",
        headerName: "Prénom",
        valueGetter: (value, row) => row.firstName || "",
        flex: 1,
      },
      {
        field: "lastName",
        headerName: "Nom",
        valueGetter: (value, row) => row.lastName || "",
        flex: 1,
      },
      {
        field: "nickName",
        headerName: "Surnom",
        valueGetter: (value, row) => row.nickName || "",
        flex: 1,
      },
      {
        field: "email",
        headerName: "Email",
        valueGetter: (value, row) => row.email || "",
        flex: 1,
      },
      {
        field: "phoneNumber",
        headerName: "Téléphone",
        valueGetter: (value, row) => row.phoneNumber || "",
        flex: 1,
      },
      {
        field: "role",
        headerName: "Rôle",
        valueGetter: (value, row) => row.role.right || "",
        flex: 1,
      },
      {
        field: "lastConnectionDate",
        headerName: "Dernière connexion",
        valueGetter: (value, row) =>
          format(new Date(row.lastConnectionDate), "dd/MM/yyyy") || "",
        flex: 1,
      },
      {
        field: "createdAt",
        headerName: "Créé le",
        flex: 1,
        valueGetter: (value, row) =>
          format(new Date(row.createdAt), "dd/MM/yyyy") || "",
      },
      {
        field: "createdBy",
        headerName: "Créé par",
        valueGetter: (value, row) => {
          const createdBy = row.createdBy;
          if (createdBy) {
            return createdBy.firstName + " " + createdBy.lastName;
          }
          return "";
        },
        flex: 1,
      },
      {
        field: "updatedAt",
        headerName: "Mis à jour le",
        valueGetter: (value, row) =>
          format(new Date(row.updatedAt), "dd/MM/yyyy") || "",
        flex: 1,
      },
      {
        field: "updatedBy",
        headerName: "Mis à jour par",
        valueGetter: (value, row) => {
          const updatedBy = row.updatedBy;
          if (updatedBy) {
            return updatedBy.firstName + " " + updatedBy.lastName;
          }
          return "";
        },
        flex: 1,
      },
      {
        field: "actions",
        type: "actions",
        sortable: false,
        filterable: false,
        flex: 1,
        getActions: (params: GridRowParams) => [
          <GridActionsCellItem
            key={`${params.row.id}-edit`}
            icon={<FaRegEdit style={{ fontSize: "1rem" }} />}
            label="Modifier"
            title="Modifier l'utilisateur"
            onClick={() =>
              router.push(`/renthub-backoffice/user-form/${params.row.id}`)
            }
          />,
          <GridActionsCellItem
            key={`${params.row.id}-delete`}
            icon={
              <RiDeleteBinLine
                style={{ fontSize: "1rem", color: errorColor }}
              />
            }
            label="Supprimer"
            title="Supprimer l'utilisateur"
            onClick={() => handleDeleteUser(Number(params.row.id))}
          />,
        ],
      },
    ],
    [],
  );

  return userColumns;
}
