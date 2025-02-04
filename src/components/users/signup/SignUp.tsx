import React, { useState } from "react";
import StepForm from "./StepForm";
import StepSubmit from "./StepSubmit";
import StepWelcome from "./StepWelcome";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { VariablesColors } from "@/styles/Variables.colors";
import { useMutation } from "@apollo/client";
import { UserFormData } from "@/types/UserTypes";
import { Toaster } from "react-hot-toast";
import { showToast } from "@/components/utils/toastHelper";
import { mutationCreateUser } from "@/graphql/user/mutationCreateUser";

const colors = new VariablesColors();
const { lightGreyColor } = colors;

const SignUp = (): React.ReactNode => {
  // FORM
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const hidenPassword = (): string => {
    const length = password.length;
    const hidenPassword = "*".repeat(length);
    return hidenPassword;
  };

  const [currentStep, setCurrentStep] = useState<string>("email");
  // FORM STEPS
  const formSteps = [
    {
      step: "email",
      title: "Votre adresse email",
      data: email,
    },
    { step: "firstName", title: "Votre prénom", data: firstName },
    { step: "lastName", title: "Votre nom", data: lastName },
    { step: "nickName", title: "Votre surnom", data: nickName },
    {
      step: "phoneNumber",
      title: "Votre numéro de téléphone",
      data: phoneNumber,
    },
    { step: "password", title: "Votre mot de passe", data: password },
  ];
  // SUBMIT
  const [doCreate, loading] = useMutation(mutationCreateUser);
  async function onSubmit() {
    try {
      const data: UserFormData = {
        firstName,
        lastName,
        nickName,
        email,
        password,
        phoneNumber,
      };

      const result = await doCreate({
        variables: {
          data: data,
        },
      });
      if ("id" in result.data?.item) {
        setCurrentStep("welcome");
      } else {
        showToast("error", "Erreur pendant la création de votre compte");
      }
    } catch (error) {
      console.error("error", error);
      showToast("error", "Erreur pendant la création de votre compte");
      setCurrentStep("email");
    }
  }
  return (
    <>
      {currentStep === "welcome" ? (
        <StepWelcome email={email} />
      ) : (
        <Grid
          container
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
          }}
        >
          <Toaster />
          <Grid
            item
            xs={12}
            sm={5}
            md={3.5}
            lg={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: lightGreyColor,
              height: "89vh",
              padding: "1%",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={600}
              marginBottom={"25px"}
              gutterBottom
            >
              Vos informations
            </Typography>
            {formSteps.map((el) => (
              <Box key={el.step} sx={{ marginBottom: "25px" }}>
                <Typography variant="subtitle2" gutterBottom>
                  {el.title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {el.step === "password" ? (
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      gutterBottom
                    >
                      {!el.data ? "-" : hidenPassword()}
                    </Typography>
                  ) : (
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      gutterBottom
                    >
                      {el.data ? el.data : "-"}
                    </Typography>
                  )}
                  {el.data && el.step !== currentStep && (
                    <Button onClick={() => setCurrentStep(el.step)}>
                      Modifier
                    </Button>
                  )}
                </Box>
                <Divider />
              </Box>
            ))}
          </Grid>
          <Grid item xs={12} sm={7} md={8.5} lg={9}>
            {currentStep === "submit" ? (
              <StepSubmit onSubmit={onSubmit} loading={loading.loading} />
            ) : (
              <StepForm
                email={email}
                setEmail={setEmail}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                nickName={nickName}
                setNickName={setNickName}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                password={password}
                setPassword={setPassword}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SignUp;
