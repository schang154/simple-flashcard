import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Input = ({
  name,
  label,
  type,
  handleChange,
  half,
  handleShowPassword,
}) => {
  const password = "password";
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        variant="outlined"
        label={label}
        type={type}
        onChange={handleChange}
        required
        fullWidth
        InputProps={
          name === password
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === password ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
