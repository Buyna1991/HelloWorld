"use client";
import * as React from "react";
import Box from "@mui/material/Box";

import {
  Alert,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Link from "next/link";
import world from "@/public/world.jpeg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ResetPasswordPage() {
  const [userPassword, setUserPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userPassword, token }),
      });
      if (confirm !== userPassword) {
        setErrorAlert(true);
      } else {
        const data = await res.json();
        router.push("/login");
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        backgroundColor: "white",
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "300px",
        paddingRight: "1000px",
        background: `url(${world.src}) center / cover`,
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <h1
          style={{
            color: "#2D333A",
            fontSize: "26px",
            fontWeight: "600",
            fontFamily: "sans-serif",
          }}
        >
          Reset Password
        </h1>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            onChange={(event) => {
              setUserPassword(event.target.value);
            }}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            onChange={(event) => {
              setConfirm(event.target.value);
            }}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>
      </div>
      {errorAlert && (
        <Alert
          severity="error"
          variant="outlined"
          style={{ width: "250px", marginTop: "10px" }}
          onClose={() => setErrorAlert(false)}
        >
          Password Must Match!!
        </Alert>
      )}

      <Button
        onClick={handleSubmit}
        style={{
          width: "250px",
          height: "56px",
          marginTop: "16px",
          backgroundColor: "#10a37f",
          color: "white",
        }}
        variant="outlined"
      >
        Submit
      </Button>

      <h3 style={{ color: "black", marginTop: "10px" }}>
        {" "}
        Back to{" "}
        <Link href={"/login"} style={{ color: "#10a37f", fontSize: "16px" }}>
          Login{" "}
        </Link>
      </h3>
    </Box>
  );
}
