import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Alert, Button, MenuItem } from "@mui/material";

export default function DeleteCountry() {
  const [countryId, setCountryID] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);

  const deleteCountryData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/world/countries/${countryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setSuccessAlert(true);
    } catch (error) {
      console.log(error);
      setSuccessAlert(false);
    }
  };

  return (
    <Box style={{ marginLeft: "350px" }}>
       <h1 style={{ color: "#10a37f", fontSize: "25px" }}>API : /world/countries/id</h1>
      
      <h1 style={{ color: "#10a37f", fontSize: "25px" }}>Delete a Country</h1>

      <TextField
        style={{ width: "400px", marginTop: "10px" }}
        onChange={(event) => {
          setCountryID(event.target.value);
        }}
        required
        id="outlined-required"
        label="Country ID"
        defaultValue=""
      />
      <Button
        onClick={deleteCountryData}
        style={{
          width: "95px",
          height: "56px",
          marginLeft: "8px",
          marginTop: "10px",
          backgroundColor: "#10a37f",
          color: "white",
        }}
        variant="outlined"
      >
        Delete
      </Button>
      <br></br>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "20px",
          gap: "10px",
          width: "1000px",
        }}
      > {successAlert && (
        <Alert
          severity="success"
          variant="outlined"
          style={{ width: "504px", marginTop: "10px" }}
          onClose={() => setSuccessAlert(false)}
        >
          Country Has Been Deleted Successfully!!
        </Alert>
      )}</div>
    </Box>
  );
}
