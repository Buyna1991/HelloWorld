"use client"
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import world from "@/public/world.jpeg";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";

export default function SignUpPage() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const router = useRouter();
  const [successAlert, setSuccessAlert] = useState(false);

  const validateEmail = (email:any) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;;
    return regex.test(email);
  };

  const handleSignUp = async () => {
    try {
      if (!validateEmail(userName)) {
        setIsValidEmail(false);
        return;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, userPassword }),
        }
      );
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
          error={!isValidEmail}
          helperText={!isValidEmail && "Please enter a valid email address"}
          onChange={(event) => {
            setUserName(event.target.value);
            setIsValidEmail(true); 
          }}
          id="outlined-multiline-flexible"
          type="email"
          label="Email"
          multiline
          maxRows={1}
        />
      </div>
      <div>
        <TextField
          onChange={(event) => {
            setUserPassword(event.target.value);
          }}
          id="outlined-adornment-password"
          type="password"
          label="Password"
        />
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
