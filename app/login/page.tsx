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

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [errorAlert, setErrorAlert] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: username, userPassword: password }),
      });
      if (res.status === 200) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        console.log(data);
        router.push("/");
      } else if (res.status === 401) {
        setErrorAlert(true);
      }
    } catch (error) {
      setErrorAlert(false);
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
            fontSize: "34px",
            fontWeight: "600",
            fontFamily: "sans-serif",
          }}
        >
          Hello World
        </h1>
      </div>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Username"
          type="text"
          multiline
          maxRows={4}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </div>
      <div>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            onChange={(event) => {
              setPassword(event.target.value);
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
        onClick={handleLogin}
        style={{
          width: "250px",
          height: "56px",
          marginTop: "16px",
          backgroundColor: "#10a37f",
          color: "white",
        }}
        variant="outlined"
      >
        Login
      </Button>
      {errorAlert && (
        <Alert
          severity="error"
          variant="outlined"
          style={{ width: "250px", marginTop: "10px" }}
          onClose={() => setErrorAlert(false)}
        >
          Username or Password is wrong!!
        </Alert>
      )}
      <Link href={"/forgot-password"}><h2 style={{ color: "#2D333A", marginTop: "10px" }}>Forgot Password?</h2></Link>
      <h2 style={{ color: "#2D333A", marginTop: "10px" }}>
        Dont have an account?{" "}
      </h2>{" "}
      <Link href={"/signup"} style={{ color: "#10a37f", fontSize: "20px" }}>
        Sign up{" "}
      </Link>
    </Box>
  );
}
