// REACT
import React, { useEffect } from "react";
// FORMIK - YUP
import * as Yup from "yup";
import { useFormik } from "formik";
// MUI
import { Box, Button, Grid, TextField } from "@mui/material";
// UTILS
import { styleBoxContainer } from "@/components/utils/function";
import { VariablesColors } from "@/styles/Variables.colors";
import { UserFormValues, UserTypes } from "@/types/UserTypes";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USER_GETBYID } from "@/graphql/user/queryUserGetById";
import { Toaster } from "react-hot-toast";
import { MUTATION_UPDATE_USER } from "@/graphql/user/mutationUserUpdate";
import { showToast } from "@/components/utils/toastHelper";
import { mutationCreateUser } from "@/graphql/user/mutationCreateUser";

export const UserForm = ({ userId }: { userId?: string | null }) => {
  const { lightBlueColor, hoverBlueColor } = new VariablesColors();
  const { data } = useQuery<{ item: UserTypes }>(QUERY_USER_GETBYID, {
    variables: { id: userId },
  });

  const [doCreate, loading] = useMutation(mutationCreateUser);

  const [doUpdate] = useMutation(MUTATION_UPDATE_USER, {
    refetchQueries: [QUERY_USER_GETBYID],
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        firstName: data.item.firstName,
        lastName: data.item.lastName,
        email: data.item.email,
        phoneNumber: data.item.phoneNumber,
        password: "",
      });
    }
  }, [data]);

  const formik = useFormik<UserFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: userId
        ? Yup.string().matches(
            /^[a-zA-Z]+$/,
            "Le prénom ne doit contenir que des lettres",
          )
        : Yup.string()
            .matches(/^[a-zA-Z]+$/, "Le nom ne doit contenir que des lettres")
            .required("Le prénom est requis"),
      lastName: userId
        ? Yup.string().matches(
            /^[a-zA-Z]+$/,
            "Le nom ne doit contenir que des lettres",
          )
        : Yup.string()
            .matches(/^[a-zA-Z]+$/, "Le nom ne doit contenir que des lettres")
            .required("Le nom est requis"),
      email: userId
        ? Yup.string().email()
        : Yup.string().email().required("L'email est requis"),
      phoneNumber: userId
        ? Yup.string().min(10, "Le numéro de téléphone doit avoir 10 chiffres")
        : Yup.string()
            .min(10, "Le numéro de téléphone doit avoir 10 chiffres")
            .required("Le numéro de téléphone est requis"),
      password: userId
        ? Yup.string().matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{9,}$/,
            "Le mot de passe doit contenir au moins 9 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
          )
        : Yup.string().required("Le mot de passe est requis"),
    }),
    onSubmit: async (values) => {
      if (userId) {
        try {
          const { email, ...rest } = values;
          const result = await doUpdate({
            variables: { userId: Number(userId), data: rest },
          });
          if (result.data?.updateUser) {
            formik.resetForm();
            showToast("success", "Utilisateur modifié avec succès !");
          }
        } catch (error) {
          showToast("error", "Erreur lors de la modification d'utilisateur");
        }
      } else {
        try {
          console.warn("update with NO id");
          // updateUser({ variables: { id: userId, data: values } });
          const result = await doCreate({
            variables: { data: values },
          });
          if (result.data?.updateUser) {
            formik.resetForm();
            showToast("success", "Utilisateur créé avec succès !");
          }
        } catch (error) {
          showToast("error", "Erreur lors de la creation d'utilisateur");
        }
      }
    },
  });

  return (
    <>
      <Toaster />
      <Box sx={styleBoxContainer(lightBlueColor)}>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Grid item xs={12} sm={6} width={"100%"}>
              <TextField
                fullWidth
                size="small"
                id="firstName"
                name="firstName"
                label="Prénom"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6} width={"100%"}>
              <TextField
                fullWidth
                size="small"
                id="lastName"
                name="lastName"
                label="Nom"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6} width={"100%"}>
              <TextField
                fullWidth
                size="small"
                id="email"
                type="email"
                name="email"
                label="Email"
                value={formik.values.email}
                disabled={userId ? true : false}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6} width={"100%"}>
              <TextField
                fullWidth
                size="small"
                id="phoneNumber"
                name="phoneNumber"
                label="Téléphone"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} width={"100%"}>
              <TextField
                fullWidth
                size="small"
                id="password"
                type="password"
                name="password"
                label={userId ? "Nouveau mot de passe" : "Mot de passe"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              width={"100%"}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <Button
                type="submit"
                variant="contained"
                className="btn-lightBlue"
                sx={{
                  backgroundColor: lightBlueColor,
                  color: "#fff",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: hoverBlueColor,
                  },
                }}
              >
                Enregistrer
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default UserForm;
