import React, { useState } from "react";
import { TextField } from "@mui/material";

type UserNickNameProps = {
  userNickName: string;
  setUserNickName: (firstName: string) => void;
};

const UserNickName = (props: UserNickNameProps): React.ReactNode => {
  const [nickNameError, setNickNameError] = useState<string>("");

  const validateName = (name: string) => /^[a-zA-ZÀ-ÿ\s-]{2,50}$/.test(name);

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    props.setUserNickName(value);
    if (!validateName(value)) {
      setNickNameError(
        "Ne doit contenir que des lettres (minimum 2, maximum 50)",
      );
    } else {
      setNickNameError("");
    }
  };

  return (
    <TextField
      fullWidth
      id="nickName"
      size="small"
      label="Surnom"
      variant="outlined"
      value={props.userNickName}
      onChange={handleNickNameChange}
      required
      error={!!nickNameError}
      helperText={nickNameError}
    />
  );
};

export default UserNickName;
