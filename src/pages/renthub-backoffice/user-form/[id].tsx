import AdminProtection from "@/components/backoffice/AdminProtection";
import UserForm from "@/components/backoffice/users/UserForm";
import { TitlePageWithStyle } from "@/components/utils/TitlePageWithStyle";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export function UserUpdate(): React.ReactNode {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <Container maxWidth="xl">
        <TitlePageWithStyle title="Modifier un utilisateur" sx={{ mt: 2 }} />
        <UserForm userId={id} />
      </Container>
    </>
  );
}

export default AdminProtection(UserUpdate);
