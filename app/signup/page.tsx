"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
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
import Alert from "@mui/material/Alert";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function SignUpPage() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const router = useRouter();
  const [successAlert, setSuccessAlert] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSignUp = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, userPassword }),
      });
      if (res.status === 200) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        console.log(data);
        setSuccessAlert(true);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setSuccessAlert(false);
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
            fontSize: "40px",
            fontWeight: "600",
            fontFamily: "sans-serif",
          }}
        >
          Register
        </h1>
      </div>
      <div>
        <TextField
          onChange={(event) => {
            setUserName(event.target.value);
          }}
          id="outlined-multiline-flexible"
          label="Username"
          multiline
          maxRows={4}
        />
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
      <Button
        onClick={handleSignUp}
        style={{
          width: "250px",
          height: "56px",
          marginTop: "16px",
          backgroundColor: "#10a37f",
          color: "white",
        }}
        variant="outlined"
      >
        Create an Account
      </Button>
      {successAlert && (
        <Alert
          severity="success"
          variant="outlined"
          style={{ width: "250px", marginTop: "10px" }}
          onClose={() => setSuccessAlert(false)}
        >
          Registration Successful!!
        </Alert>
      )}
      <h2 style={{ color: "#2D333A", marginTop: "10px" }}>
        Already have an account?{" "}
      </h2>{" "}
      <Link href={"/login"} style={{ color: "#10a37f", fontSize: "20px" }}>
        Log in{" "}
      </Link>
    </Box>
  );
}
