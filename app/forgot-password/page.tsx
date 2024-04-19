"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Link from "next/link";
import world from "@/public/world.jpeg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";

export default function ForgotPasswordPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const [errorAlert, setErrorAlert] = useState(false);

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: username }),
      });
      if (res.status === 200) {
        const data = await res.json();
        const token = data.token;
        router.push(`/reset-password?token=${token}`);
        console.log(data);
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
            fontSize: "26px",
            fontWeight: "600",
            fontFamily: "sans-serif",
          }}
        >
          Enter Username
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
      {errorAlert && (
        <Alert
          severity="error"
          variant="outlined"
          style={{ width: "250px", marginTop: "10px" }}
          onClose={() => setErrorAlert(false)}
        >
          Username is wrong!!
        </Alert>
      )}

      <Link href={"/login"} style={{ color: "#10a37f", fontSize: "20px" }}>
        Log In{" "}
      </Link>
    </Box>
  );
}
